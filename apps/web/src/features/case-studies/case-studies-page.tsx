import { ArrowRight } from "lucide-react"
import { getCaseStudies } from "#/features/content/queries"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { ButtonLink } from "#/features/ui/button-link"
import { GlassPanel, SectionHeader, Tag } from "@richtillman/ui"

export function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <PortfolioLayout activeItem="case-studies">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Case Studies"
          title={
            <>
              Deep dives into <span className="neon-text">impact</span>
            </>
          }
          description="Architecture decisions, metrics, and lessons from enterprise-scale frontend platform work."
        />

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <GlassPanel
              key={study.slug}
              className={`grid gap-8 rounded-3xl p-8 md:grid-cols-3 md:p-10 stagger-${index + 1}`}
            >
              <div className="md:col-span-2">
                {study.image ? (
                  <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={study.image}
                      alt={`${study.title} screenshot`}
                      className="h-48 w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="mb-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">{study.title}</h2>
                <p className="mb-4 text-white/40">{study.subtitle}</p>
                <p className="mb-6 leading-relaxed text-white/60">{study.summary}</p>
                <ButtonLink to="/case-studies/$slug" params={{ slug: study.slug }} variant="ghost">
                  Read case study
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
              <div className="flex flex-col justify-center gap-6 border-t border-white/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                    <p className="font-mono text-xs text-white/40">{metric.label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </main>
    </PortfolioLayout>
  )
}
