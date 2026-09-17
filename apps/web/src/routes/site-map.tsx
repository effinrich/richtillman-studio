import { createFileRoute } from "@tanstack/react-router"
import { SiteMapPage } from "#/features/site-map/site-map-page"

export const Route = createFileRoute("/site-map")({
  component: SiteMapPage,
})
