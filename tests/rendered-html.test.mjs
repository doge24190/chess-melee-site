import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the updated recognition cards and social metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>举棋不定｜双人回合制策略游戏<\/title>/);
  assert.match(html, /创新赛道 · 优秀入围奖/);
  assert.match(html, /获评赛事优秀入围奖/);
  assert.match(html, /行业展会 · 现场展出/);
  assert.match(html, /<h3>ChinaJoy<\/h3>/);
  assert.match(html, /ChinaJoy 展出/);
  assert.match(html, /<meta property="og:image" content="http:\/\/localhost(?::\d+)?\/og\.png"\/>/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the new exhibition card responsive and ships its preview image", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /award-exhibition award-card-wide/);
  assert.match(page, /优秀入围奖/);
  assert.match(page, /ChinaJoy/);
  assert.match(css, /\.award-card-wide\{grid-column:1\/-1/);
  assert.match(css, /\.award-exhibition \.award-medal/);
  assert.match(css, /@media\(max-width:820px\).*\.award-card-wide\{grid-column:auto\}/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /\/og\.png/);
  await access(new URL("../public/og.png", import.meta.url));
});
