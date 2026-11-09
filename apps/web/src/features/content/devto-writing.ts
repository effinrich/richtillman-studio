import type { WritingEntry } from "#/features/content/seed/types"

/**
 * The dev.to public API is the source of truth for the writing index. It needs
 * no key and no account: the list endpoint answers with metadata only.
 *
 * It answers with `Cache-Control: public, no-cache`, so every read is a read
 * of the origin, and it rate-limits a caller that repeats itself. The index is
 * therefore measured at build time (`bun run writing:sync` in apps/web) and
 * committed as a snapshot. A visitor never makes this site ask dev.to for
 * anything, and a rate-limited dev.to cannot empty the page.
 */

export const DEVTO_ARTICLES_ENDPOINT = "https://dev.to/api/articles"

export type DevtoArticle = {
  id?: number
  title?: string
  description?: string
  url?: string
  canonical_url?: string
  published?: boolean
  published_at?: string
  reading_time_minutes?: number
  tag_list?: string[]
  tags?: string[]
  positive_reactions_count?: number
  comments_count?: number
  cover_image?: string | null
  social_image?: string | null
  ai_disclosure_level?: string | null
  type?: string
}

const DEVTO_ORIGIN = "https://dev.to/"

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function readCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return 0

  return Math.floor(value)
}

function readTags(article: DevtoArticle): string[] {
  const source = Array.isArray(article.tag_list) ? article.tag_list : article.tags
  if (!Array.isArray(source)) return []

  const tags: string[] = []
  for (const tag of source) {
    const clean = readString(tag)?.toLowerCase()
    if (clean && !tags.includes(clean)) tags.push(clean)
  }

  return tags
}

/**
 * The link a reader follows to the post. The index is a directory of what he
 * published on dev.to, so the link is the dev.to post URL: it is where the
 * comments and the audience are, and it is the crawl path back to the
 * publishing platform. dev.to also sends a canonical URL for a post whose real
 * home is elsewhere, and that is deliberately not used here.
 */
function readUrl(article: DevtoArticle): string | null {
  const candidate = readString(article.url)
  if (!candidate || !candidate.startsWith(DEVTO_ORIGIN)) return null

  return candidate
}

function readImage(article: DevtoArticle): string | null {
  const candidate = readString(article.cover_image) ?? readString(article.social_image)
  if (!candidate) return null
  if (!candidate.startsWith("http://") && !candidate.startsWith("https://")) return null

  return candidate
}

/**
 * A title that carries a long run of digits is an identifier, not a title.
 * Scratch posts published while something is being worked out look like
 * `probe-t1-raw-pre-code-1794189121477`: a name, a label, and a timestamp.
 * They are published to the same account as the finished work, so the index
 * has to be able to tell them apart.
 */
const IDENTIFIER_IN_TITLE = /\d{12,}/

/**
 * The rule set, in one place, with the reason each post is not listed. The
 * sync script reports the reasons, so a post that never reaches the index is
 * visible rather than silently missing.
 */
export function writingSkipReason(article: unknown): string | null {
  return readWritingEntry(article).reason
}

function isDevtoArticle(value: unknown): value is DevtoArticle {
  return typeof value === "object" && value !== null
}

type WritingRead = { entry: WritingEntry | null; reason: string | null }

/**
 * Reads one payload item. The rules and the fields they guard are the same
 * read, so a post cannot pass the reason check and still be missing a field.
 */
function readWritingEntry(article: unknown): WritingRead {
  if (!isDevtoArticle(article)) return { entry: null, reason: "not an object" }

  if (article.published === false) return { entry: null, reason: "not published" }

  const type = readString(article.type)
  if (type !== null && type !== "full_post") {
    return { entry: null, reason: `not a full post (${type})` }
  }

  const title = readString(article.title)
  if (title === null) return { entry: null, reason: "no title" }
  if (IDENTIFIER_IN_TITLE.test(title)) {
    return { entry: null, reason: "the title is an identifier, not a title" }
  }

  const url = readUrl(article)
  if (url === null) return { entry: null, reason: "not a dev.to post" }

  const publishedAt = readString(article.published_at)?.slice(0, 10) ?? null
  if (publishedAt === null || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    return { entry: null, reason: "no publish date" }
  }

  return {
    reason: null,
    entry: {
      id: typeof article.id === "number" ? article.id : 0,
      title,
      description: readString(article.description) ?? "",
      url,
      publishedAt,
      readingTimeMinutes: readCount(article.reading_time_minutes),
      tags: readTags(article),
      reactions: readCount(article.positive_reactions_count),
      comments: readCount(article.comments_count),
      coverImage: readImage(article),
      aiDisclosure: readString(article.ai_disclosure_level)
    }
  }
}

/**
 * Maps one payload item to a writing entry, or returns null when the item is
 * not something the index should list. A link post is not an article, an
 * unpublished post is not public, a post with no title cannot be linked, and
 * a post this site cannot date has no place in a chronological index.
 */
export function toWritingEntry(article: unknown): WritingEntry | null {
  return readWritingEntry(article).entry
}

/**
 * Maps the list endpoint payload to the entries the index renders, newest
 * first. A payload that is not a list yields nothing rather than throwing, so
 * a changed API shape empties the page instead of breaking the route.
 */
export function toWritingEntries(articles: unknown): WritingEntry[] {
  if (!Array.isArray(articles)) return []

  const entries: WritingEntry[] = []
  for (const article of articles) {
    const entry = toWritingEntry(article)
    if (entry) entries.push(entry)
  }

  return entries.toSorted((a, b) => {
    if (a.publishedAt !== b.publishedAt) return a.publishedAt < b.publishedAt ? 1 : -1

    return b.id - a.id
  })
}
