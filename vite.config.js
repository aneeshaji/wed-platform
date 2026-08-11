import { existsSync, readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/* Single source of truth for every couple (slug, subdomain, SEO meta). */
const manifest = JSON.parse(readFileSync(new URL('./couples.json', import.meta.url), 'utf8'))

/** Escape a value for safe insertion into HTML. */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Render the <head> SEO/share meta block for a couple's site. */
function renderMeta(site) {
  if (!site) return ''
  const { name, title, description, ogUrl, ogImage } = site
  const meta = (property, content) => `    <meta property="${property}" content="${esc(content)}" />\n`
  const nameMeta = (n, content) => `    <meta name="${n}" content="${esc(content)}" />\n`
  const imageType = ogImage ? `image/${(/\.png$/i.test(ogImage) ? 'png' : /\.webp$/i.test(ogImage) ? 'webp' : 'jpeg')}` : 'image/jpeg'
  return [
    `    <title>${esc(title)}</title>\n`,
    nameMeta('title', title),
    nameMeta('description', description),
    meta('og:type', 'website'),
    meta('og:url', ogUrl),
    meta('og:title', title),
    meta('og:description', description),
    meta('og:image', ogImage),
    meta('og:image:secure_url', ogImage),
    meta('og:image:type', imageType),
    meta('og:image:width', '600'),
    meta('og:image:height', '600'),
    meta('og:site_name', name),
    meta('og:locale', 'en_IN'),
    nameMeta('twitter:card', 'summary_large_image'),
    nameMeta('twitter:title', title),
    nameMeta('twitter:description', description),
    nameMeta('twitter:image', ogImage),
  ].join('')
}

/**
 * The active couple: `VITE_COUPLE` if it's registered, else the first
 * couple in couples.json. Shared by the meta + data plugins so they
 * always agree on which couple a build is for.
 */
function resolveActiveCouple(env) {
  const requested = env.VITE_COUPLE
  const couple = manifest.couples.find((c) => c.slug === requested)
  if (requested && !couple) {
    console.warn(
      `[wedding-meta] VITE_COUPLE="${requested}" is not in couples.json — falling back to "${manifest.couples[0]?.slug}".`,
    )
  }
  return couple || manifest.couples[0]
}

/** Parse the active couple's content.json, or null if unavailable. */
function readContent(env) {
  const slug = resolveActiveCouple(env)?.slug
  const file = new URL(`./src/config/couples/${slug}/content.json`, import.meta.url)
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

/**
 * Renders a couple's per-couple font theme from content.json `theme.fonts`
 * — a Google Fonts <link> plus :root CSS-variable overrides (--display,
 * --serif, --sans). Couples without `theme` inject nothing and keep the
 * shared defaults in index.css. The Malayalam fallbacks always stay.
 */
function renderTheme(fonts) {
  if (!fonts?.url) return ''
  const serifStack = (f) => `'${f}', 'Noto Serif Malayalam', Georgia, serif`
  const sansStack = (f) => `'${f}', 'Noto Sans Malayalam', system-ui, sans-serif`
  const style = `:root{font-family:${sansStack(fonts.sans)};--display:${serifStack(fonts.display)};--serif:${serifStack(fonts.serif)};--sans:${sansStack(fonts.sans)}}`
  return [
    `    <link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `    <link href="${esc(fonts.url)}" rel="stylesheet" />`,
    `    <style>${style}</style>`,
  ].join('\n')
}

/**
 * Injects the active couple's meta into index.html at build time.
 * Reads `VITE_COUPLE` from the resolved env (shell > .env); defaults to
 * the first couple in couples.json.
 */
function weddingMeta(env) {
  const site = resolveActiveCouple(env)?.site
  return {
    name: 'wedding-meta',
    transformIndexHtml(html) {
      return html.replace('</head>', `${renderMeta(site)}  </head>`)
    },
  }
}

/**
 * Serves the active couple's content as the virtual module
 * `virtual:couple-content`. Each build resolves to ONE couple's
 * content.json — no other couple's data ever enters the bundle or dist/.
 */
function coupleData(env) {
  const VIRTUAL_ID = 'virtual:couple-content'
  const VIRTUAL_FS_ID = `\0${VIRTUAL_ID}`
  return {
    name: 'couple-data',
    resolveId(id) {
      if (id === VIRTUAL_ID) return VIRTUAL_FS_ID
    },
    load(id) {
      if (id !== VIRTUAL_FS_ID) return
      const slug = resolveActiveCouple(env)?.slug
      const file = new URL(`./src/config/couples/${slug}/content.json`, import.meta.url)
      if (!existsSync(file)) {
        throw new Error(
          `[couple-data] ${file.pathname} is missing — run "npm run add:couple -- ${slug}" first.`,
        )
      }
      return `export default ${readFileSync(file, 'utf8')}`
    },
    transformIndexHtml(html) {
      const theme = renderTheme(readContent(env)?.theme?.fonts)
      return theme ? html.replace('</head>', `${theme}\n  </head>`) : html
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), weddingMeta(env), coupleData(env)],
  }
})
