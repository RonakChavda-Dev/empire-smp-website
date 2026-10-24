import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { extractPlayerCount } from "../lib/player-count.mjs";

const statusUrl = "https://mckeepalivebots-a1.onrender.com/";
const proxy = createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method === "OPTIONS") {
    response.writeHead(204, { "Access-Control-Allow-Methods": "GET, OPTIONS" });
    response.end();
    return;
  }

  if (request.method !== "GET" || request.url?.split("?")[0] !== "/api/players") {
    response.writeHead(404);
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  try {
    const upstream = await fetch(statusUrl, {
      headers: { accept: "application/json, text/plain;q=0.9" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!upstream.ok) throw new Error(`Status source returned ${upstream.status}`);

    const count = extractPlayerCount(await upstream.text());
    if (!count) throw new Error("Status source did not return a player count");

    response.writeHead(200);
    response.end(JSON.stringify(count));
  } catch (error) {
    response.writeHead(502);
    response.end(JSON.stringify({ error: error instanceof Error ? error.message : "Status source unavailable" }));
  }
});

proxy.once("error", (error) => {
  console.error("Could not start the local player-status proxy:", error.message);
  process.exit(1);
});

proxy.listen(8788, "127.0.0.1", () => {
  console.log("Empire SMP local player-status proxy ready at http://127.0.0.1:8788");
  const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  const next = spawn(process.execPath, [nextCli, "dev", ...process.argv.slice(2)], { stdio: "inherit" });

  let stopping = false;
  const stop = (signal) => {
    if (stopping) return;
    stopping = true;
    next.kill(signal === "SIGINT" ? "SIGINT" : "SIGTERM");
    proxy.close();
  };

  process.on("SIGINT", () => stop("SIGINT"));
  process.on("SIGTERM", () => stop("SIGTERM"));
  next.on("error", (error) => {
    console.error("Could not start Next.js:", error.message);
    stop("SIGTERM");
    process.exitCode = 1;
  });
  next.on("exit", (code) => {
    proxy.close();
    process.exitCode = code ?? 0;
  });
});
