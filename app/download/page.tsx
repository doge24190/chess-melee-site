export default function DownloadPage() {
  return (
    <main className="download-page">
      <header className="nav download-nav">
        <a className="brand" href="/" aria-label="返回举棋不定首页">
          <span className="brand-mark">棋</span><span>举棋不定</span>
        </a>
        <a className="download-back" href="/">← 返回游戏介绍</a>
      </header>

      <section className="download-hero">
        <div className="download-copy">
          <p className="eyebrow"><span /> CHESS MELEE DEMO · v0.1.0</p>
          <h1>棋局已开，<br /><em>轮到你了。</em></h1>
          <p className="download-lede">下载《举棋不定》试玩版，亲手体验落子、移动、召子、抉择与灵魂飞升交织的策略战场。</p>
          <div className="download-meta"><span>Windows x64</span><span>试玩版本</span><span>GitHub 托管</span></div>
          <a className="github-download" href="https://github.com/TechJoiH/Chess-Melee-Demo/releases/tag/v0.1.0" target="_blank" rel="noreferrer">
            <img src="/github-mark.png" alt="" width={34} height={34} aria-hidden="true" />
            <span>前往 GitHub 下载<small>Chess Melee Demo v0.1.0</small></span>
            <b aria-hidden="true">↗</b>
          </a>
          <p className="download-note">点击后将前往 GitHub Releases 页面查看并下载试玩包。</p>
        </div>

        <aside className="download-card" aria-label="试玩版信息">
          <div className="download-card-inner">
            <div className="download-piece" aria-hidden="true">♟</div>
            <h2>试玩版信息</h2>
            <div className="download-facts">
              <div><span>版本</span><b>v0.1.0</b></div>
              <div><span>平台</span><b>Windows x64</b></div>
              <div><span>文件</span><b>ZIP 压缩包</b></div>
              <div><span>托管</span><b>GitHub Releases</b></div>
            </div>
            <p className="download-card-foot">下载完成后解压文件，并按照压缩包内说明启动游戏。</p>
          </div>
        </aside>
      </section>
    </main>
  );
}