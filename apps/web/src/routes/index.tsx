import { createFileRoute } from "@tanstack/react-router"

import { getHomeMetrics } from "#/features/content/queries"
import { HomePage } from "#/features/home/home-page"

export const Route = createFileRoute("/")({
  loader: () => getHomeMetrics(),
  component: HomeRoute
})

function HomeRoute() {
  const { metrics, metricsNote } = Route.useLoaderData()
  return <HomePage metrics={metrics} metricsNote={metricsNote} />
}
