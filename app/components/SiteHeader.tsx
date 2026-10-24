import EmpireMark from "./EmpireMark";

const navigation = [["The world", "#world"], ["Your journey", "#journey"], ["The charter", "#code"], ["Join", "#join"]] as const;

export default function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <EmpireMark />
      <nav className="main-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <a className="header-action" href="#join">Join the realm <span aria-hidden="true">↗</span></a>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span /><span /></summary><nav aria-label="Mobile navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}<span>↗</span></a>)}</nav></details>
    </header>
  );
}
