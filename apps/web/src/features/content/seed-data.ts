export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  metric?: string
  href: string
  image?: string
  featured: boolean
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  featured: boolean
  content: string[]
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  summary: string
  metrics: { label: string; value: string }[]
  image?: string
  liveHref?: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type Resource = {
  id: string
  title: string
  description: string
  category: string
  href: string
}

export const METRICS = [
  { value: "6,200+", label: "npm installs · ForgeKit MCP" },
  { value: "200+", label: "component design system" },
  { value: "500K+", label: "users on shipped RN apps" },
] as const

export const PROJECTS: Project[] = [
  {
    slug: "tokencast",
    title: "TokenCast",
    description:
      "Paste design tokens — Figma variables, CSS custom properties, or a Tailwind config — get a live preview and exportable theme code (Tailwind, Chakra, shadcn/ui), with server-rendered Save & Share links.",
    tags: ["React Router", "Supabase", "Design Tokens"],
    metric: "Lighthouse 100/99",
    href: "https://tokencast.vercel.app",
    image: "/images/projects/tokencast.png",
    featured: true,
  },
  {
    slug: "mcp-atlas",
    title: "MCP Atlas",
    description:
      "A curated, link-verified directory of real Model Context Protocol servers — official and community — searchable and filterable, built with Astro islands.",
    tags: ["Astro", "MCP", "TypeScript"],
    metric: "18 verified servers",
    href: "https://mcp-atlas-orcin.vercel.app",
    image: "/images/projects/mcp-atlas.png",
    featured: true,
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    description:
      "MCP servers purpose-built for Figma-to-React design system workflows — forgekit-figma-mcp (tokens → typed themes) and forgekit-storybook-mcp (argTypes → agent context).",
    tags: ["MCP", "Figma", "Design Systems"],
    metric: "6,200+ npm installs",
    href: "/projects/forgekit-mcp",
    image: "/images/projects/forgekit-mcp.png",
    featured: true,
  },
  {
    slug: "storybook-system",
    title: "Freebird Design System",
    description:
      "Built one of the earliest production React component libraries backed by Storybook — 200 components spanning B2B, B2C, and React Native from a single system, eliminating separate iOS/Android teams.",
    tags: ["React", "Storybook", "React Native"],
    metric: "200+ components",
    href: "/case-studies/design-system-scale",
    featured: true,
  },
  {
    slug: "flagship-mobile",
    title: "Pineapple Cross-Platform",
    description:
      "Stood up an Nx monorepo hosting 8+ React/TypeScript apps; cross-platform Expo/React Native for 100K+ users with 60+ Storybook-driven components shared across web and native.",
    tags: ["Nx", "Expo", "React Native"],
    metric: "100K+ users",
    href: "/insights/shipping-react-native-at-scale",
    featured: false,
  },
  {
    slug: "nx-monorepo-scale",
    title: "Nx Monorepo Scale",
    description:
      "Scaled from 3 apps to 40+ packages across 12 product teams with shared design system, auth, and data layers.",
    tags: ["Nx", "Monorepo", "CI/CD"],
    metric: "65% faster CI",
    href: "/case-studies/nx-monorepo",
    featured: true,
  },
  {
    slug: "tidy-app",
    title: "Tidy App",
    description:
      "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase Auth/Realtime, RevenueCat monetization, and Figma Code Connect mappings.",
    tags: ["React Native", "Expo", "Supabase"],
    metric: "TestFlight beta",
    href: "https://tidyapp.me",
    featured: false,
  },
  {
    slug: "forgekit-storybook-mcp",
    title: "ForgeKit Storybook MCP",
    description:
      "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents — automating story generation, docs scaffolding, and component testing workflows.",
    tags: ["MCP", "Storybook", "AI"],
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    featured: false,
  },
]

export const ARTICLES: Article[] = [
  {
    slug: "the-model-context-protocol",
    title: "The Model Context Protocol: A Frontend Engineer's Guide",
    excerpt:
      "How MCP is reshaping the hand-off between design tools and AI-native development workflows.",
    category: "Featured Analysis",
    publishedAt: "2024-03-12",
    readTime: "12 min",
    featured: true,
    content: [
      "The Model Context Protocol (MCP) represents a fundamental shift in how frontend engineers interact with AI coding assistants. Instead of treating design assets as static screenshots, MCP exposes them as structured, queryable context.",
      "For years, the hand-off was the most friction-filled part of our work. With MCP, the hand-off disappears. Design tokens, components, and layout patterns are live nodes in a context graph that AI can traverse.",
      "MCP represents a shift from AI as an external generator to AI as an integrated team member with direct access to your design system truth.",
    ],
  },
  {
    slug: "architecting-for-100-on-lighthouse",
    title: "Architecting for 100 on Lighthouse: The Airbnb Playbook",
    excerpt:
      "Performance budgets, code splitting strategies, and the infrastructure decisions that keep Core Web Vitals green.",
    category: "Performance",
    publishedAt: "2024-02-28",
    readTime: "8 min",
    featured: false,
    content: [
      "Achieving consistent Lighthouse scores requires architectural decisions from day one — not performance audits after launch.",
      "At scale, the biggest wins come from reducing JavaScript shipped to the client, optimizing images at the CDN layer, and eliminating layout shift through disciplined component APIs.",
    ],
  },
  {
    slug: "storybook-to-next-js-playgrounds",
    title: "From Storybook to Next.js Playgrounds",
    excerpt:
      "Bridging isolated component development with full-page integration testing using composable playground patterns.",
    category: "Design Systems",
    publishedAt: "2024-02-14",
    readTime: "10 min",
    featured: false,
    content: [
      "Storybook excels at component isolation, but teams need full-page contexts to validate real integration behavior.",
      "Next.js playgrounds provide the missing layer — letting designers and engineers preview components in realistic page layouts without leaving the design system workflow.",
    ],
  },
  {
    slug: "the-case-for-the-t-shaped-principal-engineer",
    title: "The Case for the T-Shaped Principal Engineer in 2024",
    excerpt:
      "Why depth in frontend architecture plus breadth across design, product, and platform creates outsized impact.",
    category: "Leadership",
    publishedAt: "2024-01-22",
    readTime: "7 min",
    featured: false,
    content: [
      "The T-shaped principal engineer combines deep frontend expertise with enough breadth to connect design systems, platform engineering, and product strategy.",
      "In 2024, the most impactful principals are those who can ship design system infrastructure while also mentoring teams on AI-native development patterns.",
    ],
  },
  {
    slug: "llm-agents-in-the-monorepo",
    title: "LLM Agents in the Monorepo: A 48-Hour Migration Story",
    excerpt:
      "How we used AI agents to migrate 1,942 components across an Nx monorepo with 88% automated test pass rate.",
    category: "AI Engineering",
    publishedAt: "2023-12-18",
    readTime: "15 min",
    featured: false,
    content: [
      "The biggest hurdle was not the LLM logic — it was the context window. Providing the agent with entire component library docs was too heavy.",
      "We solved this with a RAG approach where the agent only retrieved documentation for the specific component being migrated.",
      "By the end of the 48-hour sprint, we generated 1,942 successful PRs. 88% passed automated testing without manual intervention.",
    ],
  },
  {
    slug: "mastering-tanstack-start",
    title: "Mastering TanStack Start: Full-Stack React Without the Framework Tax",
    excerpt:
      "File-based routing, server functions, and Cloudflare Workers deployment for modern portfolio and SaaS apps.",
    category: "Frameworks",
    publishedAt: "2023-12-10",
    readTime: "11 min",
    featured: false,
    content: [
      "TanStack Start brings together Router, Query, and server-side rendering in a composable package that avoids the lock-in of traditional meta-frameworks.",
      "File-based routing with type-safe params, combined with Cloudflare Workers deployment, makes it ideal for portfolio sites and SaaS MVPs.",
    ],
  },
  {
    slug: "shipping-react-native-at-scale",
    title: "Shipping React Native at Scale: Lessons from 500K+ Users",
    excerpt:
      "Monorepo strategies, OTA updates, and design system parity between web and mobile at enterprise scale.",
    category: "Mobile Development",
    publishedAt: "2023-12-05",
    readTime: "9 min",
    featured: false,
    content: [
      "Shipping React Native at scale requires treating mobile as a first-class platform in your monorepo — not a fork of your web codebase.",
      "Design system parity, shared token pipelines, and disciplined release trains are what separate prototypes from products serving 500K+ users.",
    ],
  },
]

// Real testimonials pending: Matt, Adam, Clayton, Kurt, Anthony — add with their
// actual quotes when supplied. Do not fabricate quotes for real named people.
export const TESTIMONIALS: Testimonial[] = []

export const SERVICES: Service[] = [
  {
    id: "design-systems",
    title: "Design Systems Consulting",
    description:
      "End-to-end design system delivery — Figma tokens, React components, Storybook documentation, and Chromatic visual regression.",
    icon: "layers",
  },
  {
    id: "react-architecture",
    title: "React Architecture & Code Review",
    description:
      "Principal-level architecture reviews, performance audits, and migration plans for enterprise React codebases.",
    icon: "zap",
  },
  {
    id: "product-0-1",
    title: "0→1 Product Development",
    description:
      "Ship SaaS MVPs with TanStack Start, Supabase, and Cloudflare Workers — from design system to production deploy.",
    icon: "cpu",
  },
  {
    id: "monorepo",
    title: "Monorepo Architecture & Infrastructure",
    description:
      "Enterprise-scale monorepo architecture with Nx, shared libraries, CI optimization, and developer experience tooling.",
    icon: "git-branch",
  },
  {
    id: "mentoring",
    title: "Team Leadership & Technical Mentoring",
    description:
      "Staff/principal-level mentoring for frontend teams — design system governance, AI-native workflows, and career growth.",
    icon: "layers",
  },
  {
    id: "mcp",
    title: "MCP & AI-Native Tooling",
    description:
      "Model Context Protocol servers and AI integration layers that connect design tools to coding assistants.",
    icon: "cpu",
  },
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "nx-monorepo",
    title: "Redesign Health Platform Portal",
    subtitle: "Staff Frontend → Tech Lead → Engineering Director, ~1y11mo",
    tags: ["Nx", "Monorepo", "React 19", "Chakra UI v3"],
    summary:
      "Double-promoted to Engineering Director while staying hands-on. Led frontend strategy for an Nx monorepo running the Platform Portal, a mock API server, and a shared design system — coordinating async delivery across three cross-functional teams (15+ people).",
    metrics: [
      { label: "Nx projects", value: "38" },
      { label: "Cross-functional team", value: "15+" },
      { label: "Files migrated to Chakra v3", value: "180+" },
    ],
    image: "/images/case-studies/nx-monorepo.png",
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    subtitle: "Figma + Storybook MCP servers for design-to-code",
    tags: ["MCP", "Figma", "Storybook", "AI"],
    summary:
      "Published forgekit-figma-mcp and forgekit-storybook-mcp — MCP servers purpose-built for Figma-to-React design system workflows. Figma package extracts variables into typed theme configs; Storybook package exposes argTypes and usage patterns to coding agents. 6,200+ npm installs.",
    metrics: [
      { label: "npm installs", value: "6,200+" },
      { label: "MCP packages", value: "2" },
      { label: "IDE integrations", value: "4" },
    ],
    image: "/images/projects/forgekit-mcp.png",
    liveHref: "https://forgekit.cloud",
  },
  {
    slug: "tokencast",
    title: "TokenCast",
    subtitle: "Design tokens in, live theme preview and export out",
    tags: ["React Router", "Supabase", "Security"],
    summary:
      "A design-token pipeline built on React Router in framework mode (SSR, loaders, actions) — paste Figma variables or a Tailwind config, get a live preview, export to Tailwind/Chakra/shadcn, and save a server-rendered shareable link.",
    metrics: [
      { label: "Lighthouse accessibility", value: "100" },
      { label: "Lighthouse performance", value: "99" },
      { label: "Export targets", value: "3" },
    ],
    image: "/images/projects/tokencast.png",
    liveHref: "https://tokencast.vercel.app",
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
      { label: "Lighthouse accessibility", value: "100" },
      { label: "Lighthouse performance", value: "97" },
    ],
    image: "/images/projects/mcp-atlas.png",
    liveHref: "https://mcp-atlas-orcin.vercel.app",
  },
  {
    slug: "design-system-scale",
    title: "Design System at Scale",
    subtitle: "Freebird 200-component library → Redesign Health Chromatic workflow",
    tags: ["Storybook", "Chromatic", "React Native", "Figma"],
    summary:
      "At Freebird (2016–2021), built one of the earliest production React UI libraries on Storybook — 200 components across B2B, B2C, and React Native. At Redesign Health, spearheaded a 50+ component React design system with Storybook + Chromatic that cut dev time ~30% across a 10–15 engineer org.",
    metrics: [
      { label: "Freebird components", value: "200+" },
      { label: "Redesign DS components", value: "50+" },
      { label: "Dev time reduction", value: "~30%" },
    ],
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "What's your background and experience?",
    answer:
      "Principal Frontend Engineer with 10+ years shipping React at scale — design systems, Nx monorepos, React Native platforms serving 500K+ users, and AI-native developer tooling like ForgeKit MCP.",
  },
  {
    id: "2",
    question: "What makes you different from other React engineers?",
    answer:
      "I operate at the intersection of design systems, platform engineering, and AI tooling. Most engineers specialize in one — I architect systems that keep design, product, and engineering shipping in lockstep.",
  },
  {
    id: "3",
    question: "What types of projects do you take on?",
    answer:
      "Frontend platform engineering, design systems, Nx monorepos, and AI-native developer tooling. Ideal engagements include 0→1 SaaS products, design system builds, and MCP server development.",
  },
  {
    id: "4",
    question: "What's your current availability?",
    answer:
      "I'm currently available for senior contract engagements (3-6 months) and advisory roles. Full-time principal/staff positions are considered for the right opportunity.",
  },
  {
    id: "5",
    question: "Do you do fractional or part-time roles?",
    answer:
      "Yes — fractional principal engagements (1-2 days/week) work well for design system governance, architecture advisory, and team mentoring.",
  },
  {
    id: "6",
    question: "What tech stack do you specialize in?",
    answer:
      "React 19, TypeScript, TanStack Start/Router/Query, Tailwind CSS, Storybook, Nx, Supabase, and Cloudflare Workers. I also work extensively with React Native, Expo, and Figma MCP integrations.",
  },
  {
    id: "7",
    question: "How do you approach design system projects?",
    answer:
      "Design systems start with token architecture in Figma, flow through automated pipelines (TokenCast), and land in Storybook with Chromatic visual regression. Every component ships with accessibility tests and usage documentation.",
  },
  {
    id: "8",
    question: "Can you help with AI/LLM integration in our codebase?",
    answer:
      "Yes — I build MCP servers, RAG pipelines for monorepo context, and AI agent workflows for automated migrations and code generation. See ForgeKit MCP and my LLM Agents case study.",
  },
]

export const RESOURCES: Resource[] = [
  {
    id: "design-system-starter",
    title: "Design System Starter Kit",
    description: "Token architecture, Storybook setup, and Chromatic config for new systems",
    category: "Design Systems",
    href: "/case-studies/design-system-scale",
  },
  {
    id: "nx-guide",
    title: "Nx Monorepo Architecture Guide",
    description: "Patterns for scaling from 3 apps to 40+ packages with Nx",
    category: "Platform",
    href: "/case-studies/nx-monorepo",
  },
  {
    id: "react-checklist",
    title: "React Architecture Checklist",
    description: "Principal-level checklist for React platform reviews",
    category: "Tooling",
    href: "/insights/architecting-for-100-on-lighthouse",
  },
  {
    id: "forgekit",
    title: "ForgeKit MCP",
    description: "Figma-to-code MCP server for AI coding assistants",
    category: "Open Source",
    href: "https://forgekit.cloud",
  },
  {
    id: "tokencast",
    title: "TokenCast",
    description: "Design token pipeline from Figma to code",
    category: "Tooling",
    href: "/work",
  },
  {
    id: "performance-audit",
    title: "Performance Audit Framework",
    description: "Lighthouse budgets, CWV monitoring, and regression gates",
    category: "Testing",
    href: "/insights/architecting-for-100-on-lighthouse",
  },
  {
    id: "storybook",
    title: "Storybook 10+",
    description: "Component development and visual testing",
    category: "Design Systems",
    href: "https://storybook.js.org",
  },
  {
    id: "tanstack",
    title: "TanStack Start",
    description: "Full-stack React framework with file-based routing",
    category: "Frameworks",
    href: "https://tanstack.com/start",
  },
]

export const RESUME_SECTIONS = {
  summary:
    "Principal Frontend Engineer, 15 years — founding/architecture-level engineer across five 0-to-1 startups, IC to Engineering Director, with real experience running teams, not just shipping UI. The throughline across every role: Nx monorepo architecture, structural and lint tooling (now Oxlint), and the design-system to shared-UI-library to frontend to BFF to backend pattern, built repeatedly at Freebird, Pineapple, PHC Global, and Redesign Health. Early, genuine adopter of React and Storybook (2016 — still active in both communities' Discords), and pioneered browser-based AR for NARS Cosmetics years before WebAR went mainstream. Deeply agent-native: creator of ForgeKit, an open-source CLI + MCP server suite (6,200+ npm installs across three separate first-time package releases) that is itself harness/spec tooling for AI coding agents — I design what context an agent needs to do a task right, not just prompt it. Claude Code and Cursor daily, including production use of Cursor's background agent. Seeking Principal / Staff Frontend, Product Engineer, or engineering-leadership roles where architecture, AI-native tooling, and real ownership meet.",
  experience: [
    {
      title: "Consultant, AI Model Evaluation & Red-Teaming",
      company: "Independent (Mercor, micro1, Handshake)",
      period: "Feb 2026 — Jul 2026",
      highlights: [
        "Evaluated, ranked, and red-teamed frontier AI model outputs against scoring rubrics on React/TypeScript frontend-engineering tasks across three sequential contract engagements (Mercor, then micro1, then Handshake); authored adversarial test cases to expose model failure modes and break outputs. Worked in ChatGPT Pro and Cursor across four frontier LLMs throughout.",
      ],
    },
    {
      title: "Staff Frontend Engineer & Tech Lead to Engineering Director",
      company: "Redesign Health",
      period: "Jul 2022 — Jan 2026",
      highlights: [
        "Promoted twice to Engineering Director; led delivery across three cross-functional teams (15+ members) while staying hands-on as a frontend architecture SME.",
        "Spearheaded a React design system of 50+ reusable components (Storybook + Chromatic) adopted across teams: 30% dev-time reduction across a 10-15 engineer org.",
        "Engineered 20+ data-visualization components with custom hooks and Zustand: 40% rendering-overhead reduction on large datasets; established a Chromatic visual-regression workflow.",
        "Adopted Ponicode for AI-generated React unit-test scaffolding, raising test coverage on new components with less manual boilerplate.",
        "Built an onboarding methodology that trained backend engineers to production-level React in one month.",
        "Drove build-tooling modernization: migrated to Vite (became the org's default bundler by early 2023) and to Tailwind CSS for an internal sister app to the client portal; migrated the team's default e2e suite from Cypress to Playwright; generated type-safe React Query hooks from OpenAPI/Swagger specs; collaborated with backend on JWT auth and authored the specs for an OIDC migration that was shelved when the team was restructured.",
      ],
    },
    {
      title: "Senior Frontend Engineer & Tech Lead",
      company: "Pineapple Corporation",
      period: "Jan 2022 — Jul 2022",
      highlights: [
        "Architected Nx monorepo with a design-system-based shared UI library, a cross-platform (iOS, Android, web) application, and a NestJS backend.",
        "Built cross-platform architecture with Expo, Nx, and React Native (25% mobile performance gain for 100K+ users).",
      ],
    },
    {
      title: "Founding Frontend Engineer",
      company: "PHC Global",
      period: "Jul 2021 — Jan 2022",
      highlights: [
        "Founding frontend architect for a healthtech/biosecurity startup: built the core product for enterprise clients (including Facebook and Amex, our first two customers) — a Mapbox GL heatmap of active COVID risk zones that clients used to schedule ground teams, plus flight/travel-arrangement suggestions and a separate interactive map for simulating alternate entry routes.",
        "Set up the foundational architecture: Nx monorepo with 30+ shared libraries and gRPC middleware (40% developer-experience improvement); lifted NPS-measured satisfaction 35%; cut infrastructure costs 30% via GCP, gRPC, and Kubernetes.",
        "Standardized client state with Redux Toolkit (RTK) and server state with React Query across the platform.",
      ],
    },
    {
      title: "Lead Frontend Engineer",
      company: "Freebird",
      period: "Sep 2016 — Jan 2021",
      highlights: [
        "Built one of the earliest production React UI libraries on Storybook: a 200-component design system spanning B2B, B2C, and React Native, eliminating the need for separate iOS and Android teams.",
        "Migrated the team's Redux + Redux-Saga boilerplate to Redux Toolkit (RTK) in 2019, cutting state-management boilerplate and standardizing patterns across the design system.",
        "Served as design-engineering liaison across client, sales, and marketing; shipped B2B/B2C and internal dashboards (React, NestJS, D3.js) and a React Native app with real-time data views.",
      ],
    },
    {
      title: "Lead Web Developer",
      company: "FaceCake Marketing Technologies (Los Angeles, CA)",
      period: "Oct 2010 — Sep 2016",
      highlights: [
        "Pioneered browser-based AR try-on for NARS, one of the first of its kind: compiled OpenCV to JavaScript via Emscripten for real-time client-side computer vision over getUserMedia, with Pixi.js, WebGL, and Three.js powering real-time face-tracking and makeup-rendering. Worked directly with Pixi.js's creator on techniques no one had attempted before, years ahead of mainstream WebAR.",
        "Shipped the NARS virtual try-on web app (~$400K/month revenue lift) backed by a real-time CMS on Firebase Realtime Database; owned the full lifecycle end-to-end.",
      ],
    },
  ],
  projects: [
    {
      title: "ForgeKit",
      detail:
        "Independent open-source developer-tooling venture (2024 — 2026) — Open-source CLI + MCP server suite bridging Figma to React to Storybook for design-system teams — itself a harness/spec-tooling product for AI coding agents (Claude Code, Cursor). 6,200+ npm installs across three separate first-time package releases, with active production adoption. forgekit.cloud, github.com/effinrich, npmjs.com.",
    },
    {
      title: "ForgeKit Core CLI",
      detail:
        "TypeScript CLI scaffolding production-ready Nx monorepos with React 18, Storybook 10+, Vitest, Playwright, and GitHub Actions CI/CD; targets Chakra UI, shadcn/ui, and Tamagui across web and universal React Native. Used recursively to scaffold ForgeKit itself.",
    },
    {
      title: "ForgeKit Figma MCP",
      detail:
        "MCP server extracting Figma variables and design tokens; generates typed theme configs for Chakra UI, Tailwind, and shadcn — enabling AI-driven design-to-code workflows.",
    },
    {
      title: "ForgeKit Storybook MCP",
      detail:
        "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents — automating story generation, docs scaffolding, and component-testing workflows. Direct, hands-on experience designing what context an AI agent needs to do a task correctly.",
    },
    {
      title: "Perch",
      detail:
        "Open-source voice-assistant widget — Drop-in voice AI for any website (one script tag + React SDK) built on ElevenLabs Conversational AI: dependency-free Shadow-DOM core, React SDK, and a serverless signed-URL proxy that keeps the API key server-side. Built end-to-end with Claude Code.",
    },
    {
      title: "Santa Chat AI",
      detail:
        "AI-powered Santa Claus experience — Real-time chat, live phone calls, and SMS with Santa via ElevenLabs text-to-speech and Twilio, an LLM chat backend, and Stable Diffusion image generation; Stripe-based subscription tokens. Per-user personalization (parents added their child's name so Santa could address them by name) and analytics instrumentation (Amplitude, Google Analytics 4) tracked engagement in production. Next.js frontend/BFF layer proxying to a dedicated backend service. Selected by ElevenLabs for a 300K-token grant. Next.js, React, Chakra UI, Zustand, MongoDB, NextAuth.",
    },
    {
      title: "Textation",
      detail:
        "AI character chat and avatar platform — Pivoted from Santa Chat AI into a general AI-companion product: custom AI characters with LLM chat, ElevenLabs text-to-speech, Deepgram speech-to-text, image generation, SadTalker talking-head video, and live WebSocket voice chat; Stripe payments, Twilio SMS/voice. Next.js, React, Chakra UI, Zustand, MongoDB.",
    },
    {
      title: "MCP Atlas",
      detail:
        "Curated, link-verified directory of Model Context Protocol servers (18 official + community, searchable and filterable). Built with Claude Code. Astro (Zod-validated content collections + islands architecture), TypeScript, Vitest, and Playwright; Lighthouse 100 accessibility, 97 performance. mcp-atlas-orcin.vercel.app.",
    },
    {
      title: "TokenCast",
      detail:
        "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config) and get a live preview plus exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered Save & Share links. Built with Cursor. React Router (framework mode: SSR, loaders, actions), React 19, TypeScript, Tailwind CSS 4, Supabase (RLS + SECURITY DEFINER RPCs, IP rate-limiting), Vitest + Playwright; Lighthouse 100 accessibility, 99 performance. tokencast.vercel.app.",
    },
    {
      title: "Tidy App",
      detail:
        "Offline-first React Native + Expo app; Zustand + TanStack Query; Supabase; Figma Code Connect; 90% test coverage. Built with both Claude Code and Cursor, including production use of Cursor's background agent (verified via git co-author trailers on merged PRs). tidyapp.me.",
    },
    {
      title: "Serial One",
      detail:
        "Dec 2021 — Jan 2022 — Turborepo monorepo browsing live Candy Digital NFT sale listings (MLB-licensed digital trading cards), pulling data from MongoDB and filterable by player name and rarity tier, rendered in a masonry grid (price, sale date, edition number per card). Coinbase Commerce crypto-donation checkout integrated in the nav. Next.js, React, Chakra UI, MongoDB, axios, SWR. app.serialone.io.",
    },
  ],
  skills: [
    "JavaScript (15 yrs) / TypeScript (strict)",
    "React 19 / Next.js",
    "React Native / Expo",
    "TanStack Start / Query",
    "Node.js / NestJS",
    "Pixi.js / WebGL / Three.js / OpenCV",
    "Storybook 10+ / Chromatic",
    "Chakra UI / shadcn / Tamagui / Ark UI",
    "Tailwind CSS / Figma Code Connect",
    "MCP / Claude Code / Cursor",
    "AI evaluation & red-teaming",
    "Nx / Turborepo / Vite / Oxlint",
    "Redux Toolkit / Zustand",
    "Supabase / PostgreSQL",
    "Vitest / Playwright / RTL",
    "WCAG 2.1 AA",
  ],
}
