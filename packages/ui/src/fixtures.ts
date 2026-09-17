import type {
  ArticleCardModel,
  CaseStudyModel,
  FaqItemModel,
  Metric,
  ProjectCardModel,
  ResourceModel,
  ResumeModel,
  ServiceModel,
  SiteMapSectionModel,
  TestimonialModel,
} from "./models"

export const SAMPLE_METRICS: Metric[] = [
  { value: "6,200+", label: "npm installs · ForgeKit MCP" },
  { value: "200+", label: "component design system" },
  { value: "500K+", label: "users on shipped RN apps" },
]

export const SAMPLE_PROJECTS: ProjectCardModel[] = [
  {
    slug: "tokencast",
    title: "TokenCast",
    description: "Paste design tokens, get a live preview and exportable theme code.",
    tags: ["React Router", "Supabase", "Design Tokens"],
    metric: "Lighthouse 100/99",
    href: "https://tokencast.vercel.app",
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    description: "MCP servers for Figma-to-React design system workflows.",
    tags: ["MCP", "Figma", "Design Systems"],
    metric: "6,200+ npm installs",
    href: "/projects/forgekit-mcp",
  },
  {
    slug: "nx-monorepo-scale",
    title: "Nx Monorepo Scale",
    description: "Scaled from 3 apps to 40+ packages across 12 product teams.",
    tags: ["Nx", "Monorepo", "CI/CD"],
    metric: "65% faster CI",
    href: "/case-studies/nx-monorepo",
  },
  {
    slug: "flagship-mobile",
    title: "Pineapple Cross-Platform",
    description: "Nx monorepo hosting 8+ React/TypeScript apps for 100K+ users.",
    tags: ["Nx", "Expo", "React Native"],
    metric: "100K+ users",
    href: "/insights/shipping-react-native-at-scale",
  },
  {
    slug: "storybook-system",
    title: "Freebird Design System",
    description: "200 components spanning B2B, B2C, and React Native from a single system.",
    tags: ["React", "Storybook", "React Native"],
    metric: "200+ components",
    href: "/case-studies/design-system-scale",
  },
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
    content: ["MCP lets tools expose structured context instead of screenshots."],
  },
  {
    slug: "shipping-react-native-at-scale",
    title: "Shipping React Native at Scale",
    excerpt: "Lessons from 100K+ users on a shared web and native design system.",
    category: "Mobile",
    publishedAt: "Jan 2026",
    readTime: "6 min",
    href: "/insights/shipping-react-native-at-scale",
  },
]

export const SAMPLE_CASE_STUDIES: CaseStudyModel[] = [
  {
    slug: "nx-monorepo",
    title: "Nx Monorepo at Redesign Health",
    subtitle: "38 projects, enforced boundaries, Chakra v3",
    tags: ["Nx", "Design Systems"],
    summary: "Staff to Engineering Director across a platform portal and shared UI library.",
    metrics: [
      { label: "Projects", value: "38" },
      { label: "Teams", value: "3" },
    ],
    href: "/case-studies/nx-monorepo",
  },
]

export const SAMPLE_FAQ: FaqItemModel[] = [
  {
    id: "engagement",
    question: "What kinds of engagements do you take?",
    answer: "Design systems, Nx monorepos, and AI-native tooling — typically 3–6 month contracts.",
  },
  {
    id: "remote",
    question: "Are you remote?",
    answer: "Yes. US Eastern Time, async-first.",
  },
]

export const SAMPLE_SERVICES: ServiceModel[] = [
  {
    id: "systems",
    title: "Design systems",
    description: "Storybook + Chromatic libraries that design, product, and eng share.",
    icon: "layers",
  },
  {
    id: "monorepos",
    title: "Nx monorepos",
    description: "Boundaries, CI, and shared UI that survive more than one team.",
    icon: "git-branch",
  },
]

export const SAMPLE_RESOURCES: ResourceModel[] = [
  {
    id: "storybook",
    title: "Storybook",
    description: "Component workshop and visual test surface.",
    category: "Design Systems",
    href: "https://storybook.js.org",
  },
]

export const SAMPLE_TESTIMONIALS: TestimonialModel[] = [
  {
    id: "1",
    quote: "The design system paid for itself in the first quarter.",
    author: "Engineering lead",
    role: "Director of Engineering",
    company: "Example Co",
  },
]

export const SAMPLE_RESUME: ResumeModel = {
  summary: "Principal Frontend Engineer — design systems, Nx monorepos, AI-native tooling.",
  experience: [
    {
      title: "Engineering Director",
      company: "Redesign Health",
      period: "2022 — 2026",
      highlights: ["Led frontend strategy across three teams."],
    },
  ],
  projects: [{ title: "ForgeKit", detail: "CLI + MCP servers for design-system agents." }],
  skills: ["React", "TypeScript", "Storybook", "Nx"],
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
        description: "Home with tubes cursor background",
      },
      { title: "Work Portfolio", href: "/work", description: "TokenCast, MCP Atlas, ForgeKit" },
    ],
  },
]
