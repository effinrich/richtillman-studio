import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ButtonAnchor, HomeScreen } from "@richtillman/ui"
import { METRICS } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

export function HomePage() {
  return (
    <HomeScreen
      metrics={[...METRICS]}
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
