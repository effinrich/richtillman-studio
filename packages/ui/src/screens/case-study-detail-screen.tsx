import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { ButtonAnchor } from "../button"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { CaseStudyModel, CaseStudySection } from "../models"
import { Tag } from "../tag"

type CaseStudyDetailScreenProps = {
  caseStudy: CaseStudyModel
  sections: CaseStudySection[]
  related: CaseStudyModel[]
  backHref?: string
}

export function CaseStudyDetailScreen({
  caseStudy,
  sections,
  related,
  backHref = "/case-studies",
}: CaseStudyDetailScreenProps) {
  return (
    <PortfolioLayout activeItem="case-studies">
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <a
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Case Studies
        </a>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">{caseStudy.title}</h1>
          <p className="mb-6 text-xl text-white/50">{caseStudy.subtitle}</p>
          {caseStudy.liveHref ? (
            <ButtonAnchor
              href={caseStudy.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              View live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </ButtonAnchor>
          ) : null}
        </header>

        {caseStudy.image ? (
          <GlassPanel className="mb-12 overflow-hidden rounded-2xl">
            <img
              src={caseStudy.image}
              alt={`${caseStudy.title} screenshot`}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </GlassPanel>
        ) : null}

        <div className="mb-12 grid grid-cols-3 gap-6">
          {caseStudy.metrics.map((metric) => (
            <GlassPanel key={metric.label} className="rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gold">{metric.value}</p>
              <p className="font-mono text-[10px] text-white/50">{metric.label}</p>
            </GlassPanel>
          ))}
        </div>

        <article className="space-y-10">
          {sections.map((section) => (
            <section key={section.label}>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-gold">
                {section.label}
              </h2>
              <p className="text-lg leading-relaxed text-white/70">{section.body}</p>
            </section>
          ))}
        </article>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-white/50">
              More case studies
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((study) => (
                <a key={study.slug} href={study.href} className="group">
                  <GlassPanel className="flex h-full items-center justify-between gap-4 rounded-xl p-5 transition-all hover:border-gold/30">
                    <div>
                      <p className="font-bold text-white group-hover:text-gold">{study.title}</p>
                      <p className="text-sm text-white/50">{study.subtitle}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30 group-hover:text-gold" aria-hidden />
                  </GlassPanel>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </PortfolioLayout>
  )
}
