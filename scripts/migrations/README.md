# Content Schema Migrations

When the platform's *content shape* changes (a field is renamed, added, or
moved in a couple's `content.json`), bump `schemaVersion` in `couples.json`
and add one migration step per version gap here.

## Lifecycle of a schema change

1. Edit `src/App.jsx` (and `base.js`) to read the new shape.
2. Bump `schemaVersion` in `couples.json` (e.g. `1` → `2`).
3. Add `scripts/migrations/1-to-2.mjs` that transforms old content objects.
4. Migrate each couple: `npm run migrate:couple -- <slug>` — or all at once
   with `npm run migrate:all`.
5. `npm run check` fails until every couple is on the current `schemaVersion`,
   so a stale couple can never be built or deployed.

## Step contract

Every step is an ESM module that exports `from`, `to` and `up`:

```js
export const from = 1            // version it applies to
export const to = 2              // version it produces
export function up(content) {    // parsed content.json → transformed object
  return { ...content, muhurthamTime: content.weddingTarget }
}
```

- `up` receives the **parsed content object** and must return a new content
  object. Content is pure JSON — there are no comments or imports to preserve,
  so steps are plain object transforms (spread + rename/delete).
- The runner refuses a step that returns a non-object, and only writes the
  couple's `content.json` (pretty-printed JSON) once the full chain succeeds.
- Files starting with `_` are ignored (that's how this template and future
  samples stay inert).

Start from [`_template.mjs`](./_template.mjs).
