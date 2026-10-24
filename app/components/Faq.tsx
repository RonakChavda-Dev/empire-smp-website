"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const answers = [
  { question: "Is Empire SMP griefable?", answer: "Yes. Builds and items are not protected from other players. Choose your base, alliances, and risks with that in mind." },
  { question: "What is the goal of the server?", answer: "Survive, grow, and have fun. Build a home, start a settlement, explore, trade, compete, or set your own goal." },
  { question: "How can I join?", answer: "Add theempiresmp.play.hosting to your Minecraft server list, then join the community at discord.gg/r8Tp55WBbS." },
  { question: "Which version or edition do I need?", answer: "Use Minecraft Java Edition 1.8 to 26.3 and also works on Eaglercraft but only 26.2/26.3 Eaglercraft" },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" id="server-faq" aria-labelledby="server-faq-title">
      <div className="section-frame faq-frame">
        <Reveal className="faq-intro"><p className="eyebrow">Before you cross the gate</p><h2 id="server-faq-title">A few words<br />of counsel.</h2><p>What to expect before you set out.</p></Reveal>
        <div className="faq-list">
          {answers.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `server-faq-answer-${index + 1}`;
            return (
              <Reveal className="faq-item" delay={index * 75} key={item.question}>
                <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span>{item.question}</span><span className="faq-toggle" aria-hidden="true">+</span>
                </button>
                <div className="faq-answer" id={answerId} aria-hidden={!isOpen} data-open={isOpen}>
                  <div className="faq-answer-inner"><p>{item.answer}</p></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

