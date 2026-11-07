import { createFileRoute, notFound } from "@tanstack/react-router"

import { CaseStudyDetailPage } from "#/features/case-studies/case-study-detail-page"
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getCaseStudyDetailSections
} from "#/features/content/queries"

export const Route = createFileRoute("/case-studies/$slug")({
  loader: async ({ params }) => {
    const caseStudy = await getCaseStudyBySlug(params.slug)
    if (!caseStudy) throw notFound()

    const [sections, allCaseStudies] = await Promise.all([
      getCaseStudyDetailSections(params.slug),
      getCaseStudies()
    ])

    return {
      caseStudy,
      sections,
      related: allCaseStudies.filter((study) => study.slug !== params.slug)
    }
  },
  component: CaseStudyDetailRoute
})

function CaseStudyDetailRoute() {
  const { caseStudy, sections, related } = Route.useLoaderData()
  return <CaseStudyDetailPage caseStudy={caseStudy} sections={sections} related={related} />
}
