import { Link } from "@tanstack/react-router"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "#/features/content/seed-data"
import { getCaseStudies } from "#/features/content/queries"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { ButtonAnchor } from "@richtillman/ui"
import { GlassPanel } from "@richtillman/ui"
import { Tag } from "@richtillman/ui"

type CaseStudyDetailPageProps = {
  caseStudy: CaseStudy
}

type DetailSection = {
  label: string
  body: string
}

const DETAIL_CONTENT: Record<string, DetailSection[]> = {
  "nx-monorepo": [
    {
      label: "Role",
      body: "Staff Frontend Engineer, promoted to Tech Lead and then Engineering Director over a ~1 year 11 month engagement — leading frontend strategy and coordinating async delivery across three cross-functional teams (15+ people) on the Redesign Health Platform Portal.",
    },
    {
      label: "Architecture",
      body: "The Nx monorepo runs 38 projects — the Platform Portal frontend, a lightweight Express mock API server that replicates the real backend for local dev, and a shared design system consumed across every feature module — all under enforced module boundaries.",
    },
    {
      label: "Current work",
      body: "Actively maintained, not archived: a full Chakra UI v2 → v3 migration touched 180+ files across libs/ and apps/, and React 19's useTransition now keeps paginated filter views (IP Marketplace, CEO Directory) responsive without blocking on stale data.",
    },
  ],
  "forgekit-mcp": [
    {
      label: "Packages",
      body: "forgekit-figma-mcp extracts Figma variables and design tokens into typed theme configs for Chakra UI, Tailwind, and shadcn. forgekit-storybook-mcp exposes Storybook metadata, argTypes, and usage patterns so coding agents can scaffold stories, docs, and component tests.",
    },
    {
      label: "Approach",
      body: "Both servers speak Model Context Protocol so Cursor, Windsurf, and Claude Desktop can query design-system truth instead of guessing from screenshots. The Figma path uses the REST API plus a custom parser for component instance resolution.",
    },
    {
      label: "Impact",
      body: "6,200+ npm installs validated the thesis: developers want AI tools that understand their design system, not generic code generators. CLI scaffolding at forgekit.cloud wraps the same token sync into Nx monorepo bootstraps.",
    },
  ],
  tokencast: [
    {
      label: "What it does",
      body: "Paste design tokens — a Figma variables export, CSS custom properties, or a Tailwind config — get a live theme preview and exportable code for Tailwind, Chakra, or shadcn/ui. Save a conversion and get back a real, server-rendered shareable link.",
    },
    {
      label: "Architecture",
      body: "Built on React Router in framework mode (loaders, actions, SSR) rather than a client-rendered stub. Save & Share persists to Supabase through two SECURITY DEFINER RPCs — there is no direct anon table access, and both tables run RLS with zero policies. Rate limiting (5 saves per 60s per IP) is enforced in the database, not in-memory, so it survives across Vercel's serverless instances.",
    },
    {
      label: "Security",
      body: "Token names and values are stripped of `<>\"'` before persistence — defense in depth on top of React's JSX escaping, so a token literally named with a script tag stays inert in storage, in the live preview, and in every generated export string.",
    },
  ],
  "mcp-atlas": [
    {
      label: "What it does",
      body: "A curated directory of Model Context Protocol servers, official and community. Every entry is sourced and link-checked before it's added — nothing in the directory is invented.",
    },
    {
      label: "Architecture",
      body: "Built with Astro's content collections (Zod-validated) and islands architecture, shipping JavaScript only where the page actually needs interactivity — search and filtering — rather than hydrating the whole page.",
    },
    {
      label: "Result",
      body: "18 real, link-verified MCP servers, searchable and filterable, with a Lighthouse score of 100 accessibility and 97 performance.",
    },
  ],
  "design-system-scale": [
    {
      label: "Freebird (2016–2021)",
      body: "Built one of the earliest production React UI libraries on Storybook — 200 components across B2B, B2C, and React Native from a single system. That library removed the need for separate iOS and Android frontend teams.",
    },
    {
      label: "Redesign Health (2022–2024)",
      body: "Spearheaded a 50+ component React design system in Storybook + Chromatic with a Next.js docs site, cutting dev time ~30% across a 10–15 engineer org. Chromatic caught visual regressions pre-merge; Zustand-backed data-viz components cut rendering overhead.",
    },
    {
      label: "Handoff",
      body: "Treated Storybook + React + Figma as a shared source of truth for design, product, and engineering well before Code Connect existed — later wiring Code Connect where it paid off.",
    },
  ],
}

export function CaseStudyDetailPage({ caseStudy }: CaseStudyDetailPageProps) {
  const sections = DETAIL_CONTENT[caseStudy.slug] ?? [
    { label: "Overview", body: caseStudy.summary },
  ]
  const relatedStudies = getCaseStudies().filter((study) => study.slug !== caseStudy.slug)

  return (
    <PortfolioLayout activeItem="case-studies">
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link
          to="/case-studies"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">{caseStudy.title}</h1>
          <p className="mb-6 text-xl text-white/40">{caseStudy.subtitle}</p>
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
              <p className="font-mono text-[10px] text-white/40">{metric.label}</p>
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

        {relatedStudies.length > 0 ? (
          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-white/40">
              More case studies
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedStudies.map((study) => (
                <Link
                  key={study.slug}
                  to="/case-studies/$slug"
                  params={{ slug: study.slug }}
                  className="group"
                >
                  <GlassPanel className="flex h-full items-center justify-between gap-4 rounded-xl p-5 transition-all hover:border-gold/30">
                    <div>
                      <p className="font-bold text-white group-hover:text-gold">{study.title}</p>
                      <p className="text-sm text-white/40">{study.subtitle}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30 group-hover:text-gold" />
                  </GlassPanel>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </PortfolioLayout>
  )
}
