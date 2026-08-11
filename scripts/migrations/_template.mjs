/* ------------------------------------------------------------------
   Template for a content-schema migration step.

   Copy to "1-to-2.mjs" (next gap), set from/to, and write `up` to
   transform the couple's content object. See README.md.
------------------------------------------------------------------ */

export const from = 1 // version this step applies to
export const to = 2 // version this step produces

/** @param {object} content — parsed content.json @returns {object} */
export function up(content) {
  // Example: rename a field.
  // return { ...content, muhurthamTime: content.weddingTarget }
  return content
}
