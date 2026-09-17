import { BarChart3, Box, FileText } from "lucide-react"
import { Tag } from "../tag"
import type { ProjectCardModel } from "../models"

type ProjectCardProps = {
  project: ProjectCardModel
}

type CardKind = "project" | "case-study" | "article"

const KIND_META: Record<CardKind, { label: string; Icon: typeof Box }> = {
  project: { label: "Project", Icon: Box },
  "case-study": { label: "Case Study", Icon: BarChart3 },
  article: { label: "Article", Icon: FileText },
}

function kindFor(href: string): CardKind {
  if (href.startsWith("/case-studies/")) return "case-study"
  if (href.startsWith("/insights/")) return "article"
  return "project"
}

export function ProjectCard({ project }: ProjectCardProps) {
  const kind = kindFor(project.href)
  const { label, Icon } = KIND_META[kind]
  const className =
    "project-card group glass-panel block overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-gold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
  const external = project.href.startsWith("http")

  return (
    <a
      href={project.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Icon className="project-icon h-12 w-12 text-white/30 transition-all duration-500 group-hover:scale-110 group-hover:text-gold" />
        )}
        <div className="project-img-overlay pointer-events-none absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-500" />
        <span className="absolute top-4 right-4">
          <Tag>{label}</Tag>
        </span>
      </div>
      <div className="p-6">
        {project.metric ? (
          <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-widest text-gold">
            {project.metric}
          </span>
        ) : null}
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white/50">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </a>
  )
}
