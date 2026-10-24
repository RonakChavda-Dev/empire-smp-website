# Empire SMP

A single-page Next.js site for the Empire SMP Minecraft survival server.

## Cloudflare Pages setup

This project is configured as a static Next.js export. In the Cloudflare Pages setup shown in the dashboard, use:

- **Project name:** `empiresmp` (the `pages.dev` URL shown in the setup screenshot)
- **Production branch:** `main`
- **Framework preset:** `Next.js (Static HTML Export)`
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory:** leave blank for this repository
- **Node.js:** pinned to 22 by `.node-version`

Cloudflare Pages installs dependencies from `package-lock.json`, runs the build, and publishes `out/`. The landing page is statically exported; a small Pages Function at `/api/players` proxies the live player-count request to the status source so the browser does not need cross-origin access.

If you connect a custom domain later, set `NEXT_PUBLIC_SITE_URL` to that full HTTPS origin in the Pages build environment. It is currently set to the `https://empiresmp.pages.dev` address shown in the setup screenshot for canonical, sitemap, robots, and social-card URLs.

## Local use

- `npm run dev` — run Next.js and a local player-status proxy (the proxy is needed because the Cloudflare Pages Function is not part of `next dev`)
- `npm run build` — create the static site in `out/`

## Discord preview image

`public/og-image.png` is the 1200 × 630 Open Graph card. The deployed page exposes it at `/og-image.png` and includes Open Graph and large Twitter card metadata. Discord will fetch the card when someone shares the site URL. Social platforms may cache previews; add a version query to the image URL in `app/layout.tsx` if the artwork is changed after the first share.

The live player badge polls `/api/players` every 30 seconds. Its Cloudflare Pages Function reads the status URL in `functions/api/players.ts` and accepts common JSON player-count fields (or plain text counts). If the source uses a different response shape or requires a separate API path, update that parser and `STATUS_URL`.

To regenerate the card from the provided castle screenshot, run `python scripts/create_social_card.py` in an environment with Pillow installed.
