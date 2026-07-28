export default function DownloadPage() {
  return (
    <main className="download-page">
      <header className="nav download-nav">
        <a className="brand" href="/" aria-label="返回举棋不定首页"><span className="brand-mark">棋</span><span>举棋不定</span></a>
        <a className="download-back" href="/">← 返回游戏介绍</a>
      </header>

      <section className="download-hero">
        <div className="download-copy">
          <p className="eyebrow"><span /> CHESS MELEE DEMO · v0.1.0</p>
          <h1>棋局已开，<br /><em>轮到你了。</em></h1>
          <p className="download-lede">下载《举棋不定》试玩版，亲手体验落子、移动、召子、抉择与灵魂飞升交织的策略战场。</p>
          <div className="download-meta"><span>Windows x64</span><span>试玩版本</span><span>v0.1.0</span></div>

          <div className="download-options" aria-label="下载地址">
            <a className="download-option github-source" href="https://github.com/TechJoiH/Chess-Melee-Demo/releases/tag/v0.1.0" target="_blank" rel="noreferrer">
              <img src="/github-mark.png" alt="" width={36} height={36} aria-hidden="true" />
              <span><b>GitHub Releases</b><small>项目发布页与版本说明</small></span><strong aria-hidden="true">↗</strong>
            </a>
            <a className="download-option cloud-source" href="https://doge24190.lanzout.com/ibs8I3zbodah" target="_blank" rel="noreferrer">
              <i aria-hidden="true">云</i><span><b>云盘下载</b><small>通过云盘获取试玩包</small></span><strong aria-hidden="true">↗</strong>
            </a>
            <a className="download-option backup-source" href="https://www.doge24190.top/_media/0/chess-melee-demo-v0.1.0-windows-x64.zip" target="_blank" rel="noreferrer">
              <i aria-hidden="true">备</i><span><b>备用下载</b><small>直接下载 Windows x64 压缩包</small></span><strong aria-hidden="true">↓</strong>
            </a>
          </div>
          <p className="download-note">下载完成后解压文件，并按照压缩包内说明启动游戏。</p>
        </div>
      </section>
    </main>
  );
}