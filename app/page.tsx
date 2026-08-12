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
        <nav aria-label="主要导航"><a href="#new-mode">新模式</a><a href="#awards">赛事荣誉</a><a href="#mechanics">核心玩法</a><a href="#pieces">棋子系统</a><a href="#gallery">游戏画面</a></nav>
        <a className="nav-cta" href="/download">下载试玩</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 双人回合制策略游戏</p>
          <h1>落一子，<br /><em>改变整片战场。</em></h1>
          <p className="lede">在标准模式中调动棋子，在“落子争锋”中专注每一次落点。连线、淘汰与灵魂计分，在同一张棋盘上不断改写局势。</p>
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

      <section className="new-mode" id="new-mode">
        <div className="new-mode-copy">
          <p className="section-kicker">v0.1.4 · 全新规则模式上线</p>
          <h2>落子争锋<br /><em>不走子，只争这一落。</em></h2>
          <p className="new-mode-lede">移除棋盘移动，把决策压缩到每一次落点。不同方向独立成线，特殊棋落下前完整预览攻击目标，并在落子后按照同一份快照同时结算。</p>
          <div className="new-mode-actions">
            <a className="button primary" href="/download">立即下载 v0.1.4 <b>↓</b></a>
            <a className="button rule-link" href="https://github.com/TechJoiH/Chess-Melee-Demo#落子争锋完整规则" target="_blank" rel="noreferrer">查看完整规则 <b>↗</b></a>
          </div>
          <p className="new-mode-note"><span>专属 AI</span> 已针对无移动、多方向连线、特殊棋落子攻击和有限库存完成优化。</p>
        </div>
        <div className="new-mode-rules" aria-label="落子争锋连线效果">
          <article className="new-rule blue"><b>2</b><div><h3>落子即战</h3><p>基础棋落下形成二连，立即挤压没有普通同伴保护的敌棋。</p></div></article>
          <article className="new-rule gold"><b>3</b><div><h3>蓄势攻击</h3><p>每条三连各得一枚特殊棋；等待下一次己方回合，按棋篮顺序落下攻击。</p></div></article>
          <article className="new-rule violet"><b>4</b><div><h3>全局淘汰</h3><p>每条四连获得一次全局选择，可淘汰敌方或己方非灵魂棋。</p></div></article>
          <article className="new-rule red"><b>5</b><div><h3>灵魂飞升</h3><p>五连规则保持不变：基础棋化为灵魂，特殊棋只连接、不飞升。</p></div></article>
        </div>
      </section>

      <section className="awards" id="awards">
        <div className="awards-heading">
          <p className="section-kicker light">AWARDS &amp; RECOGNITION</p>
          <h2>赛事荣誉</h2>
          <p>从校园赛场、创新舞台到行业展会，《举棋不定》的玩法创意获得了专业赛事与玩家认可。</p>
        </div>
        <div className="awards-grid">
          <a className="award-card award-bronze" href="https://guanghe.qq.com/lightspeedjam/winwork" target="_blank" rel="noreferrer">
            <div className="award-medal"><span>2026</span><b>铜</b></div>
            <div className="award-copy"><small>高校赛道 · 铜奖作品</small><h3>光子游戏大赛</h3><p>以独特的连线战术、棋子机动与空间博弈，从高校赛道中脱颖而出。</p><strong>查看获奖作品 <i>↗</i></strong></div>
          </a>
          <article className="award-card award-finalist">
            <div className="award-medal"><span>2026</span><b>星</b></div>
            <div className="award-copy"><small>创新赛道 · 优秀入围奖</small><h3>指尖星图游戏创新大赛</h3><p>凭借融合传统棋类直觉与连线机制的原创设计，获评赛事优秀入围奖。</p><strong>优秀入围奖 <i>✦</i></strong></div>
          </article>
          <article className="award-card award-exhibition award-card-wide">
            <div className="award-medal"><span>2026</span><b>展</b></div>
            <div className="award-copy"><small>行业展会 · 现场展出</small><h3>ChinaJoy</h3><p>《举棋不定》亮相 ChinaJoy 现场展区，向玩家展示传统棋类直觉与连线策略融合的独特玩法。</p><strong>ChinaJoy 展出 <i>✦</i></strong></div>
          </article>
        </div>
      </section>

      <section className="intro intro-with-shots">
        <p className="section-kicker">标准模式 · 不只是连成一线</p><h2>连得越长，选择越重</h2>
        <p>以下为标准模式的核心连线：短线负责战斗，中线争夺资源，长线决定分数。不同方向可以在同一次行动中独立触发。</p>
        <div className="strategy-shots intro-shots" aria-label="连线机制实机预览">
          <figure className="strategy-shot"><div><img src="/screenshots/04-three.jpeg" alt="三连召子实机预览" width={640} height={359} /></div></figure>
          <figure className="strategy-shot"><div><img src="/screenshots/05-four.jpeg" alt="四连抉择实机预览" width={640} height={359} /></div></figure>
        </div>
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
          <p className="section-kicker light">标准模式 · 熟悉的棋子，全新的战场</p><h2>借一步棋，<br />打开一条新路线</h2>
          <p>在标准模式中，将、士、象、车、马、炮、卒与皇保留鲜明的移动直觉，却不再围绕“将死”作战。它们会直接吃子、参与连线，并在阵亡后等待四连复活。</p>
          <div className="piece-list"><span>将</span><span>士</span><span>象</span><span>车</span><span>马</span><span>炮</span><span>卒</span><span>皇</span></div>
        </div>
      </section>

      <section className="strategy">
        <div><p className="section-kicker">标准模式 · 真正争夺的是选择权</p><h2>五种资源，彼此牵制</h2></div>
        <div className="strategy-grid">
          <article><b>01</b><h3>空间</h3><p>每个落子都会减少空格，也可能成为未来连线的支点。</p></article>
          <article><b>02</b><h3>机动性</h3><p>特殊棋能打破阵地，也可能移动到对手期待的位置。</p></article>
          <article><b>03</b><h3>特殊棋库存</h3><p>三连奖励强大，却必须优先落下，逼你临场调整。</p></article>
          <article><b>04</b><h3>墓地</h3><p>最近阵亡的特殊棋最先复活，牺牲顺序也是策略。</p></article>
          <article><b>05</b><h3>灵魂</h3><p>它既是最终分数，也是无法移动、无法消灭的永久地形。</p></article>
        </div>
        <div className="strategy-shots" aria-label="策略实机预览">
          <figure className="strategy-shot"><div><img src="/screenshots/03-battle.jpeg" alt="棋盘战局实机预览" width={640} height={359} /></div></figure>
          <figure className="strategy-shot"><div><img src="/screenshots/08-board.jpeg" alt="残局博弈实机预览" width={640} height={359} /></div></figure>
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
          <p>先选择标准模式或“落子争锋”，再进入本地 AI、同屏双人或在线匹配。在线对手使用相同规则，教程则专门带你掌握标准模式的完整机制。</p>
          <ul><li><span>✓</span> 两种规则：标准模式 / 落子争锋</li><li><span>✓</span> 三种棋盘规模：9×9 / 14×14 / 19×19</li><li><span>✓</span> AI、同屏双人和在线匹配均可游玩</li></ul>
        </div>
        <div className="modes-image"><img src="/screenshots/06-modes.jpeg" alt="游戏模式选择页面" width={640} height={360} /></div>
      </section>

      <section className="final-cta"><p>棋盘已经展开</p><h2>下一步，由你决定。</h2><a className="button primary" href="/download">下载试玩 <b>↵</b></a></section>
      <footer><div className="brand"><span className="brand-mark">棋</span><span>举棋不定</span></div><p>一款关于连线、取舍与空间的双人策略游戏。</p><a href="#top">返回顶部 ↑</a></footer>
    </main>
  );
}
