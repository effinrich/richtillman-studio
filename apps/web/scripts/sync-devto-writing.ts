/**
 * Measures the writing index from the dev.to public API and writes the
 * snapshot the site renders.
 *
 *   bun run writing:sync        (from apps/web)
 *
 * The API needs no key and no account. It answers with `Cache-Control: public,
 * no-cache` and rate-limits a caller that repeats itself, which is why this
 * runs at build time and the snapshot is committed rather than fetched per
 * visitor. An empty or unusable response is refused: the snapshot on disk is
 * better than a snapshot that says nothing.
 */
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

import {
  DEVTO_ARTICLES_ENDPOINT,
  toWritingEntries,
  writingSkipReason
} from "#/features/content/devto-writing"

const USERNAME = "effinrich"
const PER_PAGE = 50

const TARGET = fileURLToPath(new URL("../src/features/content/seed/writing.ts", import.meta.url))

function renderSnapshot(entries: unknown[], measuredAt: string): string {
  return `import type { WritingEntry } from "./types"

/**
 * Measured from the dev.to public API on ${measuredAt}.
 * Endpoint: ${DEVTO_ARTICLES_ENDPOINT}?username=${USERNAME}&per_page=${PER_PAGE}
 *
 * Refresh with \`bun run writing:sync\` from apps/web. The dev.to list endpoint
 * carries metadata only, so this is an index of posts, not a copy of them.
 */
export const WRITING_MEASURED_AT = "${measuredAt}"

export const WRITING_ENTRIES: WritingEntry[] = ${JSON.stringify(entries, null, 2)}
`
}

/**
 * The title of a skipped post, for the report. It is a title only if it is a
 * string: anything else is named by its type, so a post that was never
 * indexed is never reported under a made-up name.
 */
function titleOf(article: unknown): string {
  if (typeof article !== "object" || article === null || !("title" in article)) {
    return "(no title)"
  }

  const title = article.title

  return typeof title === "string" ? title : `(title is ${typeof title})`
}

async function main(): Promise<void> {
  const url = `${DEVTO_ARTICLES_ENDPOINT}?username=${USERNAME}&per_page=${PER_PAGE}`

  const response = await fetch(url, {
    headers: {
      accept: "application/vnd.forem.api-v1+json",
      "user-agent": "richtillman-studio-writing-sync"
    }
  })

  if (!response.ok) {
    throw new Error(`dev.to answered ${response.status} for ${url}`)
  }

  const payload: unknown = await response.json()
  const entries = toWritingEntries(payload)

  if (entries.length === 0) {
    throw new Error(
      "dev.to returned no usable articles. The snapshot on disk is kept rather than replaced with an empty one."
    )
  }

  const measuredAt = new Date().toISOString().slice(0, 10)
  writeFileSync(TARGET, renderSnapshot(entries, measuredAt), "utf8")

  console.log(`Wrote ${entries.length} entries to ${TARGET}`)
  console.log(`Measured ${measuredAt}`)
  for (const entry of entries) {
    console.log(`  ${entry.publishedAt}  ${entry.readingTimeMinutes} min  ${entry.title}`)
  }

  // Every post the API sent but the index did not take, with the reason. A post
  // that is skipped silently is a post that is missing without anyone knowing.
  const skipped = Array.isArray(payload)
    ? payload.flatMap((article) => {
        const reason = writingSkipReason(article)
        if (reason === null) return []

        const title = titleOf(article)

        return [`  ${title} — skipped: ${reason}`]
      })
    : []

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} posts:`)
    for (const line of skipped) console.log(line)
  }
}

await main()
