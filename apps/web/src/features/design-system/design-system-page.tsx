import { ArrowRight } from "lucide-react"
import { DesignSystemScreen } from "@richtillman/ui"
import { PROJECTS } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

const specimenProject = PROJECTS.find((project) => project.slug === "forgekit-mcp") ?? PROJECTS[0]

export function DesignSystemPage() {
  return (
    <DesignSystemScreen
      specimenProject={specimenProject!}
      actions={
        <>
          <ButtonLink to="/work" variant="primary">
            See selected work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink to="/contact" variant="glass">
            Get in touch
          </ButtonLink>
        </>
      }
    />
  )
}
