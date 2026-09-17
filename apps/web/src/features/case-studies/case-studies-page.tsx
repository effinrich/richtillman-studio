import { ArrowRight } from "lucide-react"
import { CaseStudiesScreen } from "@richtillman/ui"
import { getCaseStudies } from "#/features/content/queries"
import { ButtonLink } from "#/features/ui/button-link"

export function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <CaseStudiesScreen
      caseStudies={caseStudies.map((study) => ({
        ...study,
        href: `/case-studies/${study.slug}`,
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
