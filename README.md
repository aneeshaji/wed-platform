<div align="center">

# ✨ Shubh — Digital Wedding Platform

**A modern wedding website platform for creating beautiful, personalized digital wedding experiences.**

*Invitations · Event Details · Photo Gallery · RSVP · Bilingual*

[![Deploy to cPanel](https://img.shields.io/badge/Deploy-cPanel%20%2B%20GitHub%20Actions-blue?style=flat-square&logo=github-actions)](https://github.com)
[![Built with React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## What is Shubh?

**Shubh** is a premium digital wedding platform that transforms the traditional paper wedding card into an immersive, interactive online experience. Built for modern South Asian couples, it combines stunning cinematic design with practical guest features — all as a fast, zero-backend static website.

One deployment, every guest. No app to install. No login required. Just a beautiful link to share.

---

## ✨ Platform Features

### 🎨 Cinematic Design
- **Midnight aurora visual theme** — a lush, dark-mode hero with floating petals, sparkles, and animated gradient backgrounds
- **Couple caricature showcase** — illustrated caricatures of the couple in traditional and festive attire, embedded in the hero and gallery
- **Scroll-reveal animations** — smooth, staggered reveals as guests scroll through the invitation
- **Glassmorphism UI** — frosted-glass cards, gradient borders, and layered depth

### 🌐 Bilingual Experience
- **English + Malayalam (മലയാളം)** — the entire site toggles between languages instantly, with no page reload
- Language preference is persisted across visits via `localStorage`
- Proper nouns (names, venues) stay consistent across languages
- Designed to be extended to Hindi, Tamil, Arabic, and more

### ⏱️ Live Wedding Countdown
- Real-time countdown timer (days, hours, minutes, seconds) to the Muhurtham moment
- Updates every second, even on mobile

### 📅 Events & Schedule
- Dedicated cards for **Muhurtham** and **Reception** with full date, time, and venue details
- Visual timeline with animated milestone dots
- Each event shows its own icon, time slot, and location

### 🖼️ Interactive Photo Gallery
- **6-tile caricature gallery** — unique illustrated artworks for each wedding moment (ceremony, love story, reception, haldi, save-the-date, sangeet)
- **Lightbox modal** — click any tile for a full-screen immersive view with bilingual caption and event tag
- Hover-zoom and smooth animated transitions

### 📍 Venue & Directions
- Embedded **Google Maps iframe** for the ceremony venue
- Scannable **QR code** for instant live navigation on mobile
- One-tap **copy address** to clipboard

### ✈️ Travel & Stay Guide
- Practical guest info cards: by air, train, road, and accommodation
- Contact details for the wedding family coordinator

### ❓ FAQ Accordion
- Common guest questions answered in both languages
- Smooth expand/collapse with CSS transitions

### 📤 Share & Calendar Export
- **Web Share API** — native mobile share sheet with clipboard fallback
- **Download .ics** — one-click calendar event for Muhurtham and Reception
- **Email invite** — pre-filled mailto link with event details

### ♿ Accessible & Responsive
- Semantic HTML5 with full ARIA labeling
- Keyboard navigable
- Mobile-first responsive layout with a slide-in mobile menu
- Works on all modern browsers

---

## 🚀 Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server → http://localhost:5173
npm run build        # Production build → ./dist
npm run preview      # Preview production build locally
npm run check        # Validate couples.json ↔ content folders before pushing
npm run lint         # Lint with oxlint
npm run add:couple   # Scaffold a new couple (see "Adding a New Couple")
npm run migrate:all  # Bring every couple up to the current content schema
npm run migrate:couple -- <slug>   # Migrate one couple
```

> The default couple is the **first entry in `couples.json`**. To serve a
> specific one: `VITE_COUPLE=<slug> npm run dev`.
>
> CI deploys only couples with `"status": "live"` — a new couple stays a
> local `draft` until you flip it and push.

---

## 🏗️ Project Structure

```
wed.framezlabs.store/
├── index.html                    # Entry HTML shell — head meta injected at build
├── couples.json                  # 🧑‍🤝‍🧑 Registry: schemaVersion, slugs, subdomains, versions, statuses, SEO meta
├── public/
│   ├── images/<slug>/            # Per-couple hero portrait (couple_hero.png)
│   ├── og-<slug>.jpg             # Per-couple social share image
│   └── .htaccess                 # Apache SPA routing for cPanel
├── src/
│   ├── App.jsx                   # Shared render tree — reads per-couple config
│   ├── App.css                   # Design system, layout, animations
│   ├── index.css                 # CSS tokens, palette, fonts, base
│   ├── icons.jsx                 # Custom SVG icon components
│   ├── decor.jsx                 # Decorative SVG (Diya animations)
│   └── config/                   # Per-couple content
│       ├── index.js              # Resolver: manifest + virtual:couple-content (active couple only)
│       ├── base.js               # Shared UI labels (EN/ML), nav, decorations
│       └── couples/              # One folder per couple — pure JSON content
│           ├── _template.json    # Data template ("__SLUG__" placeholders) for new couples
│           └── <slug>/content.json  # A couple's entire website content
├── scripts/
│   ├── add-couple.mjs            # Scaffold a new couple (data + images, `npm run add:couple`)
│   ├── check.mjs                 # Validate the setup (`npm run check`)
│   ├── migrate-couple.mjs        # Upgrade couples to the current schema
│   └── migrations/               # Schema object-transforms (`<from>-to-<to>.mjs`)
│       ├── README.md             # Contract + lifecycle docs
│       └── _template.mjs         # Template for the next step
├── .env                          # Optional VITE_COUPLE override (default = first couple)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: auto-scaling matrix from couples.json
├── dist/                         # Production build output (auto-generated)
├── package.json
└── vite.config.js
```

---

## 🧑‍🤝‍🧑 Adding a New Couple (2nd site, 3rd site, …)

This is a **multi-couple platform**: one repo, one shared React app, and one
couple per subdomain. Each couple is **pure data** — a `content.json` file plus
their images — no new repo, no duplicated code, no per-couple modules. Fixes
and features you ship apply to every couple automatically.

`couples.json` is the **single registration point**: it holds each couple's
slug, content `version`, lifecycle `status` (`draft` / `live` / `archived`),
subdomain (`serverDir`) and SEO/share meta (`site`). A Vite plugin serves the
**active** couple's `content.json` through the `virtual:couple-content` module,
so each build ships only that couple's data, injects `<head>` meta per couple,
and the deploy matrix is generated from the same file — nothing in the platform
code names a specific couple. See [Versioning & lifecycle](#️-versioning--lifecycle)
below.

### The structure

```
couples.json                    # Registry: slug, version, status, subdomain + SEO meta
src/config/
├── index.js                    # Resolver: manifest + virtual:couple-content (active couple)
├── base.js                     # Shared UI labels (EN/ML) + nav + decorations
└── couples/
    ├── _template.json          # Data template ("__SLUG__" placeholders) for new couples
    ├── sneha-sarath/
    │   └── content.json        # Live example — Sneha & Sarathraj (all website content)
    └── <slug>/                 # 📋 New couples (npm run add:couple -- <slug>)
        └── content.json
public/images/<slug>/couple_hero.png   # That couple's hero portrait (referenced by path)
```

### To add a new couple (6 steps)

1. **Create the subdomain** on cPanel, e.g. `raj-rani.wed.framezlabs.store`
   (the FTP account deploys there — same FTP credentials work as long as the
   account can write to the new subdomain's folder).

2. **Scaffold the couple:**
   ```bash
   npm run add:couple -- raj-rani
   ```
   This copies `_template.json` into `src/config/couples/raj-rani/content.json`,
   creates `public/images/raj-rani/` for the hero portrait, and registers a
   placeholder `raj-rani` entry in `couples.json` as a **draft**
   (`version` = current schema, `status: "draft"`).

3. **Drop in the hero portrait:**
   `public/images/raj-rani/couple_hero.png` (already referenced by
   `brand.heroImage` — no import to wire).

4. **Fill in `src/config/couples/raj-rani/content.json`** — names, date, venue,
   events, FAQ, travel info, and both EN + ML strings. Every field is
   documented in [`src/config/couples/README.md`](src/config/couples/README.md).

5. **Update the `raj-rani` entry in `couples.json`** — the `site` meta
   (name, title, description, ogUrl, ogImage) and `serverDir` subdomain.
   Drop their OG share image in `public/` as `og-raj-rani.jpg`.

6. **Validate and preview:**
   ```bash
   npm run check     # couples.json ↔ content.json consistent?
   npm run dev       # preview locally (VITE_COUPLE=raj-rani npm run dev)
   ```

7. **Launch it:** set `"status": "live"` in the `raj-rani` entry and push —
   CI builds it and FTP-deploys to its subdomain 🎉. Until then it's a local
   draft and never touches the deploy.

No edits to App.jsx, the resolver, vite.config.js, deploy.yml, or `.env`.

> Tip: set the default couple in `.env` (`VITE_COUPLE=sneha-sarath`) as your
> local dev target. With no override, the **first entry in `couples.json`**
> is served. In CI the deploy matrix overrides this per couple.

### Editing an existing couple

Open `src/config/couples/<slug>/content.json` — the couple's names, dates,
venue, events, FAQ, travel info, share text, and calendar all live there. The
generic UI labels (Days, Share, section titles…) live once in
`src/config/base.js` and are shared by every couple (a couple can override any
of them via `strings`).

### Adding a Language

1. Add a new block to both `baseL` and each couple's `strings`:
   `const L = { en: {…}, ml: {…}, hi: {…} }`
2. Add a button to the `languageSwitch` JSX component
3. That's it — every string on the site updates automatically

---

## 🗂️ Versioning & lifecycle

As a product with many couples, every couple in the registry carries a
content **version** and a lifecycle **status**.

| Field | Meaning |
|---|---|
| `schemaVersion` (top level) | The platform's current *content shape*. Bump it when you change what a couple's `content.json` looks like (rename/add/move a field). |
| `version` (per couple) | Which schema this couple's content is on. Must equal `schemaVersion` to build/deploy. |
| `status` (per couple) | `draft` (local only, not deployed) · `live` (deployed) · `archived` (retired, kept in the registry). |

### Upgrading couples when the schema changes

1. Update `App.jsx` / `base.js` to read the new shape.
2. Bump `schemaVersion` in `couples.json` (e.g. `1` → `2`).
3. Add a migration step: `scripts/migrations/1-to-2.mjs` exporting
   `{ from, to, up(content) }` — a pure JSON object transform
   (see [`scripts/migrations/README.md`](scripts/migrations/README.md)).
4. Migrate couples one at a time — `npm run migrate:couple -- <slug>` — or
   all at once: `npm run migrate:all`.
5. `npm run check` **fails** on any couple whose `version !== schemaVersion`,
   so a stale couple can never be built or deployed.

A couple is launched by flipping `"status"` to `"live"` — CI deploys **only
live couples**, so drafts and archives stay off every subdomain.

---

## 🚢 Deployment — GitHub Actions + cPanel

This project ships with a pre-configured CI/CD pipeline.

**Every push to `main` automatically:**
1. Reads `couples.json` and builds a **deploy matrix** — one entry per
   couple with `"status": "live"` (drafts/archives are skipped)
2. Runs `npm ci`
3. Builds each couple (`VITE_COUPLE=<slug>`) — with its own `<head>` SEO meta
4. Uploads each `dist/` folder to its own cPanel subdomain via **FTP**, in parallel

Adding a `live` couple to `couples.json` makes CI deploy it automatically —
no workflow edits needed.

### Setup (3 Steps)

**1. Push to GitHub**
```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO.git
git push -u origin main
```

**2. Add GitHub Secrets** (Repo → Settings → Secrets → Actions)

| Secret | Value |
|---|---|
| `FTP_SERVER` | Your cPanel hostname e.g. `s66519.dnspark.in` |
| `FTP_USERNAME` | FTP account login e.g. `deploy@yourdomain.com` |
| `FTP_PASSWORD` | FTP account password |

**3. Push any change** — the GitHub Action runs automatically ✅

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI components & hooks |
| **Vite** | 8 | Dev server & production bundler |
| **qrcode.react** | latest | Venue QR code generation |
| **oxlint** | latest | Fast linting |
| **GitHub Actions** | — | CI/CD pipeline |
| **FTP-Deploy-Action** | v4.3.5 | cPanel deployment |

---

## 🗺️ Roadmap

- [ ] RSVP backend — wire to a headless form service (Formspree, Airtable, Supabase)
- [ ] More language packs — Hindi, Tamil, Arabic, Kannada
- [ ] CMS-backed content — manage all content without touching code
- [ ] Multiple gallery layout options — masonry, carousel, story format
- [ ] Animated QR invite card for WhatsApp sharing
- [ ] Print-ready PDF invitation export

---

## 📄 License

MIT © [FrameZ Labs](https://framezlabs.store) — Designed & Developed with 💜

---

<div align="center">

*Crafted with love, for every beautiful celebration.*

**[framezlabs.store](https://framezlabs.store)** · **[Technobyte Innovations](https://technobyteinnovations.in)**

</div>