import EmpireMark from "./components/EmpireMark";
import Faq from "./components/Faq";
import GameplayPath from "./components/GameplayPath";
import JoinSection from "./components/JoinSection";
import Reveal from "./components/Reveal";
import ServerCode from "./components/ServerCode";
import SiteHeader from "./components/SiteHeader";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" role="img" aria-label="The Empire SMP castle keep beneath a sunset sky" />
        <div className="hero-shade" />
        <div className="hero-frame">
          <div className="hero-copy">
            <EmpireMark large />
            <p className="hero-kicker">A world without safe walls</p>
            <h1 id="hero-title">Build your<br /><em>own kingdom.</em></h1>
            <p className="hero-description">Empire is a griefable Minecraft survival world. Find your ground, make your mark, and decide what is worth defending.</p>
            <a className="gold-button" href="#join">Enter the realm <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-caption"><span>THE KEEP AT DUSK</span><span>One world. Your story.</span></div>
        </div>
        <a className="scroll-cue" href="#world" aria-label="Scroll to explore"><span />Descend into the realm</a>
      </section>

      <section className="world-section" id="world" aria-labelledby="world-title">
        <div className="world-ornament" aria-hidden="true">✦</div>
        <div className="section-frame world-frame">
          <Reveal className="world-heading">
            <p className="eyebrow">A charter for the restless</p>
            <h2 id="world-title">A kingdom<br />is earned.</h2>
          </Reveal>
          <Reveal className="world-story" delay={120}>
            <p className="dropcap">It begins with a patch of wilderness, a few tools, and an idea that refuses to stay small. Empire gives you a shared survival world and the freedom to decide what comes next.</p>
            <p>Build alone or bring others to your banner. Raise a home, carve out a town, trade across the map, or follow a rivalry wherever it leads. The world is shaped by the people willing to leave a mark.</p>
            <a className="underlined-link" href="#journey">See how the story unfolds <span aria-hidden="true">→</span></a>
          </Reveal>
          <div className="world-seal" aria-hidden="true"><EmpireMark crestOnly /><span>EST. BY<br />ITS PEOPLE</span></div>
        </div>
      </section>

      <GameplayPath />
      <ServerCode />
      <JoinSection />
      <Faq />

      <footer className="site-footer">
        <div className="footer-top section-frame">
          <div className="footer-close"><p className="eyebrow">The realm is yours to shape</p><h2>Make history<br />block by block.</h2><a className="footer-link" href="#join">Find your way in <span aria-hidden="true">↗</span></a></div>
          <EmpireMark large />
        </div>
        <div className="footer-wordmark" aria-hidden="true">EMPIRE</div>
        <div className="footer-bottom section-frame"><span>Empire SMP · A shared survival world</span><a href="#top">Return to the keep ↑</a></div>
      </footer>
    </main>
  );
}


