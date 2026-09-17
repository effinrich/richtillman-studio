import { ArrowRight } from "lucide-react"
import { WorkScreen } from "@richtillman/ui"
import type { Project } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

type WorkPageProps = {
  projects: Project[]
}

export function WorkPage({ projects }: WorkPageProps) {
  return (
    <WorkScreen
      projects={projects}
      discussCta={
        <ButtonLink to="/contact" variant="outline">
          Discuss a project
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      }
    />
  )
}
