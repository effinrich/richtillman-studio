import { createFileRoute } from "@tanstack/react-router"

import { getNpmDownloadsSnapshot } from "#/features/content/queries/npm-downloads"
import { ForgekitMcpPage } from "#/features/projects/forgekit-mcp-page"

export const Route = createFileRoute("/projects/forgekit-mcp")({
  loader: () => getNpmDownloadsSnapshot(),
  component: ForgekitMcpRoute
})

function ForgekitMcpRoute() {
  const npmDownloads = Route.useLoaderData()
  return <ForgekitMcpPage npmDownloads={npmDownloads} />
}
