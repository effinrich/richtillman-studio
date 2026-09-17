import { Download } from "lucide-react"
import { getResumeSections } from "#/features/content/queries"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { ButtonAnchor, Chip, GlassPanel, SectionHeader } from "@richtillman/ui"

export function ResumePage() {
  const resume = getResumeSections()

  return (
    <PortfolioLayout activeItem="resume">
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Resume"
          title={
            <>
              Rich <span className="neon-text">Tillman</span>
            </>
          }
          description="Principal Frontend Engineer · Design Systems · Nx Monorepos · AI-Native Tooling"
        />

        <div className="mb-12">
          <ButtonAnchor
            href="/resume/rich-tillman.pdf"
            download="rich-tillman.pdf"
            variant="primary"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download PDF
          </ButtonAnchor>
        </div>

        <GlassPanel className="mb-12 rounded-2xl p-8">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Summary</h2>
          <p className="leading-relaxed text-white/70">{resume.summary}</p>
        </GlassPanel>

        <section className="mb-12">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-white/30">
            Experience
          </h2>
          <div className="space-y-8">
            {resume.experience.map((job) => (
              <GlassPanel key={job.title + job.company} className="rounded-2xl p-8">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <p className="text-white/40">{job.company}</p>
                  </div>
                  <span className="font-mono text-xs text-white/30">{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-white/30">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </section>
      </main>
    </PortfolioLayout>
  )
}
