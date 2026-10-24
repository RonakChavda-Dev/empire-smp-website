const STATUS_URL = "https://mckeepalivebots-a1.onrender.com/";
const PLAYER_KEYS = new Set(["online", "onlineplayers", "playersonline", "playercount", "currentplayers", "players"]);
const MAX_KEYS = new Set(["max", "maxplayers", "maximumplayers", "playerlimit"]);

function numeric(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
  if (typeof value === "string" && value.trim() !== "" && /^\d+(?:\.\d+)?$/.test(value.trim())) return Number(value);
  return undefined;
}

function findNumber(value: unknown, acceptedKeys: Set<string>): number | undefined {
  if (!value || typeof value !== "object") return undefined;
  if (Array.isArray(value)) return undefined;

  const entries = Object.entries(value as Record<string, unknown>);
  for (const [key, item] of entries) {
    if (acceptedKeys.has(key.toLowerCase().replace(/[^a-z]/g, ""))) {
      const parsed = numeric(item);
      if (parsed !== undefined) return parsed;
      if (Array.isArray(item) && acceptedKeys === PLAYER_KEYS) return item.length;
    }
  }
  for (const [, item] of entries) {
    const nested = findNumber(item, acceptedKeys);
    if (nested !== undefined) return nested;
  }
  return undefined;
}

function parseTextCount(text: string): { online: number; max?: number } | null {
  const bareCount = text.trim().match(/^\d+$/);
  if (bareCount) return { online: Number(bareCount[0]) };
  const ratio = text.match(/(?:players?\s*)?(\d+)\s*\/\s*(\d+)/i);
  if (ratio) return { online: Number(ratio[1]), max: Number(ratio[2]) };
  const online = text.match(/(?:players?\s+)?online\s*[:=\-]?\s*(\d+)/i);
  return online ? { online: Number(online[1]) } : null;
}

export async function onRequestGet() {
  try {
    const upstream = await fetch(STATUS_URL, {
      headers: { accept: "application/json, text/plain;q=0.9" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!upstream.ok) return Response.json({ error: "Player status source is unavailable" }, { status: 502 });

    const body = await upstream.text();
    let count: { online: number; max?: number } | null = parseTextCount(body);
    try {
      const payload: unknown = JSON.parse(body);
      const online = findNumber(payload, PLAYER_KEYS);
      const max = findNumber(payload, MAX_KEYS);
      if (online !== undefined) count = { online, ...(max !== undefined ? { max } : {}) };
    } catch {
      // The source may return a plain-text status instead of JSON.
    }

    if (!count) return Response.json({ error: "Player count was not present in the status response" }, { status: 502 });
    return Response.json(count, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not reach the player status source" }, { status: 502 });
  }
}
