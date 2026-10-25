"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      element.dataset.reveal = "visible";
      return;
    }

    const shouldWait = element.getBoundingClientRect().top > window.innerHeight * 0.88;
    element.dataset.reveal = shouldWait ? "pending" : "visible";
    if (!shouldWait) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.reveal = "visible";
        observer.unobserve(element);
      }
    }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} id={id} className={className} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}
