"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumTime = reducedMotion ? 220 : 720;
    let finishTimer: number | undefined;
    let removeTimer: number | undefined;

    const dismiss = () => {
      setLeaving(true);
      removeTimer = window.setTimeout(() => setVisible(false), reducedMotion ? 20 : 560);
    };

    const finish = () => {
      const remaining = Math.max(0, minimumTime - (performance.now() - startedAt));
      finishTimer = window.setTimeout(dismiss, remaining);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    const failsafe = window.setTimeout(dismiss, reducedMotion ? 900 : 2400);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(failsafe);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-screen${leaving ? " is-leaving" : ""}`} role="status" aria-label="Opening Empire SMP">
      <div className="loading-seal" aria-hidden="true">
        <span className="loading-ring" />
        <svg viewBox="0 0 92 108" fill="none">
          <path d="M11 67 3 83l21-2 8 19 14-15 14 15 8-19 21 2-8-16" className="loading-ribbon" />
          <path d="M46 15 78 27v30c0 21-14 35-32 44C28 92 14 78 14 57V27l32-12Z" className="loading-shield" />
          <path d="M46 23 70 32v25c0 16-10 28-24 36C32 85 22 73 22 57V32l24-9Z" className="loading-inner" />
          <path d="M29 66V49l8 5V40l9 6 9-6v14l8-5v17H29Zm13 0V56h8v10" className="loading-keep" />
          <path d="m31 28 6 5 9-11 9 11 6-5-3 11H34l-3-11Z" className="loading-crown" />
          <path d="M30 72h32M33 77h26" className="loading-lines" />
        </svg>
      </div>
      <p className="loading-wordmark">Empire <span>SMP</span></p>
      <p className="loading-caption">Opening the gates</p>
      <div className="loading-progress" aria-hidden="true"><span /></div>
    </div>
  );
}
