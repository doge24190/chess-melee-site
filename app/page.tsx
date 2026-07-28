import GifCarousel from "./GifCarousel";

const mechanics = [
  { n: "2", title: "连 · 淘汰", text: "移动基础棋形成二连，挤掉两端没有普通同伴保护的敌棋。灵魂既不会被挤掉，也无法提供保护。", tone: "blue" },
  { n: "3", title: "连 · 召子", text: "组成三连，召唤一枚特殊棋进入棋篮。下一次落子必须优先使用，奖励也会改变你的计划。", tone: "gold" },
  { n: "4", title: "连 · 抉择", text: "组成四连，在全局消灭任意敌方非灵魂棋，或复活、补充一枚己方棋之间作出选择。", tone: "violet" },
  { n: "5", title: "连 · 飞升", text: "五连及以上让线上的基础棋化为灵魂。每枚灵魂记 1 分，同时成为永久占据棋盘的地形。", tone: "red" },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="举棋不定首页"><span className="brand-mark">棋</span><span>举棋不定</span></a>
        <nav aria-label="主要导航"><a href="#mechanics">核心玩法</a><a href="#pieces">棋子系统</a><a href="#gallery">游戏画面</a></nav>
        <a className="nav-cta" href="/download">下载试玩</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 双人回合制策略游戏</p>
          <h1>落一子，<br /><em>改变整片战场。</em></h1>
          <p className="lede">自由落子、棋子移动、连线组合、空间挤压与灵魂计分，在同一张棋盘上同时发生。</p>
          <div className="hero-actions">
            <a className="button primary" href="#mechanics">了解玩法 <b>→</b></a>
            <a className="button quiet" href="#gallery"><span>▶</span> 查看实机画面</a>
          </div>
          <div className="quick-stats" aria-label="游戏特色"><span><b>2</b> 人对决</span><span><b>4</b> 种连线效果</span><span><b>∞</b> 种战术选择</span></div>
        </div>
        <div className="hero-visual">
          <div className="sun" /><div className="float float-a">♟</div><div className="float float-b">♜</div>
          <div className="hero-frame"><img src="/screenshots/01-menu.jpeg" alt="举棋不定游戏主菜单" width={640} height={360} /></div>
          <div className="hero-note"><i /> 每一步，都是取舍</div>
        </div>
      </section>

      <section className="intro">
        <p className="section-kicker">不只是连成一线</p><h2>连得越长，选择越重</h2>
        <p>短线负责战斗，中线争夺资源，长线决定分数。真正的高手，会为下一次连线提前数步布局。</p>
      </section>

      <section className="mechanics" id="mechanics">
        {mechanics.map((item) => (
          <article className={`mechanic ${item.tone}`} key={item.n}>
            <div className="mechanic-number"><span>{item.n}</span><small>连</small></div><h3>{item.title}</h3><p>{item.text}</p><div className="mechanic-line" />
          </article>
        ))}
      </section>

      <section className="feature-band" id="pieces">
        <div className="feature-image"><img src="/screenshots/02-tutorial.jpeg" alt="游戏教程介绍王棋移动" width={640} height={360} /></div>
        <div className="feature-copy">
          <p className="section-kicker light">熟悉的棋子，全新的战场</p><h2>借一步棋，<br />打开一条新路线</h2>
          <p>将、士、象、车、马、炮、卒与皇保留鲜明的移动直觉，却不再围绕“将死”作战。它们会直接吃子、参与连线，并在阵亡后等待四连复活。</p>
          <div className="piece-list"><span>将</span><span>士</span><span>象</span><span>车</span><span>马</span><span>炮</span><span>卒</span><span>皇</span></div>
        </div>
      </section>

      <section className="strategy">
        <div><p className="section-kicker">真正争夺的是选择权</p><h2>五种资源，彼此牵制</h2></div>
        <div className="strategy-grid">
          <article><b>01</b><h3>空间</h3><p>每个落子都会减少空格，也可能成为未来连线的支点。</p></article>
          <article><b>02</b><h3>机动性</h3><p>特殊棋能打破阵地，也可能移动到对手期待的位置。</p></article>
          <article><b>03</b><h3>特殊棋库存</h3><p>三连奖励强大，却必须优先落下，逼你临场调整。</p></article>
          <article><b>04</b><h3>墓地</h3><p>最近阵亡的特殊棋最先复活，牺牲顺序也是策略。</p></article>
          <article><b>05</b><h3>灵魂</h3><p>它既是最终分数，也是无法移动、无法消灭的永久地形。</p></article>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-heading">
          <div><p className="section-kicker">实机游戏画面</p><h2>每一回合，都在改变战局</h2></div>
        </div>
        <GifCarousel />
      </section>

      <section className="modes" id="modes">
        <div className="modes-copy">
          <p className="section-kicker light">选择你的战场</p><h2>独自推演，<br />或与对手正面交锋</h2>
          <p>从本地 AI、同屏双人到在线匹配，你和对手始终使用同一套规则。教程模式则用 14 个入口带你掌握每一种机制。</p>
          <ul><li><span>✓</span> 三种棋盘规模：9×9 / 14×14 / 19×19</li><li><span>✓</span> 蓝方先手，双方交替行动</li><li><span>✓</span> 灵魂分数决定最终胜负</li></ul>
        </div>
        <div className="modes-image"><img src="/screenshots/06-modes.jpeg" alt="游戏模式选择页面" width={640} height={360} /></div>
      </section>

      <section className="final-cta"><p>棋盘已经展开</p><h2>下一步，由你决定。</h2><a className="button primary" href="#top">回到顶部 <b>↑</b></a></section>
      <footer><div className="brand"><span className="brand-mark">棋</span><span>举棋不定</span></div><p>一款关于连线、取舍与空间的双人策略游戏。</p><a href="#top">返回顶部 ↑</a></footer>
    </main>
  );
}