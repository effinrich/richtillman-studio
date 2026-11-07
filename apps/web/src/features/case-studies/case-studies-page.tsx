import { CaseStudiesScreen } from "@richtillman/ui"
import { ArrowRight } from "lucide-react"

import type { CaseStudy } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

type CaseStudiesPageProps = {
  caseStudies: CaseStudy[]
}

export function CaseStudiesPage({ caseStudies }: CaseStudiesPageProps) {
  return (
    <CaseStudiesScreen
      caseStudies={caseStudies.map((study) => ({
        ...study,
        href: `/case-studies/${study.slug}`
      }))}
      renderCta={(study) => (
        <ButtonLink to="/case-studies/$slug" params={{ slug: study.slug }} variant="ghost">
          Read case study
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      )}
    />
  )
}
