import type { Project } from "./types"

export const PROJECTS: Project[] = [
  {
    slug: "tokencast",
    title: "TokenCast",
    description:
      "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config), get a live preview and exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered share links.",
    tags: ["React Router", "Supabase", "Design Tokens"],
    metric: "Lighthouse 100 perf / 91 a11y",
    href: "https://tokencast.vercel.app",
    image: "/images/projects/tokencast.png",
    featured: true
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
    featured: true
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    description:
      "MCP servers purpose-built for Figma-to-React design system workflows — forgekit-figma-mcp (tokens → typed themes) and forgekit-storybook-mcp (argTypes → agent context).",
    tags: ["MCP", "Figma", "Design Systems"],
    metric: "{{featured_npm_downloads}} npm downloads (12 mo)",
    href: "/projects/forgekit-mcp",
    image: "/images/projects/forgekit-mcp.png",
    featured: true
  },
  {
    slug: "storybook-system",
    title: "Freebird Design System",
    description:
      "Built one of the earliest production React component libraries backed by Storybook — 200 components spanning B2B, B2C, and React Native from a single system, eliminating separate iOS/Android teams.",
    tags: ["React", "Storybook", "React Native"],
    metric: "200 components",
    href: "/case-studies/design-system-scale",
    featured: true
  },
  {
    slug: "flagship-mobile",
    title: "Pineapple Cross-Platform",
    description:
      "Architected an Nx monorepo with a shared design-system UI library, a cross-platform (iOS, Android, web) app, and a NestJS backend; 25% mobile performance gain for 100K+ users.",
    tags: ["Nx", "Expo", "React Native"],
    metric: "100K+ users",
    href: "/insights/shipping-react-native-at-scale",
    featured: false
  },
  {
    slug: "nx-monorepo-scale",
    title: "Nx Monorepo Scale",
    description:
      "Led frontend for an Nx monorepo running the Platform Portal, a mock API server, and a shared design system, coordinating async delivery across three cross-functional teams.",
    tags: ["Nx", "Monorepo", "Platform"],
    metric: "15+ engineers",
    href: "/case-studies/nx-monorepo",
    featured: true
  },
  {
    slug: "tidy-app",
    title: "Tidy App",
    description:
      "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase Auth/Realtime, RevenueCat monetization, and Figma Code Connect mappings.",
    tags: ["React Native", "Expo", "Supabase"],
    metric: "TestFlight beta",
    href: "https://tidyapp.me",
    featured: false
  },
  {
    slug: "forgekit-storybook-mcp",
    title: "ForgeKit Storybook MCP",
    description:
      "MCP server exposing Storybook metadata, argTypes, and usage patterns for story generation, documentation, and component testing.",
    tags: ["MCP", "Storybook", "AI"],
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    featured: false
  }
]
import type { Project } from "./types"

export const PROJECTS: Project[] = [
  {
    slug: "tokencast",
    title: "TokenCast",
    description:
      "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config), get a live preview and exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered share links.",
    tags: ["React Router", "Supabase", "Design Tokens"],
    metric: "Lighthouse 100 perf / 91 a11y",
    href: "https://tokencast.vercel.app",
    image: "/images/projects/tokencast.png",
    featured: true
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
    featured: true
  },
  {
    slug: "forgekit-mcp",
    title: "ForgeKit MCP",
    description:
      "MCP servers purpose-built for Figma-to-React design system workflows — forgekit-figma-mcp (tokens → typed themes) and forgekit-storybook-mcp (argTypes → agent context).",
    tags: ["MCP", "Figma", "Design Systems"],
    metric: "{{featured_npm_downloads}} npm downloads (12 mo)",
    href: "/projects/forgekit-mcp",
    image: "/images/projects/forgekit-mcp.png",
    featured: true
  },
  {
    slug: "storybook-system",
    title: "Freebird Design System",
    description:
      "Built one of the earliest production React component libraries backed by Storybook — 200 components spanning B2B, B2C, and React Native from a single system, eliminating separate iOS/Android teams.",
    tags: ["React", "Storybook", "React Native"],
    metric: "200 components",
    href: "/case-studies/design-system-scale",
    featured: true
  },
  {
    slug: "flagship-mobile",
    title: "Pineapple Cross-Platform",
    description:
      "Stood up an Nx monorepo with a design-system-based shared UI library, a cross-platform (iOS, Android, web) app, and a NestJS backend; 25% mobile performance gain for 100K+ users.",
    tags: ["Nx", "Expo", "React Native"],
    metric: "100K+ users",
    href: "/insights/shipping-react-native-at-scale",
    featured: false
  },
  {
    slug: "nx-monorepo-scale",
    title: "Nx Monorepo Scale",
    description:
      "Led frontend for an Nx monorepo running the Platform Portal, a mock API server, and a shared design system, coordinating async delivery across three cross-functional teams.",
    tags: ["Nx", "Monorepo", "Platform"],
    metric: "15+ engineers",
    href: "/case-studies/nx-monorepo",
    featured: true
  },
  {
    slug: "tidy-app",
    title: "Tidy App",
    description:
      "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase Auth/Realtime, RevenueCat monetization, and Figma Code Connect mappings.",
    tags: ["React Native", "Expo", "Supabase"],
    metric: "TestFlight beta",
    href: "https://tidyapp.me",
    featured: false
  },
  {
    slug: "forgekit-storybook-mcp",
    title: "ForgeKit Storybook MCP",
    description:
      "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents — automating story generation, docs scaffolding, and component testing workflows.",
    tags: ["MCP", "Storybook", "AI"],
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    featured: false
  }
]
