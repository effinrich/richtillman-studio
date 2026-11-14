import { createFileRoute } from "@tanstack/react-router"

import { getWritingEntries } from "#/features/content/queries/writing"
import { WritingPage } from "#/features/writing/writing-page"

const TITLE = "Writing · Rich Tillman"
const DESCRIPTION =
  "Long-form writing on design tokens, agent-native developer tooling, and the systems around them, published on DEV Community."

export const Route = createFileRoute("/writing")({
  loader: () => getWritingEntries(),
  component: WritingRoute,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://richtillman.xyz/writing" }
    ],
    links: [{ rel: "canonical", href: "https://richtillman.xyz/writing" }]
  })
})

function WritingRoute() {
  const writing = Route.useLoaderData()
  return <WritingPage measuredAt={writing.measuredAt} entries={writing.entries} />
}
