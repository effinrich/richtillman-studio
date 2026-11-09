import { createServerFn } from "@tanstack/react-start"

import { WRITING_ENTRIES, WRITING_MEASURED_AT } from "#/features/content/seed/writing"

/**
 * The writing index, measured from the dev.to public API at build time by
 * `bun run writing:sync` in apps/web. The snapshot is committed rather than
 * fetched per visitor: dev.to answers with `Cache-Control: public, no-cache`
 * and rate-limits a caller that repeats itself, and a visitor should never
 * pay for a third-party read this site could have made once.
 */
export const getWritingEntries = createServerFn({ method: "GET" }).handler(async () => {
  return {
    measuredAt: WRITING_MEASURED_AT,
    entries: WRITING_ENTRIES
  }
})
