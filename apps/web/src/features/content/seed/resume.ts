import type { ResumeContent } from "./types"

export const RESUME_SECTIONS: ResumeContent = {
  summary:
    "Principal Frontend Engineer, 15 years across five 0-to-1 startups, IC to Engineering Director. The throughline: Nx monorepo architecture, design systems from Figma to backend, and lint tooling now shipped as Oxlint. Creator of ForgeKit, an open-source CLI and MCP suite with {{featured_npm_downloads}} npm downloads in 12 months. Seeking Principal, Staff Frontend, or Product Engineer roles.",
  experience: [
    {
      title: "Consultant, AI Model Evaluation & Red-Teaming",
      company: "Independent (Mercor, micro1, Handshake)",
      period: "Feb 2026 — Jul 2026",
      highlights: [
        "Evaluated, ranked, and red-teamed frontier AI model output against React and TypeScript rubrics across three contract engagements (Mercor, micro1, Handshake), authoring adversarial cases to expose model failure modes."
      ]
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
        "Drove build-tooling modernization: migrated to Vite (org default bundler by early 2023) and Tailwind CSS, moved e2e from Cypress to Playwright, generated typed React Query hooks from OpenAPI specs, and wrote OIDC specs."
      ]
    },
    {
      title: "Senior Frontend Engineer & Tech Lead",
      company: "Pineapple Corporation",
      period: "Jan 2022 — Jul 2022",
      highlights: [
        "Architected Nx monorepo with a design-system-based shared UI library, a cross-platform (iOS, Android, web) application, and a NestJS backend.",
        "Built cross-platform architecture with Expo, Nx, and React Native (25% mobile performance gain for 100K+ users)."
      ]
    },
    {
      title: "Founding Frontend Engineer",
      company: "PHC Global",
      period: "Jul 2021 — Jan 2022",
      highlights: [
        "Founding frontend architect for a healthtech startup: built the core product for enterprise clients including Facebook and Amex, our first two customers, with a Mapbox GL risk heatmap clients used to schedule teams.",
        "Set up the foundational architecture: Nx monorepo with 30+ shared libraries and gRPC middleware (40% developer-experience improvement), NPS satisfaction up 35%, infrastructure costs down 30%.",
        "Standardized client state with Redux Toolkit (RTK) and server state with React Query across the platform."
      ]
    },
    {
      title: "Lead Frontend Engineer",
      company: "Freebird",
      period: "Sep 2016 — Jan 2021",
      highlights: [
        "Built one of the earliest production React UI libraries on Storybook: a 200-component design system spanning B2B, B2C, and React Native, eliminating the need for separate iOS and Android teams.",
        "Migrated the team's Redux + Redux-Saga boilerplate to Redux Toolkit (RTK) in 2019, cutting state-management boilerplate and standardizing patterns across the design system.",
        "Served as design-engineering liaison across client, sales, and marketing; shipped B2B/B2C and internal dashboards (React, NestJS, D3.js) and a React Native app with real-time data views."
      ]
    },
    {
      title: "Lead Web Developer",
      company: "FaceCake Marketing Technologies (Los Angeles, CA)",
      period: "Oct 2010 — Sep 2016",
      highlights: [
        "Pioneered AR try-on for NARS, one of the first of its kind: compiled OpenCV to JavaScript via Emscripten for client-side computer vision over getUserMedia, with Pixi.js and Three.js, years ahead of mainstream WebAR.",
        "Shipped the NARS virtual try-on web app (~$400K/month revenue lift) backed by a real-time CMS on Firebase Realtime Database; owned the full lifecycle end-to-end."
      ]
    }
  ],
  projects: [
    {
      title: "ForgeKit",
      detail:
        "Independent open-source developer-tooling venture (2024 to 2026): a CLI and MCP server suite bridging Figma to React to Storybook, itself harness and spec tooling for AI coding agents. {{featured_npm_downloads}} npm downloads in 12 months across two published Figma-to-React MCP packages."
    },
    {
      title: "ForgeKit Core CLI",
      detail:
        "TypeScript CLI scaffolding production-ready Nx monorepos with React 18, Storybook 10+, Vitest, Playwright, and GitHub Actions CI/CD; targets Chakra UI, shadcn/ui, and Tamagui across web and universal React Native. Used recursively to scaffold ForgeKit itself."
    },
    {
      title: "ForgeKit Figma MCP",
      detail:
        "MCP server extracting Figma variables and design tokens; generates typed theme configs for Chakra UI, Tailwind, and shadcn — enabling AI-driven design-to-code workflows."
    },
    {
      title: "ForgeKit Storybook MCP",
      detail:
        "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents — automating story generation, docs scaffolding, and component-testing workflows. Direct, hands-on experience designing what context an AI agent needs to do a task correctly."
    },
    {
      title: "Perch",
      detail:
        "Open-source voice-assistant widget — Drop-in voice AI for any website (one script tag + React SDK) built on ElevenLabs Conversational AI: dependency-free Shadow-DOM core, React SDK, and a serverless signed-URL proxy that keeps the API key server-side. Built end-to-end with Claude Code."
    },
    {
      title: "Santa Chat AI",
      detail:
        "AI-powered Santa Claus experience: real-time chat, live phone calls, and SMS with Santa via ElevenLabs text-to-speech and Twilio, Stable Diffusion images, Stripe subscription tokens, and per-user personalization (parents’ child’s name). An ElevenLabs 300K-token grant. Next.js, React, Chakra UI, Zustand, MongoDB."
    },
    {
      title: "Textation",
      detail:
        "AI character chat and avatar platform, pivoted from Santa Chat AI: custom characters with LLM chat, ElevenLabs text-to-speech, Deepgram speech-to-text, image generation, SadTalker talking-head video, and live WebSocket voice, with Stripe payments and Twilio SMS. Next.js, React, Chakra UI, Zustand, MongoDB."
    },
    {
      title: "MCP Atlas",
      detail:
        "Curated, link-verified directory of Model Context Protocol servers, 18 official plus community, searchable and filterable. Built with Claude Code. Astro with Zod-validated content collections and islands architecture; Lighthouse 100 accessibility, 100 performance (measured Nov 2026)."
    },
    {
      title: "TokenCast",
      detail:
        "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config), get a live preview and exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered Save and Share links. React Router, React 19, Supabase; Lighthouse 100 performance, 91 accessibility (measured Nov 2026)."
    },
    {
      title: "Tidy App",
      detail:
        "Offline-first React Native + Expo app; Zustand + TanStack Query; Supabase; Figma Code Connect; 90% test coverage. Built with both Claude Code and Cursor, including production use of Cursor's background agent (verified via git co-author trailers on merged PRs). tidyapp.me."
    },
    {
      title: "Serial One",
      detail:
        "Dec 2021 to Jan 2022: Turborepo monorepo browsing live Candy Digital NFT sale listings (MLB-licensed digital trading cards), filterable by player name and rarity tier, with Coinbase Commerce crypto-donation checkout. Next.js, React, Chakra UI, MongoDB, SWR. app.serialone.io."
    }
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
    "WCAG 2.1 AA"
  ]
}
