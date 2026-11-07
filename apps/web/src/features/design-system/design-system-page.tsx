import { DesignSystemScreen } from "@richtillman/ui"
import { ArrowRight } from "lucide-react"

import type { Project } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

type DesignSystemPageProps = {
  specimenProject: Project
}

export function DesignSystemPage({ specimenProject }: DesignSystemPageProps) {
  return (
    <DesignSystemScreen
      specimenProject={specimenProject}
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
