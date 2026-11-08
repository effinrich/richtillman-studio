import { ButtonAnchor } from "@richtillman/ui/button.tsx"
import type { Metric } from "@richtillman/ui/models.ts"
import { HomeScreen } from "@richtillman/ui/screens/home-screen.tsx"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { ButtonLink } from "#/features/ui/button-link"

type HomePageProps = {
  metrics: readonly Metric[]
  metricsNote?: string
}

export function HomePage({ metrics, metricsNote }: HomePageProps) {
  return (
    <HomeScreen
      metrics={metrics}
      metricsNote={metricsNote}
      actions={
        <>
          <ButtonLink to="/work" variant="primary" fullWidth>
            See selected work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink to="/contact" variant="glass" fullWidth>
            Get in touch
          </ButtonLink>
          <ButtonAnchor
            href="https://forgekit.cloud"
            target="_blank"
            rel="noopener noreferrer"
            variant="muted"
          >
            forgekit.cloud
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </ButtonAnchor>
        </>
      }
    />
  )
}
