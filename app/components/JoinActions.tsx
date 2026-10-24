"use client";

import { useState } from "react";

const SERVER_IP = "theempiresmp.play.hosting";
const DISCORD_INVITE = "https://discord.gg/r8Tp55WBbS";

export default function JoinActions({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  async function copyServerAddress() {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <div className={`join-actions${compact ? " join-actions-compact" : ""}`} aria-label="Join Empire SMP">
      <button className="join-action join-action-server" type="button" onClick={copyServerAddress}>
        <span className="join-action-label">{copied ? "Server IP copied" : copyFailed ? "Select the address below" : "Copy server IP"}</span>
        <strong>{SERVER_IP}</strong>
        <span className="join-action-hint" aria-live="polite">{copied ? "Ready to paste into Minecraft" : "Click to copy the address"}</span>
      </button>
      <a className="join-action join-action-discord" href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
        <span className="join-action-label">Join the community</span>
        <strong>Empire SMP Discord</strong>
        <span className="join-action-hint">Open the Discord invite ↗</span>
      </a>
      {copyFailed && <p className="copy-fallback">Server address: <code>{SERVER_IP}</code></p>}
    </div>
  );
}
