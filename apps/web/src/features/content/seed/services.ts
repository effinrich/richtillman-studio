import type { Service } from "./types"

export const SERVICES: Service[] = [
  {
    id: "design-systems",
    title: "Design Systems Consulting",
    description:
      "End-to-end design system delivery — Figma tokens, React components, Storybook documentation, and Chromatic visual regression.",
    icon: "layers"
  },
  {
    id: "react-architecture",
    title: "React Architecture & Code Review",
    description:
      "Principal-level architecture reviews, performance audits, and migration plans for enterprise React codebases.",
    icon: "zap"
  },
  {
    id: "product-0-1",
    title: "0→1 Product Development",
    description:
      "Ship SaaS MVPs with TanStack Start, Supabase, and Cloudflare Workers — from design system to production deploy.",
    icon: "cpu"
  },
  {
    id: "monorepo",
    title: "Monorepo Architecture & Infrastructure",
    description:
      "Enterprise-scale monorepo architecture with Nx, shared libraries, CI optimization, and developer experience tooling.",
    icon: "git-branch"
  },
  {
    id: "mentoring",
    title: "Team Leadership & Technical Mentoring",
    description:
      "Staff/principal-level mentoring for frontend teams: design system governance, practical AI-assisted workflows, and career growth.",
    icon: "layers"
  },
  {
    id: "mcp",
    title: "MCP & Developer Tooling",
    description:
      "Model Context Protocol servers and integrations that connect design tools to coding assistants.",
    icon: "cpu"
  }
]
