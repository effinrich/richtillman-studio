import { createFileRoute } from "@tanstack/react-router"
import { CaseStudiesPage } from "#/features/case-studies/case-studies-page"

export const Route = createFileRoute("/case-studies/")({
  component: CaseStudiesPage,
})
