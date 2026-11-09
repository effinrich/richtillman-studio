import type {
  ArticleCardModel,
  CaseStudyModel,
  FaqItemModel,
  Metric,
  NpmDownloadsModel,
  ProjectCardModel,
  ResourceModel,
  ResumeModel,
  ServiceModel,
  SiteMapSectionModel,
  TestimonialModel,
  WritingEntryModel
} from "./models"
import { NPM_DOWNLOADS_SEED } from "./npm-packages"

export const SAMPLE_METRICS: Metric[] = [
  { value: "9,392", label: "npm downloads in 12 months · 6 published packages" },
  { value: "200", label: "components in the Freebird design system" },
  { value: "100K+", label: "users on the Pineapple React Native app" }
]

export const SAMPLE_NPM_DOWNLOADS: NpmDownloadsModel = {
  ...NPM_DOWNLOADS_SEED,
  live: true
}

export const SAMPLE_PROJECTS: ProjectCardModel[] = [
  {
    slug: "tokencast",
    title: "TokenCast",
    description: "Paste design tokens, get a live preview and exportable theme code.",
    tags: ["React Router", "Supabase", "Design Tokens"],
    metric: "Lighthouse 100 perf / 91 a11y",
    href: "https://tokencast.vercel.app"
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    description: "MCP servers for Figma-to-React design system workflows.",
    tags: ["MCP", "Figma", "Design Systems"],
    metric: "7,997 npm downloads (12 mo)",
    href: "/projects/forgekit-mcp"
  },
  {
    slug: "nx-monorepo-scale",
    title: "Nx Monorepo Scale",
    description: "Led frontend for an Nx monorepo across three cross-functional teams.",
    tags: ["Nx", "Monorepo", "Platform"],
    metric: "15+ engineers",
    href: "/case-studies/nx-monorepo"
  },
  {
    slug: "flagship-mobile",
    title: "Pineapple Cross-Platform",
    description: "Nx monorepo with a shared design-system UI library for 100K+ users.",
    tags: ["Nx", "Expo", "React Native"],
    metric: "100K+ users",
    href: "/insights/shipping-react-native-at-scale"
  },
  {
    slug: "storybook-system",
    title: "Freebird Design System",
    description: "200 components spanning B2B, B2C, and React Native from a single system.",
    tags: ["React", "Storybook", "React Native"],
    metric: "200 components",
    href: "/case-studies/design-system-scale"
  }
]

export const SAMPLE_ARTICLES: ArticleCardModel[] = [
  {
    slug: "the-model-context-protocol",
    title: "The Model Context Protocol",
    excerpt: "Why MCP is the missing interface between design systems and coding agents.",
    category: "AI Engineering",
    publishedAt: "Mar 2026",
    readTime: "8 min",
    href: "/insights/the-model-context-protocol",
    featured: true,
    content: ["MCP lets tools expose structured context instead of screenshots."]
  },
  {
    slug: "shipping-react-native-at-scale",
    title: "Shipping React Native at Scale",
    excerpt: "Lessons from 100K+ users on a shared web and native design system.",
    category: "Mobile",
    publishedAt: "Jan 2026",
    readTime: "6 min",
    href: "/insights/shipping-react-native-at-scale"
  }
]

export const SAMPLE_WRITING_ENTRIES: WritingEntryModel[] = [
  {
    id: 5001125,
    title: "Prose Does Not Bind Agents: Four Safeguards That Fail the Build",
    description:
      "Four safeguards that fail a build when coding agents break them, from a 30-day case study on one repository.",
    url: "https://dev.to/effinrich/prose-does-not-bind-agents-four-safeguards-that-fail-the-build-34b1",
    publishedAt: "2026-11-09",
    readingTime: "35 min",
    tags: ["ai", "testing", "devops"],
    reactions: 0,
    comments: 0
  },
  {
    id: 4998315,
    title: "Design Tokens as a Compile-Time Contract",
    description:
      "Five rules for making a design token a compile-time contract in a pnpm and Nx monorepo, with the commands to reproduce it.",
    url: "https://dev.to/effinrich/design-tokens-as-a-compile-time-contract-figma-variables-to-a-typed-typescript-api-1fnn",
    publishedAt: "2026-11-08",
    readingTime: "23 min",
    tags: ["typescript", "nx", "figma", "designtokens"],
    reactions: 0,
    comments: 0
  }
]

export const SAMPLE_CASE_STUDIES: CaseStudyModel[] = [
  {
    slug: "nx-monorepo",
    title: "Nx Monorepo at Redesign Health",
    subtitle: "15+ engineers, enforced boundaries, Chakra v3",
    tags: ["Nx", "Design Systems"],
    summary: "Staff to Engineering Director across a platform portal and shared UI library.",
    metrics: [
      { label: "Team members", value: "15+" },
      { label: "Teams", value: "3" }
    ],
    href: "/case-studies/nx-monorepo"
  }
]

export const SAMPLE_FAQ: FaqItemModel[] = [
  {
    id: "engagement",
    question: "What kinds of engagements do you take?",
    answer: "Design systems, Nx monorepos, and AI-native tooling — typically 3–6 month contracts."
  },
  {
    id: "remote",
    question: "Are you remote?",
    answer: "Yes. US Eastern Time, async-first."
  }
]

export const SAMPLE_SERVICES: ServiceModel[] = [
  {
    id: "systems",
    title: "Design systems",
    description: "Storybook + Chromatic libraries that design, product, and eng share.",
    icon: "layers"
  },
  {
    id: "monorepos",
    title: "Nx monorepos",
    description: "Boundaries, CI, and shared UI that survive more than one team.",
    icon: "git-branch"
  }
]

export const SAMPLE_RESOURCES: ResourceModel[] = [
  {
    id: "storybook",
    title: "Storybook",
    description: "Component workshop and visual test surface.",
    category: "Design Systems",
    href: "https://storybook.js.org"
  }
]

export const SAMPLE_TESTIMONIALS: TestimonialModel[] = [
  {
    id: "1",
    quote: "The design system paid for itself in the first quarter.",
    author: "Engineering lead",
    role: "Director of Engineering",
    company: "Example Co"
  }
]

export const SAMPLE_RESUME: ResumeModel = {
  summary: "Principal Frontend Engineer — design systems, Nx monorepos, AI-native tooling.",
  experience: [
    {
      title: "Engineering Director",
      company: "Redesign Health",
      period: "2022 — 2026",
      highlights: ["Led frontend strategy across three teams."]
    }
  ],
  projects: [{ title: "ForgeKit", detail: "CLI + MCP servers for design-system agents." }],
  skills: ["React", "TypeScript", "Storybook", "Nx"]
}

export const SAMPLE_SITE_MAP: SiteMapSectionModel[] = [
  {
    id: "01",
    label: "01 — Core Experience",
    accent: "gold",
    links: [
      {
        title: "Interactive Neon Hero",
        href: "/",
        description: "Home with tubes cursor background"
      },
      { title: "Work Portfolio", href: "/work", description: "TokenCast, MCP Atlas, ForgeKit" }
    ]
  }
]
