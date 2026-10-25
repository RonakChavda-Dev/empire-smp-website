import { browserPlayUrl } from "../lib/site";
import Reveal from "./Reveal";

export default function BrowserPlay() {
  return (
    <Reveal className="browser-play" id="play-in-browser">
      <div className="browser-play-copy">
        <p className="eyebrow">No account? No launcher?</p>
        <h3>Play straight from<br />your browser.</h3>
        <p>Don&apos;t own Minecraft Java Edition or a launcher? Eaglercraft runs Minecraft in a browser tab. Open it, head to Multiplayer, and join Empire. You don&apos;t need to download anything.</p>
      </div>
      <a className="gold-button browser-play-button" href={browserPlayUrl} target="_blank" rel="noopener noreferrer">
        Play in browser <span aria-hidden="true">↗</span>
      </a>
    </Reveal>
  );
}
