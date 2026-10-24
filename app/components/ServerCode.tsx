import Reveal from "./Reveal";

const principles = [
  { title: "Your walls can fall", copy: "This is a griefable world. Builds and belongings can be raided, damaged, or taken. Choose your ground and keep that risk in mind." },
  { title: "Trust is part of the game", copy: "Allies can make a town stronger; rivalries can redraw its borders. Who you welcome, bargain with, or challenge is up to you." },
  { title: "The world belongs to its players", copy: "There is room for builders, explorers, traders, tacticians, and troublemakers. Play your way, and leave space for others to do the same." },
];

export default function ServerCode() {
  return (
    <section className="code-section" id="server-charter" aria-labelledby="server-charter-title">
      <div className="code-photo" role="img" aria-label="Stone walls around the Empire keep at sunset" />
      <div className="section-frame code-frame">
        <Reveal className="code-title-column"><p className="eyebrow">Read before you ride</p><h2 id="server-charter-title">A realm with<br />real stakes.</h2><p className="code-lead">There are no grief protections here. Survival is open, and what you make can be changed by someone else.</p><p className="code-signoff">Come to build. Stay because the story is yours.</p></Reveal>
        <div className="principle-list">{principles.map((principle, index) => <Reveal className="principle" delay={index * 120} key={principle.title}><span className="principle-seal" aria-hidden="true">{["♜", "⚔", "✦"][index]}</span><div><h3>{principle.title}</h3><p>{principle.copy}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}
