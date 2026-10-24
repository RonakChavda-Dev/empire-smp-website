"use client";

import { useState } from "react";
import EmpireMark from "./EmpireMark";

const navigation = [["The world", "#world-overview"], ["Your journey", "#survival-journey"], ["The charter", "#server-charter"], ["Before you join", "#before-you-join"]] as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <EmpireMark />
      <nav className="main-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-site-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <div className="mobile-menu-panel" id="mobile-site-navigation" aria-hidden={!menuOpen}>
          <nav className="mobile-menu-panel-inner" aria-label="Mobile navigation" inert={!menuOpen}>
            {navigation.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></a>)}
          </nav>
        </div>
      </div>
    </header>
  );
}
