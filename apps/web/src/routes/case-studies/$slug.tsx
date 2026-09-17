import { createFileRoute, notFound } from "@tanstack/react-router"
import { getCaseStudyBySlug } from "#/features/content/queries"
import { CaseStudyDetailPage } from "#/features/case-studies/case-study-detail-page"

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const caseStudy = getCaseStudyBySlug(params.slug)
    if (!caseStudy) throw notFound()
    return caseStudy
  },
  component: CaseStudyDetailRoute,
})

function CaseStudyDetailRoute() {
  const caseStudy = Route.useLoaderData()
  return <CaseStudyDetailPage caseStudy={caseStudy} />
}
