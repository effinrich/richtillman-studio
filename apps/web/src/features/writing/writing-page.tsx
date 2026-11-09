import { WritingScreen } from "@richtillman/ui/screens/writing-screen.tsx"

import type { WritingEntry } from "#/features/content/seed/types"

type WritingPageProps = {
  measuredAt: string
  entries: WritingEntry[]
}

export function WritingPage({ measuredAt, entries }: WritingPageProps) {
  return (
    <WritingScreen
      measuredAt={measuredAt}
      entries={entries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        description: entry.description,
        url: entry.url,
        publishedAt: entry.publishedAt,
        readingTime: `${entry.readingTimeMinutes} min`,
        tags: entry.tags,
        reactions: entry.reactions,
        comments: entry.comments
      }))}
    />
  )
}
