import { createFileRoute } from "@tanstack/react-router"
import { ForgekitMcpPage } from "#/features/projects/forgekit-mcp-page"

export const Route = createFileRoute("/projects/forgekit-mcp")({
  component: ForgekitMcpPage,
})
