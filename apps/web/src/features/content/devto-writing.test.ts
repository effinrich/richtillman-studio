import { describe, expect, it } from "vitest"

import { toWritingEntries, toWritingEntry, writingSkipReason } from "./devto-writing"

const FULL_POST = {
  id: 4998315,
  title: "Design Tokens as a Compile-Time Contract",
  description: "Five rules for making a design token a compile-time contract.",
  url: "https://dev.to/effinrich/design-tokens-as-a-compile-time-contract-1fnn",
  canonical_url: "https://dev.to/effinrich/design-tokens-as-a-compile-time-contract-1fnn",
  published: true,
  published_at: "2026-11-08T11:25:59Z",
  reading_time_minutes: 23,
  tag_list: ["typescript", "nx", "figma"],
  positive_reactions_count: 12,
  comments_count: 3,
  cover_image: "https://media2.dev.to/cover.png",
  ai_disclosure_level: "some_ai",
  type: "full_post"
}

describe("dev.to writing index", () => {
  it("maps a published post into a writing entry", () => {
    expect(toWritingEntry(FULL_POST)).toEqual({
      id: 4998315,
      title: "Design Tokens as a Compile-Time Contract",
      description: "Five rules for making a design token a compile-time contract.",
      url: "https://dev.to/effinrich/design-tokens-as-a-compile-time-contract-1fnn",
      publishedAt: "2026-11-08",
      readingTimeMinutes: 23,
      tags: ["typescript", "nx", "figma"],
      reactions: 12,
      comments: 3,
      coverImage: "https://media2.dev.to/cover.png",
      aiDisclosure: "some_ai"
    })
  })

  it("drops an unpublished post", () => {
    expect(toWritingEntry({ ...FULL_POST, published: false })).toBeNull()
  })

  it("drops a link post or a video post", () => {
    expect(toWritingEntry({ ...FULL_POST, type: "link_post" })).toBeNull()
    expect(toWritingEntry({ ...FULL_POST, type: "video_post" })).toBeNull()
  })

  it("drops a post without a title", () => {
    expect(toWritingEntry({ ...FULL_POST, title: "   " })).toBeNull()
    expect(toWritingEntry({ ...FULL_POST, title: undefined })).toBeNull()
  })

  it("drops a post that does not live on dev.to", () => {
    expect(toWritingEntry({ ...FULL_POST, url: "https://example.com/post" })).toBeNull()
    expect(
      toWritingEntry({
        ...FULL_POST,
        url: "https://example.com/post",
        canonical_url: "https://dev.to/x/y"
      })
    ).toBeNull()
  })

  it("drops a post it cannot date", () => {
    expect(toWritingEntry({ ...FULL_POST, published_at: undefined })).toBeNull()
    expect(toWritingEntry({ ...FULL_POST, published_at: "not a date" })).toBeNull()
  })

  it("links to the dev.to post, not to the canonical url dev.to reports", () => {
    const entry = toWritingEntry({
      ...FULL_POST,
      canonical_url: "https://richtillman.xyz/writing",
      url: "https://dev.to/effinrich/original"
    })

    expect(entry?.url).toBe("https://dev.to/effinrich/original")
  })

  it("falls back to the tag list dev.to sends for older posts", () => {
    const entry = toWritingEntry({
      ...FULL_POST,
      tag_list: undefined,
      tags: ["Figma", "nx", "nx", "  ", 7]
    })

    expect(entry?.tags).toEqual(["figma", "nx"])
  })

  it("falls back to the social image and refuses a non-http cover", () => {
    expect(toWritingEntry({ ...FULL_POST, cover_image: null })?.coverImage).toBeNull()
    expect(
      toWritingEntry({
        ...FULL_POST,
        cover_image: null,
        social_image: "https://media2.dev.to/social.png"
      })?.coverImage
    ).toBe("https://media2.dev.to/social.png")
    expect(
      toWritingEntry({ ...FULL_POST, cover_image: "javascript:alert(1)" })?.coverImage
    ).toBeNull()
  })

  it("drops a scratch post whose title is an identifier", () => {
    const scratch = { ...FULL_POST, title: "probe-t1-raw-pre-code-1794189121477" }

    expect(toWritingEntry(scratch)).toBeNull()
    expect(writingSkipReason(scratch)).toBe("the title is an identifier, not a title")
    expect(
      toWritingEntry({ ...FULL_POST, title: "10,000 lessons from 5 years of React" })
    ).not.toBeNull()
  })

  it("reports why a post was not listed", () => {
    expect(writingSkipReason({ ...FULL_POST, published: false })).toBe("not published")
    expect(writingSkipReason({ ...FULL_POST, type: "link_post" })).toBe(
      "not a full post (link_post)"
    )
    expect(writingSkipReason({ ...FULL_POST, title: "" })).toBe("no title")
    expect(writingSkipReason({ ...FULL_POST, url: "https://example.com/post" })).toBe(
      "not a dev.to post"
    )
    expect(writingSkipReason({ ...FULL_POST, published_at: "not a date" })).toBe("no publish date")
    expect(writingSkipReason({ ...FULL_POST })).toBeNull()
  })

  it("returns nothing for a payload that is not a list", () => {
    expect(toWritingEntries({ error: "not found" })).toEqual([])
    expect(toWritingEntries(null)).toEqual([])
    expect(toWritingEntries("nope")).toEqual([])
  })

  it("sorts newest first", () => {
    const entries = toWritingEntries([
      { ...FULL_POST, id: 1, published_at: "2026-01-01T00:00:00Z" },
      { ...FULL_POST, id: 2, published_at: "2026-11-08T11:25:59Z" },
      { ...FULL_POST, id: 3, published_at: "2026-06-01T00:00:00Z" }
    ])

    expect(entries.map((entry) => entry.id)).toEqual([2, 3, 1])
  })

  it("keeps only the entries that survive every rule", () => {
    const entries = toWritingEntries([
      FULL_POST,
      { ...FULL_POST, id: 9, type: "link_post" },
      { ...FULL_POST, id: 8, url: "https://elsewhere.dev/post" },
      { ...FULL_POST, id: 7, title: "" }
    ])

    expect(entries.map((entry) => entry.id)).toEqual([4998315])
  })
})
