import type { CaseStudy } from "./types"

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "prose-does-not-bind-agents",
    title: "Prose Does Not Bind Agents: Four Safeguards That Fail the Build",
    subtitle:
      "A 30-day case study of four coding agents on one repository, and what to pin instead of writing down",
    tags: ["AI Agents", "Guardrails", "Testing", "Nx"],
    summary:
      "Four coding agents, one repository, thirty days, and a rulebook that was read instead of checked. A commit deleted 137 files and 10,097 lines with the build green, because the file that said what to protect went with it. The replacement was 453 lines of enforcement that fail the build when they are broken.",
    metrics: [
      { label: "Files changed in one commit", value: "137" },
      { label: "Lines deleted in that commit", value: "10,097" },
      { label: "Lines of enforcement", value: "453" },
      { label: "Days observed", value: "30" }
    ]
  },
  {
    slug: "nx-monorepo",
    title: "Redesign Health Platform Portal",
    subtitle: "Staff Frontend → Tech Lead → Engineering Director, ~1y11mo",
    tags: ["Nx", "Monorepo", "React 19", "Chakra UI v3"],
    summary:
      "Double-promoted to Engineering Director while staying hands-on. Led frontend strategy for an Nx monorepo running the Platform Portal, a mock API server, and a shared design system — coordinating async delivery across three cross-functional teams (15+ people).",
    metrics: [
      { label: "Team members", value: "15+" },
      { label: "Cross-functional teams", value: "3" },
      { label: "Design system components", value: "50+" }
    ],
    image: "/images/case-studies/nx-monorepo.png"
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    subtitle: "Figma + Storybook MCP servers for design-to-code",
    tags: ["MCP", "Figma", "Storybook", "AI"],
    summary:
      "Published forgekit-figma-mcp and forgekit-storybook-mcp — MCP servers purpose-built for Figma-to-React design system workflows. Figma package extracts variables into typed theme configs; Storybook package exposes argTypes and usage patterns to coding agents. {{featured_npm_downloads}} npm downloads in the last 12 months, wired into Cursor, VS Code, Zed, and Continue.",
    metrics: [
      { label: "npm downloads (12 mo)", value: "{{featured_npm_downloads}}" },
      { label: "Figma-to-React MCP packages", value: "2" },
      { label: "IDE integrations", value: "4" }
    ],
    image: "/images/projects/forgekit-mcp.png",
    liveHref: "https://forgekit.cloud"
  },
  {
    slug: "tokencast",
    title: "TokenCast",
    subtitle: "Design tokens in, live theme preview and export out",
    tags: ["React Router", "Supabase", "Security"],
    summary:
      "A design-token pipeline built on React Router in framework mode (SSR, loaders, actions) — paste Figma variables or a Tailwind config, get a live preview, export to Tailwind/Chakra/shadcn, and save a server-rendered shareable link.",
    metrics: [
      { label: "Lighthouse performance", value: "100" },
      { label: "Lighthouse accessibility", value: "91" },
      { label: "Export targets", value: "3" }
    ],
    image: "/images/projects/tokencast.png",
    liveHref: "https://tokencast.vercel.app"
  },
  {
    slug: "mcp-atlas",
    title: "MCP Atlas",
    subtitle: "A verified directory for the MCP ecosystem",
    tags: ["Astro", "MCP", "Islands Architecture"],
    summary:
      "Every MCP server directory listing gets sourced and link-checked before it ships — official and community servers, searchable and filterable, built on Astro's islands architecture to ship JS only where the page needs it.",
    metrics: [
      { label: "Verified servers", value: "18" },
      { label: "Lighthouse performance", value: "100" },
      { label: "Lighthouse accessibility", value: "100" }
    ],
    image: "/images/projects/mcp-atlas.png",
    liveHref: "https://mcp-atlas-orcin.vercel.app"
  },
  {
    slug: "design-system-scale",
    title: "Design System at Scale",
    subtitle: "Freebird 200-component library → Redesign Health Chromatic workflow",
    tags: ["Storybook", "Chromatic", "React Native", "Figma"],
    summary:
      "At Freebird (2016–2021), built one of the earliest production React UI libraries on Storybook — 200 components across B2B, B2C, and React Native. At Redesign Health, spearheaded a 50+ component React design system with Storybook + Chromatic that cut dev time ~30% across a 10–15 engineer org.",
    metrics: [
      { label: "Freebird components", value: "200" },
      { label: "Redesign DS components", value: "50+" },
      { label: "Dev time reduction", value: "~30%" }
    ]
  }
]
