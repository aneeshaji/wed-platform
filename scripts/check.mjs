/* ------------------------------------------------------------------
   Validate the multi-couple setup before pushing.

   Checks that couples.json and src/config/couples/ are consistent:
   - manifest is valid JSON with a domain, schemaVersion + non-empty couples list
   - every couple has URL-safe slug, serverDir, full site meta, a version
     and a status (draft | live | archived)
   - every couple is at the current schemaVersion (run the migrations first)
   - every manifest slug has a content.json (valid JSON + required fields)
     and vice-versa
   - warns if a couple's public/og-<slug>.jpg share image is missing

   Usage:  npm run check
------------------------------------------------------------------ */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const REQUIRED_SITE = ['name', 'title', 'description', 'ogUrl', 'ogImage']
const STATUSES = ['draft', 'live', 'archived']
const REQUIRED_CONTENT = [
  ['brand', 'brand'],
  ['weddingTarget', 'weddingTarget'],
  ['venueName', 'venueName'],
  ['venueAddress', 'venueAddress'],
  ['strings', 'strings'],
]
const REQUIRED_BRAND = ['name1', 'name2', 'initials', 'brandDate', 'heroImage', 'heroAlt']
const OPTIONAL_CONTENT = [
  'icsFilename',
  'audioSrc',
  'venueUrl',
  'venueMapEmbed',
  'highlights',
  'schedule',
  'events',
  'faqs',
  'travelData',
  'calendar',
]
const errors = []
const warnings = []

/**
 * Validate one couple's content.json. `couple` is the manifest entry;
 * `dir` is its content folder. Pushes to errors/warnings.
 */
function checkContent(couple, dir) {
  const file = join(dir, 'content.json')
  if (!existsSync(file)) {
    errors.push(`Couple "${couple.slug}" has no src/config/couples/${couple.slug}/content.json.`)
    return
  }
  let content
  try {
    content = JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    errors.push(`Couple "${couple.slug}" content.json is not valid JSON: ${err.message}`)
    return
  }
  for (const key of REQUIRED_CONTENT.map((k) => k[0])) {
    if (content[key] === undefined) errors.push(`Couple "${couple.slug}" content.json is missing "${key}".`)
  }
  if (typeof content.brand === 'object' && content.brand) {
    for (const key of REQUIRED_BRAND) {
      if (content.brand[key] === undefined) {
        errors.push(`Couple "${couple.slug}" content.json brand is missing "${key}".`)
      }
    }
  }
  if (typeof content.strings?.en !== 'object' || !content.strings.en) {
    errors.push(`Couple "${couple.slug}" content.json needs "strings.en" (object).`)
  }
  if (typeof content.strings?.ml !== 'object' || !content.strings.ml) {
    errors.push(`Couple "${couple.slug}" content.json needs "strings.ml" (object).`)
  }
  for (const key of OPTIONAL_CONTENT) {
    if (content[key] === undefined) {
      warnings.push(`Couple "${couple.slug}" content.json is missing optional "${key}".`)
    }
  }
}

/* ---- manifest ---- */
const manifestPath = join(root, 'couples.json')
let manifest
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
} catch (err) {
  console.error(`✗ couples.json is not valid JSON: ${err.message}`)
  process.exit(1)
}
if (!manifest.domain) errors.push('couples.json is missing "domain".')
if (!Number.isInteger(manifest.schemaVersion) || manifest.schemaVersion < 1) {
  errors.push('couples.json is missing a valid "schemaVersion" (integer ≥ 1).')
}
if (!Array.isArray(manifest.couples)) {
  errors.push('couples.json is missing a "couples" array.')
} else if (manifest.couples.length === 0) {
  errors.push('couples.json has no couples — add at least one.')
} else {
  const seen = new Set()
  manifest.couples.forEach((c) => {
    if (!c.slug) {
      errors.push('A couple entry is missing "slug".')
      return
    }
    if (seen.has(c.slug)) errors.push(`Duplicate slug "${c.slug}".`)
    seen.add(c.slug)
    if (!SLUG_RE.test(c.slug)) {
      errors.push(`Slug "${c.slug}" is not URL-safe (lowercase letters/numbers/hyphens).`)
    }
    if (!c.serverDir) errors.push(`Couple "${c.slug}" is missing "serverDir".`)
    if (!Number.isInteger(c.version) || c.version < 1) {
      errors.push(`Couple "${c.slug}" is missing a valid "version" (integer ≥ 1).`)
    } else if (c.version !== manifest.schemaVersion) {
      errors.push(
        `Couple "${c.slug}" is on content version ${c.version}, but schemaVersion is ${manifest.schemaVersion}. Run "npm run migrate:couple -- ${c.slug}".`,
      )
    }
    if (!STATUSES.includes(c.status)) {
      errors.push(`Couple "${c.slug}" has an invalid "status" (expected ${STATUSES.join(' | ')}).`)
    }
    for (const key of REQUIRED_SITE) {
      if (!c.site?.[key]) errors.push(`Couple "${c.slug}" is missing site.${key}.`)
    }
    checkContent(c, join(root, 'src', 'config', 'couples', c.slug))
    if (!existsSync(join(root, 'public', `og-${c.slug}.jpg`))) {
      warnings.push(`Couple "${c.slug}" is missing public/og-${c.slug}.jpg (social share image).`)
    }
  })
}

/* ---- content folders ---- */
const couplesDir = join(root, 'src', 'config', 'couples')
if (existsSync(couplesDir)) {
  for (const entry of readdirSync(couplesDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue
    const hasContent = existsSync(join(couplesDir, entry.name, 'content.json'))
    const inManifest = manifest.couples?.some((c) => c.slug === entry.name)
    if (!inManifest) {
      errors.push(`Folder src/config/couples/${entry.name}/ exists but is not in couples.json.`)
    } else if (!hasContent) {
      errors.push(`Folder src/config/couples/${entry.name}/ has no content.json.`)
    }
  }
}

if (errors.length) {
  console.error('✗ Validation failed:')
  errors.forEach((e) => console.error(`   - ${e}`))
  process.exit(1)
}
if (warnings.length) {
  console.warn('⚠ Warnings:')
  warnings.forEach((w) => console.warn(`   - ${w}`))
}
console.log(`✅ couples.json OK — ${manifest.couples?.length ?? 0} couple(s) ready to build.`)
