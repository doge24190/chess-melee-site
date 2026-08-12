import Link from "next/link";
import latestRelease from "../../data/latest-release.json";

const assetSizeMb = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 }).format(
  latestRelease.asset.size / 1024 / 1024,
);

const publishedDate = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
  timeZone: "Asia/Shanghai",
}).format(new Date(latestRelease.publishedAt));

export default function DownloadPage() {
  return (
    <main className="download-page">
      <header className="nav download-nav">
        <Link className="brand" href="/" aria-label="返回举棋不定首页"><span className="brand-mark">棋</span><span>举棋不定</span></Link>
        <Link className="download-back" href="/">← 返回游戏介绍</Link>
      </header>

      <section className="download-hero">
        <div className="download-copy">
          <p className="eyebrow"><span /> CHESS MELEE DEMO · {latestRelease.tag}</p>
          <h1>棋局已开，<br /><em>轮到你了。</em></h1>
          <p className="download-lede">下载《举棋不定》试玩版，体验标准模式的移动与复活，或进入“落子争锋”，用每一次落点直接改变战场。</p>
          <div className="download-meta"><span>Windows x64</span><span>试玩版本</span><span>{latestRelease.tag}</span><span>{assetSizeMb} MB</span></div>

          <div className="download-options" aria-label="下载地址">
            <a className="download-option github-source" href={latestRelease.asset.url} target="_blank" rel="noreferrer">
              <img src="/github-mark.png" alt="" width={36} height={36} aria-hidden="true" />
              <span><b>下载 Windows 试玩版</b><small>GitHub Releases · {assetSizeMb} MB</small></span><strong aria-hidden="true">↓</strong>
            </a>
            <a className="download-option backup-source" href={latestRelease.releaseUrl} target="_blank" rel="noreferrer">
              <i aria-hidden="true">版</i><span><b>查看版本说明</b><small>更新内容与历史版本</small></span><strong aria-hidden="true">↗</strong>
            </a>
          </div>
          <p className="download-note">
            发布于 {publishedDate}。下载完成后解压文件，并按照压缩包内说明启动游戏。<br />
            SHA256 <code>{latestRelease.asset.sha256}</code>
          </p>
        </div>
      </section>
    </main>
  );
}
