import { createFileRoute } from "@tanstack/react-router"

import { getNpmDownloads } from "#/features/content/npm-downloads"
import { ForgekitMcpPage } from "#/features/projects/forgekit-mcp-page"

export const Route = createFileRoute("/projects/forgekit-mcp")({
  loader: () => getNpmDownloads(),
  component: ForgekitMcpRoute
})

function ForgekitMcpRoute() {
  const npmDownloads = Route.useLoaderData()
  return <ForgekitMcpPage npmDownloads={npmDownloads} />
}
