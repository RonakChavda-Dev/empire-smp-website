import Reveal from "./Reveal";
import JoinActions from "./JoinActions";

const joinSteps = [
  { title: "Connect to the server", description: "Copy the address below and add Empire SMP to your Minecraft server list." },
  { title: "Bring your first idea", description: "Whether it is a quiet cabin or the start of a capital, arrive with a plan—or wander until the land gives you one." },
  { title: "Write the next chapter", description: "Meet the people already making their mark, then decide how you want to shape the realm alongside them." },
];

export default function JoinSection() {
  return (
    <section className="join-section" id="join" aria-labelledby="join-title">
      <div className="join-sky" aria-hidden="true" />
      <div className="section-frame join-frame">
        <Reveal className="join-heading"><p className="eyebrow">The gates are open</p><h2 id="join-title">Your place in<br />the realm awaits.</h2><p>Connect with Minecraft 26.3 or the latest version compatible with the server, and join the Discord community to keep up with server details.</p></Reveal>
        <JoinActions />
        <ol className="join-steps">{joinSteps.map((step, index) => <Reveal className="join-step" delay={index * 140} key={step.title}><span className="join-mark" aria-hidden="true">{["✦", "⚑", "♜"][index]}</span><h3>{step.title}</h3><p>{step.description}</p></Reveal>)}</ol>
      </div>
    </section>
  );
}

