import { createFileRoute, notFound } from "@tanstack/react-router"

import { CaseStudyDetailPage } from "#/features/case-studies/case-study-detail-page"
import {
  getCaseStudies,
  getCaseStudyBody,
  getCaseStudyBySlug,
  getCaseStudyDetailSections
} from "#/features/content/queries/case-studies"

export const Route = createFileRoute("/case-studies/$slug")({
  loader: async ({ params }) => {
    const caseStudy = await getCaseStudyBySlug({ data: params.slug })
    if (!caseStudy) throw notFound()

    const [sections, allCaseStudies, body] = await Promise.all([
      getCaseStudyDetailSections({ data: params.slug }),
      getCaseStudies(),
      getCaseStudyBody({ data: params.slug })
    ])

    return {
      caseStudy,
      sections,
      body,
      related: allCaseStudies.filter((study) => study.slug !== params.slug)
    }
  },
  component: CaseStudyDetailRoute
})

function CaseStudyDetailRoute() {
  const { caseStudy, sections, body, related } = Route.useLoaderData()
  return (
    <CaseStudyDetailPage caseStudy={caseStudy} sections={sections} body={body} related={related} />
  )
}
