import { createFileRoute } from "@tanstack/react-router"

import { getSpecimenProject } from "#/features/content/queries"
import { DesignSystemPage } from "#/features/design-system/design-system-page"

export const Route = createFileRoute("/design-system")({
  loader: () => getSpecimenProject(),
  component: DesignSystemRoute
})

function DesignSystemRoute() {
  const specimenProject = Route.useLoaderData()
  return <DesignSystemPage specimenProject={specimenProject} />
}
