export default function EmpireMark({ large = false, crestOnly = false }: { large?: boolean; crestOnly?: boolean }) {
  return (
    <a className={`brand${large ? " brand-large" : ""}${crestOnly ? " brand-crest-only" : ""}`} href="#home" aria-label="Empire SMP home">
      <svg aria-hidden="true" className="brand-crest" viewBox="0 0 92 108" fill="none">
        <path className="crest-ribbon" d="M11 67 3 83l21-2 8 19 14-15 14 15 8-19 21 2-8-16" />
        <path className="crest-shield" d="M46 15 78 27v30c0 21-14 35-32 44C28 92 14 78 14 57V27l32-12Z" />
        <path className="crest-shield-inner" d="M46 23 70 32v25c0 16-10 28-24 36C32 85 22 73 22 57V32l24-9Z" />
        <path className="crest-castle" d="M29 66V49l8 5V40l9 6 9-6v14l8-5v17H29Z" />
        <path className="crest-door" d="M42 66V56h8v10" />
        <path className="crest-crown" d="m31 28 6 5 9-11 9 11 6-5-3 11H34l-3-11Z" />
        <path className="crest-line" d="M30 72h32M33 77h26" />
      </svg>
      {!crestOnly && <span className="brand-name">Empire <small>SMP</small></span>}
    </a>
  );
}
