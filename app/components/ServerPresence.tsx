"use client";

import { useEffect, useState } from "react";

type Presence = { online: number; max?: number };

export default function ServerPresence() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [checked, setChecked] = useState(false);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    let active = true;
    let timer: number;
    const controller = new AbortController();

    async function refresh() {
      try {
        const response = await fetch("/api/players", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Player status is unavailable");
        const result = await response.json() as { online?: unknown; max?: unknown };
        if (typeof result.online !== "number" || !Number.isFinite(result.online)) throw new Error("No player count returned");
        if (active) {
          setPresence({
            online: result.online,
            ...(typeof result.max === "number" && Number.isFinite(result.max) ? { max: result.max } : {}),
          });
          setFresh(true);
          setChecked(true);
        }
      } catch {
        if (active) {
          setFresh(false);
          setChecked(true);
        }
      } finally {
        if (active) timer = window.setTimeout(refresh, 30_000);
      }
    }

    void refresh();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  const countLabel = presence
    ? `${presence.online}${presence.max !== undefined ? ` / ${presence.max}` : ""} players online`
    : "Player count unavailable";
  const label = fresh ? countLabel : presence ? `Last known · ${countLabel}` : checked ? countLabel : "Checking live player count";

  return (
    <div className={`server-presence${fresh ? " is-live" : ""}`} aria-live="polite" aria-atomic="true">
      <span className="presence-indicator" aria-hidden="true" />
      <span className="presence-label">REALM STATUS</span>
      <strong>{label}</strong>
      {fresh && <span className="presence-updated">Live · refreshes every 30 sec</span>}
    </div>
  );
}
