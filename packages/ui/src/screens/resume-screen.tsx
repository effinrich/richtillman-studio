import { Download } from "lucide-react"
import { ButtonAnchor } from "../button"
import { Chip } from "../chip"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ResumeModel } from "../models"
import { SectionHeader } from "../section-header"

type ResumeScreenProps = {
  resume: ResumeModel
  pdfHref?: string
}

export function ResumeScreen({ resume, pdfHref = "/resume/rich-tillman.pdf" }: ResumeScreenProps) {
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
          <ButtonAnchor href={pdfHref} download="rich-tillman.pdf" variant="primary">
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

        <section className="mb-12">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-white/30">
            Projects
          </h2>
          <div className="space-y-6">
            {resume.projects.map((project) => (
              <GlassPanel key={project.title} className="rounded-2xl p-8">
                <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{project.detail}</p>
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
