import type { ReactNode } from "react"
import { ProjectCard } from "../composites/project-card"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ProjectCardModel } from "../models"
import { SectionHeader } from "../section-header"

type WorkScreenProps = {
  projects: ProjectCardModel[]
  discussCta: ReactNode
}

export function WorkScreen({ projects, discussCta }: WorkScreenProps) {
  return (
    <PortfolioLayout activeItem="work">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Selected Work"
          title={
            <>
              Portfolio <span className="neon-text">projects</span>
            </>
          }
          description="TokenCast, ForgeKit MCP, MCP Atlas — tools and platforms at the intersection of design systems and AI-native development."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.slug} className={`stagger-${Math.min(index + 1, 6)}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">{discussCta}</div>
      </main>
    </PortfolioLayout>
  )
}
