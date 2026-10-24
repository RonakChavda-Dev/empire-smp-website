import Reveal from "./Reveal";

const realmNotes = [
  { title: "Make a life here", description: "Start with the land, gather what you need, and grow from a first shelter into something worth remembering." },
  { title: "Nothing is untouchable", description: "Empire is griefable. Builds can be lost, rebuilt, or defended together; that risk is part of the world." },
  { title: "The story is yours", description: "Survive, grow, and have fun. What the realm becomes is shaped by the people who play in it." },
];

export default function JoinSection() {
  return (
    <section className="join-section" id="before-you-join" aria-labelledby="before-you-join-title">
      <div className="join-sky" aria-hidden="true" />
      <div className="section-frame join-frame">
        <Reveal className="join-heading"><p className="eyebrow">Before you join</p><h2 id="before-you-join-title">Your place in<br />the realm awaits.</h2><p>Connect with Minecraft 26.3 or the latest version compatible with the server. Empire is a shared survival world where your choices shape what comes next.</p></Reveal>
        <Reveal className="realm-charter">
          <div className="charter-heading">
            <h3>A realm<br />without guarantees.</h3>
            <p>Empire SMP is a shared survival world. Make something of your own, knowing the world can change around you.</p>
          </div>
          <div className="charter-clauses">
            {realmNotes.map((note) => <article className="charter-clause" key={note.title}>
              <h4>{note.title}</h4>
              <p>{note.description}</p>
            </article>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

