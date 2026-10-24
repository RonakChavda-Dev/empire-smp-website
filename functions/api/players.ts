import { extractPlayerCount } from "../../lib/player-count.mjs";

const STATUS_URL = "https://mckeepalivebots-a1.onrender.com/";

export async function onRequestGet() {
  try {
    const upstream = await fetch(STATUS_URL, {
      headers: { accept: "application/json, text/plain;q=0.9" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!upstream.ok) return Response.json({ error: "Player status source is unavailable" }, { status: 502 });

    const count = extractPlayerCount(await upstream.text());
    if (!count) return Response.json({ error: "Player count was not present in the status response" }, { status: 502 });
    return Response.json(count, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not reach the player status source" }, { status: 502 });
  }
}
