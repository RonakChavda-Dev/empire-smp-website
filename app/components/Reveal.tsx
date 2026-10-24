"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.reveal = "visible"; observer.unobserve(element); }
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}
