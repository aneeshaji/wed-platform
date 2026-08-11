/* ------------------------------------------------------------------
   Scaffold a new couple from pure data.

   Usage:  npm run add:couple -- <slug>
   Example: npm run add:couple -- raj-rani

   Copies src/config/couples/_template.json (the content template,
   with "__SLUG__" placeholders) into src/config/couples/<slug>/content.json,
   scaffolds public/images/<slug>/ for the hero portrait, and registers
   the couple in couples.json (draft, current schema, subdomain + site meta).
------------------------------------------------------------------ */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const slug = process.argv[2]

if (!slug) {
  console.error('Usage: npm run add:couple -- <slug>')
  console.error('Example: npm run add:couple -- raj-rani')
  process.exit(1)
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
if (!SLUG_RE.test(slug)) {
  console.error(
    `Invalid slug "${slug}". Use lowercase letters, numbers and single hyphens, e.g. "raj-rani".`,
  )
  process.exit(1)
}

const manifestPath = join(root, 'couples.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const domain = manifest.domain || 'wed.framezlabs.store'

if (!Array.isArray(manifest.couples)) {
  console.error('couples.json is missing a "couples" array.')
  process.exit(1)
}
if (manifest.couples.some((c) => c.slug === slug)) {
  console.error(`A couple with slug "${slug}" already exists in couples.json.`)
  process.exit(1)
}

const dir = join(root, 'src', 'config', 'couples', slug)
const imagesDir = join(root, 'public', 'images', slug)
if (existsSync(dir)) {
  console.error(`A folder already exists at ${dir}.`)
  process.exit(1)
}

/* ---- content.json from the data template ---- */
const templatePath = join(root, 'src', 'config', 'couples', '_template.json')
if (!existsSync(templatePath)) {
  console.error(`Missing content template at ${templatePath}.`)
  process.exit(1)
}
const template = readFileSync(templatePath, 'utf8')
if (!template.includes('__SLUG__')) {
  console.error('The template must contain "__SLUG__" placeholders.')
  process.exit(1)
}

let content
try {
  content = JSON.parse(template.replaceAll('__SLUG__', slug))
} catch (err) {
  console.error(`Invalid content template JSON: ${err.message}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, 'content.json'), `${JSON.stringify(content, null, 2)}\n`)

/* ---- public/images/<slug>/ for the hero portrait ---- */
mkdirSync(imagesDir, { recursive: true })
writeFileSync(join(imagesDir, '.gitkeep'), '')

/* ---- register in couples.json ---- */
manifest.couples.push({
  slug,
  version: manifest.schemaVersion ?? 1,
  status: 'draft',
  serverDir: `${slug}.${domain}/`,
  site: {
    name: 'Couple Names',
    title: 'Couple Names — Wedding Invitation',
    description:
      'Join us to celebrate the wedding of Couple Names on Friday, 1 January 2027 at 10:00 AM — Venue Name, City, Kerala.',
    ogUrl: `https://${slug}.${domain}/`,
    ogImage: `https://${slug}.${domain}/og-${slug}.jpg`,
  },
})
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`✅ Created src/config/couples/${slug}/content.json and public/images/${slug}/`)
console.log(`   Registered "${slug}" in couples.json (status "draft" — CI deploys a couple only when "live").`)
console.log('Next steps:')
console.log(`  1. Drop the couple portrait at public/images/${slug}/couple_hero.png (referenced by brand.heroImage).`)
console.log(`  2. Fill in src/config/couples/${slug}/content.json (names, date, venue, events, FAQ, travel).`)
console.log(`  3. Update the "${slug}" entry in couples.json (site meta).`)
console.log(`  4. Add public/og-${slug}.jpg and point site.ogImage at it.`)
console.log('  5. Run "npm run check", then "npm run dev" to preview.')
console.log(`  6. When ready, set "${slug}" status to "live" and push to deploy.`)
