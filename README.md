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
npm install       # Install dependencies
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build → ./dist
npm run preview   # Preview production build locally
npm run lint      # Lint with oxlint
```

---

## 🏗️ Project Structure

```
wed.framezlabs.store/
├── index.html                    # Entry HTML shell
├── public/
│   ├── images/                   # Caricature artworks (PNG / SVG)
│   └── .htaccess                 # Apache SPA routing for cPanel
├── src/
│   ├── App.jsx                   # All content config + full render tree
│   ├── App.css                   # Design system, layout, animations
│   ├── index.css                 # CSS tokens, palette, fonts, base
│   ├── icons.jsx                 # Custom SVG icon components
│   └── decor.jsx                 # Decorative SVG (Diya animations)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions → cPanel FTP deployment
├── dist/                         # Production build output (auto-generated)
├── package.json
└── vite.config.js
```

---

## ⚙️ Customising for a New Couple

Almost everything is configuration-driven. Open [`src/App.jsx`](src/App.jsx) and update the data at the top of the file:

| What to change | Where |
|---|---|
| Couple's names & hero headline | `splitWord('Sneha')` / `splitWord('Sarathraj')` |
| Wedding date & countdown | `weddingTarget` constant |
| All UI strings (EN + ML) | `const L = { en: {…}, ml: {…} }` dictionary |
| Events, times & venues | `events`, `schedule` arrays |
| Photo gallery tiles | `galleryTiles` array |
| Caricature showcase cards | `caricatures` array |
| Venue map URL & address | `venueUrl`, `venueAddress` |
| FAQ content | `faqs` array |
| Travel info | `travelData` array |
| Colors, fonts, spacing | CSS tokens in `src/index.css` |

### Adding a Language

1. Add a new block to the `L` dictionary: `const L = { en: {…}, ml: {…}, hi: {…} }`
2. Add a button to the `languageSwitch` JSX component
3. That's it — every string on the site updates automatically

---

## 🚢 Deployment — GitHub Actions + cPanel

This project ships with a pre-configured CI/CD pipeline.

**Every push to `main` automatically:**
1. Runs `npm ci`
2. Runs `npm run build`
3. Uploads the `dist/` folder to your cPanel subdomain via **FTP**

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