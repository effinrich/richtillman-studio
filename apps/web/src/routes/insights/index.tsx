import { createFileRoute } from "@tanstack/react-router"
import { getArticles } from "#/features/content/queries"
import { InsightsPage } from "#/features/insights/insights-page"

export const Route = createFileRoute("/insights/")({
  loader: () => getArticles(),
  component: InsightsRoute,
})

function InsightsRoute() {
  const articles = Route.useLoaderData()
  return <InsightsPage articles={articles} />
}
