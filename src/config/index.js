/* ------------------------------------------------------------------
   Config resolver — fully manifest-driven, couples are pure data.

   - `couples.json` (repo root) is the single source of truth: which
     couples exist, their subdomain (`serverDir`), SEO/share meta, content
     version and lifecycle status.
   - Couple content is pure JSON data (`src/config/couples/<slug>/content.json`).
     The build serves only the ACTIVE couple's content via the Vite virtual
     module `virtual:couple-content` — no other couple's data is bundled.
   - The active couple is chosen by `VITE_COUPLE` (build-time env), and
     defaults to the first couple in the manifest.

   To add a couple: `npm run add:couple -- <slug>`, then fill content.json +
   the couples.json entry. See src/config/couples/README.md.
------------------------------------------------------------------ */

import manifest from '../../couples.json'
import content from 'virtual:couple-content'
import { baseL, navLinks, sparkles, petals } from './base'

const fallback = manifest.couples[0] || {
  slug: undefined,
  serverDir: undefined,
  site: {},
  version: undefined,
  status: undefined,
}
const requested = import.meta.env.VITE_COUPLE
const entry = manifest.couples.find((c) => c.slug === requested) || fallback

/* Full translation dictionary: shared base labels, overridden by the couple. */
const L = {
  en: { ...baseL.en, ...(content.strings?.en || {}) },
  ml: { ...baseL.ml, ...(content.strings?.ml || {}) },
}

export default {
  ...content,
  slug: entry.slug,
  serverDir: entry.serverDir,
  site: entry.site,
  version: entry.version,
  status: entry.status,
  navLinks,
  sparkles,
  petals,
  L,
}
