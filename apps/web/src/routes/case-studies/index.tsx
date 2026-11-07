import { createFileRoute } from "@tanstack/react-router"

import { CaseStudiesPage } from "#/features/case-studies/case-studies-page"
import { getCaseStudies } from "#/features/content/queries"

export const Route = createFileRoute("/case-studies/")({
  loader: () => getCaseStudies(),
  component: CaseStudiesRoute
})

function CaseStudiesRoute() {
  const caseStudies = Route.useLoaderData()
  return <CaseStudiesPage caseStudies={caseStudies} />
}
