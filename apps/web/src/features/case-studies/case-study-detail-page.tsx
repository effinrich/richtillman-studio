import type { CaseStudySection } from "@richtillman/ui/models.ts"
import { CaseStudyDetailScreen } from "@richtillman/ui/screens/case-study-detail-screen.tsx"

import type { CaseStudy } from "#/features/content/seed-data"

type CaseStudyDetailPageProps = {
  caseStudy: CaseStudy
  sections: CaseStudySection[]
  related: CaseStudy[]
}

function withHref(study: CaseStudy) {
  return { ...study, href: `/case-studies/${study.slug}` }
}

export function CaseStudyDetailPage({ caseStudy, sections, related }: CaseStudyDetailPageProps) {
  return (
    <CaseStudyDetailScreen
      caseStudy={withHref(caseStudy)}
      sections={sections}
      related={related.map(withHref)}
    />
  )
}
