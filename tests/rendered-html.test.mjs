import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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

test("server-renders the verified latest Windows release", async () => {
  const response = await render("/download");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /v0\.1\.4/);
  assert.match(html, /Chess-Melee-Demo-v0\.1\.4-Windows-x64\.zip/);
  assert.match(html, /a7e487adcff91dfb603b353a538d59201f03d8de395e4ab8fd7842a33b42d2ed/);
  assert.doesNotMatch(html, /v0\.1\.0|lanzout\.com|doge24190\.top/);
});

test("keeps release synchronization wired to package scripts and verified metadata", async () => {
  const [packageJson, releaseData, nodeScript, powershellScript, workflow] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../data/latest-release.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../scripts/sync-latest-release.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/Sync-ChessMeleeWebsiteRelease.ps1", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/sync-demo-release.yml", import.meta.url), "utf8"),
  ]);

  assert.equal(packageJson.scripts["release:sync"], "node scripts/sync-latest-release.mjs");
  assert.equal(releaseData.tag, "v0.1.4");
  assert.equal(releaseData.asset.size, 102688601);
  assert.match(releaseData.asset.sha256, /^[0-9a-f]{64}$/);
  assert.match(nodeScript, /拒绝将官网.*回退/);
  assert.match(nodeScript, /asset\.digest/);
  assert.match(powershellScript, /npm\.cmd test/);
  assert.match(workflow, /repository_dispatch:/);
  assert.match(workflow, /cron: "17,47 \* \* \* \*"/);
  assert.match(workflow, /permissions:\s+contents: write/);
});
