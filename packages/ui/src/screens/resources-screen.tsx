import { ExternalLink } from "lucide-react"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ResourceModel } from "../models"
import { SectionHeader } from "../section-header"

type ResourcesScreenProps = {
  resources: ResourceModel[]
}

export function ResourcesScreen({ resources }: ResourcesScreenProps) {
  return (
    <PortfolioLayout activeItem="stack">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Resources & Tools"
          title={
            <>
              The <span className="neon-text">stack</span> I ship with
            </>
          }
          description="Open source projects, frameworks, and tools that power modern frontend platform engineering."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => {
            const isExternal = resource.href.startsWith("http")
            return (
              <a
                key={resource.id}
                href={resource.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`${resource.title}${isExternal ? " (opens in new tab)" : ""}`}
                className={`group stagger-${index + 1}`}
              >
                <GlassPanel className="h-full rounded-2xl p-6 transition-all hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-widest text-cyan">
                    {resource.category}
                  </span>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan">
                      {resource.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-cyan" />
                  </div>
                  <p className="text-sm text-white/50">{resource.description}</p>
                </GlassPanel>
              </a>
            )
          })}
        </div>
      </main>
    </PortfolioLayout>
  )
}
