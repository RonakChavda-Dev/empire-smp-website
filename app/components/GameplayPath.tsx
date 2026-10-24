import Reveal from "./Reveal";

const passages = [
  { title: "Take root", text: "Find a stretch of land beyond the beaten path. Gather what you need, make a shelter, and learn the shape of the world around you.", mark: "⌂" },
  { title: "Raise your banner", text: "Turn a refuge into a homestead, a homestead into a town. Invite allies, open a road, and build something people can find on the map.", mark: "⚑" },
  { title: "Make your name", text: "Trade, bargain, explore, compete, or write your own laws. The realm grows through the choices players make together.", mark: "♜" },
];

export default function GameplayPath() {
  return (
    <section className="path-section" id="journey" aria-labelledby="path-title">
      <div className="section-frame path-frame">
        <Reveal className="path-intro"><p className="eyebrow">The making of an empire</p><h2 id="path-title">First night<br />to legend.</h2><p className="path-lead">No preset kingdom. No story handed down. Just survival, ambition, and a world full of room to grow.</p></Reveal>
        <div className="path-list">{passages.map((passage, index) => <Reveal className="path-entry" delay={index * 130} key={passage.title}><span className="path-mark" aria-hidden="true">{passage.mark}</span><div className="path-copy"><h3>{passage.title}</h3><p>{passage.text}</p></div></Reveal>)}</div>
        <div className="path-footnote">Your pace. Your people. Your kind of kingdom.</div>
      </div>
    </section>
  );
}

