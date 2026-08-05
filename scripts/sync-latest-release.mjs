#!/usr/bin/env node

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repository = "TechJoiH/Chess-Melee-Demo";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "data", "latest-release.json");

function parseArguments(argv) {
  let tag = null;
  let check = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check") {
      check = true;
    } else if (argument === "--tag") {
      tag = argv[index + 1] ?? null;
      index += 1;
    } else if (argument.startsWith("--tag=")) {
      tag = argument.slice("--tag=".length);
    } else {
      throw new Error(`未知参数：${argument}`);
    }
  }

  if (tag && !/^v\d+\.\d+\.\d+$/.test(tag)) {
    throw new Error(`版本号必须使用 v主版本.次版本.修订号 格式，收到：${tag}`);
  }

  return { tag, check };
}

function semverParts(tag) {
  const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(tag);
  return match ? match.slice(1).map(Number) : null;
}

function compareVersions(left, right) {
  const leftParts = semverParts(left);
  const rightParts = semverParts(right);
  if (!leftParts || !rightParts) return 0;

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) return leftParts[index] - rightParts[index];
  }
  return 0;
}

async function readCurrentRelease() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function fetchRelease(tag) {
  const endpoint = tag
    ? `https://api.github.com/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`
    : `https://api.github.com/repos/${repository}/releases/latest`;
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "chess-melee-site-release-sync",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(endpoint, { headers });
  if (!response.ok) {
    throw new Error(`读取 GitHub Release 失败：HTTP ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function normalizeRelease(release) {
  if (release.draft || release.prerelease) {
    throw new Error(`拒绝同步草稿或预发布版本：${release.tag_name}`);
  }
  if (release.target_commitish !== "main") {
    throw new Error(`Release 必须以 main 为目标分支，收到：${release.target_commitish}`);
  }
  if (!/^v\d+\.\d+\.\d+$/.test(release.tag_name ?? "")) {
    throw new Error(`Release 标签格式无效：${release.tag_name}`);
  }

  const expectedAssetName = `Chess-Melee-Demo-${release.tag_name}-Windows-x64.zip`;
  const asset = release.assets?.find((candidate) => candidate.name === expectedAssetName);
  if (!asset) throw new Error(`Release 缺少安装包：${expectedAssetName}`);
  if (asset.state !== "uploaded" || !Number.isSafeInteger(asset.size) || asset.size <= 0) {
    throw new Error(`Release 安装包尚未完成上传：${expectedAssetName}`);
  }

  const digest = /^sha256:([0-9a-f]{64})$/i.exec(asset.digest ?? "");
  if (!digest) throw new Error(`Release 安装包缺少有效的 SHA256：${expectedAssetName}`);

  const expectedDownloadPrefix = `https://github.com/${repository}/releases/download/${release.tag_name}/`;
  if (!asset.browser_download_url?.startsWith(expectedDownloadPrefix)) {
    throw new Error(`Release 安装包下载地址无效：${asset.browser_download_url}`);
  }

  return {
    tag: release.tag_name,
    name: release.name || `Chess Melee Demo ${release.tag_name}`,
    publishedAt: release.published_at,
    releaseUrl: release.html_url,
    asset: {
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      sha256: digest[1].toLowerCase(),
    },
  };
}

async function main() {
  const { tag, check } = parseArguments(process.argv.slice(2));
  const current = await readCurrentRelease();
  const next = normalizeRelease(await fetchRelease(tag));

  if (current?.tag && compareVersions(next.tag, current.tag) < 0) {
    throw new Error(`拒绝将官网从 ${current.tag} 回退到 ${next.tag}`);
  }

  const serialized = `${JSON.stringify(next, null, 2)}\n`;
  const currentSerialized = current ? `${JSON.stringify(current, null, 2)}\n` : null;

  if (check) {
    if (currentSerialized !== serialized) {
      throw new Error(`官网 Release 数据不是 ${next.tag} 的已验证远程元数据，请先运行 release:sync`);
    }
    console.log(`Release 数据校验通过：${next.tag}`);
    return;
  }

  if (currentSerialized === serialized) {
    console.log(`Release 数据已是最新：${next.tag}`);
    return;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, serialized, "utf8");
  await rename(temporaryPath, outputPath);
  console.log(`官网 Release 数据已更新：${current?.tag ?? "无"} -> ${next.tag}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
