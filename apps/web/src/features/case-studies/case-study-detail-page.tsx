import { CaseStudyDetailScreen } from "@richtillman/ui"
import type { CaseStudy } from "#/features/content/seed-data"
import { getCaseStudies } from "#/features/content/queries"

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
      body: "Paste design tokens — a Figma variables export, CSS custom properties, or a Tailwind config — get a live preview and exportable code for Tailwind, Chakra, or shadcn/ui. Save a conversion and get back a real, server-rendered shareable link.",
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

function withHref(study: CaseStudy) {
  return { ...study, href: `/case-studies/${study.slug}` }
}

export function CaseStudyDetailPage({ caseStudy }: CaseStudyDetailPageProps) {
  const sections = DETAIL_CONTENT[caseStudy.slug] ?? [
    { label: "Overview", body: caseStudy.summary },
  ]
  const related = getCaseStudies()
    .filter((study) => study.slug !== caseStudy.slug)
    .map(withHref)

  return (
    <CaseStudyDetailScreen caseStudy={withHref(caseStudy)} sections={sections} related={related} />
  )
}
