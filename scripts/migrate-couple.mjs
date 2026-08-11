/* ------------------------------------------------------------------
   Upgrade a couple's content.json to the current schemaVersion.

   Content schema versions track the SHAPE of a couple's content.json.
   When the platform changes that shape (new/renamed fields), bump
   "schemaVersion" in couples.json and add a migration step:

       scripts/migrations/<from>-to-<to>.mjs   →   { from, to, up(content) }

   Each step transforms the parsed content object and returns a new one
   (pure JSON — no text codemods, no comments or imports to preserve),
   then bumps the couple's "version" in couples.json.

   Usage:
     npm run migrate:couple -- <slug>   # migrate one couple
     npm run migrate:all                # migrate every couple on an old version
------------------------------------------------------------------ */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const migrationsDir = join(root, 'scripts', 'migrations')

/* ---- manifest ---- */
const manifestPath = join(root, 'couples.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const target = manifest.schemaVersion

/* ---- load migration steps: {from, to, up} sorted ascending ---- */
const steps = []
for (const file of readdirSync(migrationsDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_'))) {
  const mod = await import(pathToFileURL(join(migrationsDir, file)).href)
  if (Number.isInteger(mod.from) && Number.isInteger(mod.to) && typeof mod.up === 'function') {
    steps.push({ file, from: mod.from, to: mod.to, up: mod.up })
  }
}
steps.sort((a, b) => a.from - b.from)

/** Migrate one couple's content.json in place. Returns how far it moved. */
function migrateCouple(couple) {
  const file = join(root, 'src', 'config', 'couples', couple.slug, 'content.json')
  if (!existsSync(file)) {
    throw new Error(`No content file for "${couple.slug}" at ${file}.`)
  }
  let content
  try {
    content = JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    throw new Error(`"${couple.slug}" content.json is not valid JSON: ${err.message}`)
  }
  let version = couple.version ?? 0
  const applied = []

  while (version < target) {
    const step = steps.find((s) => s.from === version)
    if (!step) {
      throw new Error(
        `No migration step from version ${version} to ${target} for "${couple.slug}". ` +
          `Write scripts/migrations/${version}-to-${version + 1}.mjs first.`,
      )
    }
    content = step.up(content)
    if (typeof content !== 'object' || !content) {
      throw new Error(`Migration ${step.from}→${step.to} returned a non-object for "${couple.slug}".`)
    }
    version = step.to
    applied.push(`${step.from}→${step.to} (${step.file})`)
  }

  return { content, version, applied }
}

/* ---- pick the couples to migrate ---- */
let couples
if (process.argv.includes('--all')) {
  couples = manifest.couples.filter((c) => (c.version ?? 0) < target)
  if (!couples.length) {
    console.log(`✅ All ${manifest.couples.length} couple(s) already on schemaVersion ${target}.`)
    process.exit(0)
  }
} else {
  const slug = process.argv[2]
  if (!slug) {
    console.error('Usage: npm run migrate:couple -- <slug>   |   npm run migrate:all')
    process.exit(1)
  }
  couples = manifest.couples.filter((c) => c.slug === slug)
  if (!couples.length) {
    console.error(`No couple "${slug}" in couples.json.`)
    process.exit(1)
  }
}

/* ---- run ---- */
let changed = false
for (const couple of couples) {
  if ((couple.version ?? 0) >= target) {
    console.log(`⚪ "${couple.slug}" already on schemaVersion ${target}.`)
    continue
  }
  try {
    const { content, version, applied } = migrateCouple(couple)
    writeFileSync(
      join(root, 'src', 'config', 'couples', couple.slug, 'content.json'),
      `${JSON.stringify(content, null, 2)}\n`,
    )
    couple.version = version
    changed = true
    console.log(`✅ "${couple.slug}" migrated: ${applied.join(', ')}`)
  } catch (err) {
    console.error(`✗ Skipped "${couple.slug}": ${err.message}`)
    process.exitCode = 1
  }
}

if (changed) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`✅ couples.json updated — run "npm run check" to confirm.`)
} else {
  console.log('⚪ Nothing to do.')
}
