import type { FaqItem } from "./types"

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "What's your background and experience?",
    answer:
      "Principal Frontend Engineer with 15 years shipping React at scale: design systems, Nx monorepos, a React Native app serving 100K+ users, and developer tooling like ForgeKit MCP."
  },
  {
    id: "2",
    question: "What makes you different from other React engineers?",
    answer:
      "I have worked across product frontend, design systems, monorepo architecture, and developer tooling, so I can connect decisions across those layers instead of treating them as separate projects."
  },
  {
    id: "3",
    question: "What types of projects do you take on?",
    answer:
      "Frontend platform engineering, design systems, Nx monorepos, and developer tooling. I also take on 0→1 product work and MCP server development."
  },
  {
    id: "4",
    question: "What's your current availability?",
    answer:
      "I'm open to Principal and Staff Frontend roles, product engineering, and engineering leadership. Contract (3-6 months), advisory, and fractional engagements are welcome too."
  },
  {
    id: "5",
    question: "Do you do fractional or part-time roles?",
    answer:
      "Yes. Fractional principal engagements (1-2 days/week) work well for design system governance, architecture advisory, and team mentoring, and can complement a full-time role."
  },
  {
    id: "6",
    question: "What tech stack do you specialize in?",
    answer:
      "React 19, TypeScript, TanStack Start/Router/Query, Tailwind CSS, Storybook, Nx, Supabase, and Cloudflare Workers. I also work extensively with React Native, Expo, and Figma MCP integrations."
  },
  {
    id: "7",
    question: "How do you approach design system projects?",
    answer:
      "Design systems start with token architecture in Figma, flow through automated pipelines (TokenCast), and land in Storybook with Chromatic visual regression. Every component ships with accessibility tests and usage documentation."
  },
  {
    id: "8",
    question: "Can you help with AI/LLM integration in our codebase?",
    answer:
      "Yes. I build MCP servers and tooling around design-system context, and I have evaluated and red-teamed AI model output on React and TypeScript tasks. See ForgeKit MCP and the model-evaluation writing."
  }
]
