import { SiteMapCard } from "../composites/site-map-card"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { SiteMapSectionModel } from "../models"
import { SectionHeader } from "../section-header"

const underlineClass = {
  gold: "after:bg-gold",
  cyan: "after:bg-cyan",
  magenta: "after:bg-magenta",
} as const

type SiteMapScreenProps = {
  sections: SiteMapSectionModel[]
}

export function SiteMapScreen({ sections }: SiteMapScreenProps) {
  return (
    <PortfolioLayout activeItem="home">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Site Map"
          title={
            <>
              Project <span className="neon-text">Atlas</span>
            </>
          }
          description="Grid overview of every route mapped from the SuperDesign HTML exports."
        />

        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id}>
              <h2
                className={`relative mb-8 inline-block pb-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white/40 after:absolute after:bottom-0 after:left-0 after:h-px after:w-16 ${underlineClass[section.accent]}`}
              >
                {section.label}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.links.map((link) => (
                  <SiteMapCard
                    key={`${link.href}-${link.title}`}
                    link={{ ...link, accent: section.accent }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </PortfolioLayout>
  )
}
