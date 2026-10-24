const PLAYER_KEYS = new Set(["online", "onlineplayers", "playersonline", "playercount", "currentplayers", "players"]);
const MAX_KEYS = new Set(["max", "maxplayers", "maximumplayers", "playerlimit"]);

function numeric(value) {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
  if (typeof value === "string" && value.trim() !== "" && /^\d+(?:\.\d+)?$/.test(value.trim())) return Number(value);
  return undefined;
}

function findNumber(value, acceptedKeys) {
  if (!value || typeof value !== "object") return undefined;
  if (Array.isArray(value)) return undefined;

  const entries = Object.entries(value);
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

function parseTextCount(text) {
  const bareCount = text.trim().match(/^\d+$/);
  if (bareCount) return { online: Number(bareCount[0]) };

  const ratio = text.match(/(?:players?\s*)?(\d+)\s*\/\s*(\d+)/i);
  if (ratio) return { online: Number(ratio[1]), max: Number(ratio[2]) };

  const online = text.match(/(?:players?\s+)?online\s*[:=\-]?\s*(\d+)/i);
  return online ? { online: Number(online[1]) } : null;
}

export function extractPlayerCount(body) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return parseTextCount(body);
  }

  const online = findNumber(payload, PLAYER_KEYS);
  if (online === undefined) return parseTextCount(body);
  const max = findNumber(payload, MAX_KEYS);
  return { online, ...(max !== undefined ? { max } : {}) };
}
