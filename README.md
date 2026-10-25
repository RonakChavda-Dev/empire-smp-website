# The Empire SMP

**Build your own kingdom.**

The Empire is a Minecraft survival world. Find your ground, make your mark, and decide what is worth defending.

This repository is the official website for The Empire SMP. It is a single page that introduces the server, explains what kind of world it is, and gets new players connected as quickly as possible.

🌐 **Website:** [empiresmp.pages.dev](https://empiresmp.pages.dev)

---

## Join the realm

| | |
|---|---|
| **Server address** | `theempiresmp.play.hosting` |
| **Edition** | Minecraft Java Edition 1.8 – 26.3 |
| **No account or launcher?** | Play in your browser with Eaglercraft at [eymenwsmc.site](https://eymenwsmc.site/) |
| **Community** | [Empire SMP Discord](https://discord.gg/r8Tp55WBbS) |

Add the address to your Minecraft server list and you're in. If you don't own Minecraft or don't have a launcher, the browser version works on Eaglercraft 26.2 and 26.3 without any download.

---

## What is The Empire?

Empire is a shared survival world with no preset kingdom and no story handed down. It starts with a patch of wilderness and a few tools. What comes next is up to you.

- **Take root.** Find land beyond the beaten path, gather what you need, and build your first shelter.
- **Raise your banner.** Turn a refuge into a homestead and a homestead into a town. Invite allies and put yourself on the map.
- **Make your name.** Trade, bargain, explore, compete, or write your own laws. The realm grows through the choices players make together.

### A realm with real stakes

Empire is **griefable**. There are no grief protections, so builds and belongings can be raided, damaged, or taken. That risk is part of the world:

- **Your walls can fall.** Choose your ground carefully.
- **Trust is part of the game.** Allies can make a town stronger, and rivalries can redraw its borders.
- **The world belongs to its players.** There's room for builders, explorers, traders, tacticians, and troublemakers. Play your way, and leave space for others to do the same.

---

## What's on the website

The site walks a new player from first impression to joining the server:

1. **The keep:** a hero section with the live player count, a one-click copy of the server IP, and links to Discord and browser play.
2. **The world:** what Empire is and why players come here.
3. **Your journey:** how a player grows from their first night to a legend.
4. **The charter:** the server's ground rules and what a griefable world means.
5. **Before you join:** what to expect, how to connect, and how to play in a browser without an account.
6. **FAQ:** quick answers about griefing, versions, and joining.

---

## For developers

The site is built with Next.js and React, exported as a static site, and hosted on Cloudflare Pages. A small Cloudflare Pages Function at `/api/players` provides the live player count.

```bash
npm install
npm run dev     # local site + player-count proxy
npm run build   # static export to out/
```

Requires Node.js 22 or newer. To use a custom domain, set `NEXT_PUBLIC_SITE_URL` in the Cloudflare Pages build environment.

---

<p align="center"><em>Make history, block by block.</em></p>
