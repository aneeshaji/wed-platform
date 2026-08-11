# Couples

Each couple is a folder here named after its URL slug. The slug must match the
subdomain `slug.wed.framezlabs.store` **and** an entry in [`couples.json`](../../../couples.json)
at the repo root. A couple is **pure data** — one `content.json` file plus an
image in `public/images/<slug>/`.

```
src/config/couples/
├── _template.json          # Data template ("__SLUG__" placeholders) — do not edit directly
├── sneha-sarath/           # Working example — copy its structure
│   └── content.json        # This couple's entire website content
└── <slug>/                 # New couples (npm run add:couple -- <slug>)
    └── content.json
public/images/<slug>/       # Per-couple images (couple_hero.png referenced by brand.heroImage)
```

> **What lives where**
> - **`content.json`** → everything the *website* renders: names, dates, venue,
>   events, FAQ, travel, EN/ML strings, calendar, audio, ICS filename, and the
>   hero portrait **path** (`brand.heroImage` — e.g. `/images/<slug>/couple_hero.png`).
> - **`couples.json`** → the slug, content `version`, lifecycle `status`
>   (`draft` / `live` / `archived`), subdomain (`serverDir`) and SEO/share meta
>   (`site`) — used by the build for `<head>` injection and by CI for deploy.
>   A couple's `site` meta and version/status do **not** belong in `content.json`.

## Adding a couple

```bash
npm run add:couple -- raj-rani
```

This copies `_template.json` → `src/config/couples/raj-rani/content.json`,
creates `public/images/raj-rani/`, and registers the couple in `couples.json`
as a **draft** (current `schemaVersion`, `status: "draft"`). Then:

1. Drop the hero portrait at `public/images/raj-rani/couple_hero.png`
   (already the value of `brand.heroImage`).
2. Fill in `content.json` — names, date, venue, events, FAQ, travel, EN/ML strings.
3. Update the `raj-rani` entry in `couples.json` (site meta + `serverDir`).
4. Drop `public/og-raj-rani.jpg` (social share image) and point `site.ogImage` at it.
5. `npm run check` → `npm run dev` to preview.
6. When ready, set `"status": "live"` and push — CI deploys it. (Drafts and
   archived couples are never deployed.)

When the platform's content schema changes, `npm run migrate:couple -- raj-rani`
(or `npm run migrate:all`) brings couples up to date — see the "Versioning &
lifecycle" section of the repo README.

## `content.json` fields

| Field | Type | Notes |
|---|---|---|
| `icsFilename` | string | Filename guests get when they download the calendar invite |
| `audioSrc` | string | Background-music URL (`/audio/…`). Shared track by default |
| `theme.fonts` | object (optional) | Per-couple font theme: `display` / `serif` / `sans` family names + a Google Fonts `url`. Omit to keep the shared defaults. Injected into `<head>` at build time; other couples are unaffected. |
| `brand.name1` / `name2` | string | Names rendered letter-by-letter in the hero |
| `brand.initials` | string | Monogram (brand mark, badge, footer) |
| `brand.brandDate` | string | Short date in the header (`13.09.26`) |
| `brand.heroImage` | string | Portrait **path** (`/images/<slug>/couple_hero.png`) |
| `brand.heroAlt` | string | Alt text for the portrait |
| `weddingTarget` | string | Countdown target, ISO with offset (`2026-09-13T11:55:00+05:30`) |
| `venueName` / `venueUrl` / `venueAddress` / `venueMapEmbed` | string | Venue card + directions |
| `receptionVenue` | object (optional) | Second map in the Venue section when the reception is at a different place: `{ name, address, url, mapEmbed }`. Omit if the reception shares the ceremony venue. |
| `strings.en` / `strings.ml` | object | Couple-specific labels; optional keys fall back to `../base.js` |
| `highlights` | array | "Details" rows; `icon` is a key from the map below |
| `schedule` | array | "Schedule" timeline |
| `events` | array | "Events & Ceremonies" cards |
| `faqs` | array | FAQ accordion |
| `travelData` | array | Travel & stay cards |
| `calendar` | array | ICS events; `dtstart`/`dtend` in `Asia/Kolkata` (`yyyymmddThhmmss`) |

**Icon keys** (used as `icon:` in `highlights` / `schedule` / `events` / `travelData`):
`mappin` · `heart` · `rings` · `glass` · `plane` · `train` · `bed` · `phone`

See [`sneha-sarath/content.json`](./sneha-sarath/content.json) for a complete,
working example, and [`_template.json`](./_template.json) for the scaffold.
