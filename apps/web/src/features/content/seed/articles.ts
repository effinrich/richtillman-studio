import type { Article } from "./types"

export const ARTICLES: Article[] = [
  {
    slug: "the-model-context-protocol",
    title: "The Model Context Protocol: A Frontend Engineer's Guide",
    excerpt:
      "How MCP is reshaping the hand-off between design tools and AI-native development workflows.",
    category: "Featured Analysis",
    publishedAt: "2024-03-12",
    readTime: "2 min",
    featured: true,
    content: [
      "The Model Context Protocol (MCP) represents a fundamental shift in how frontend engineers interact with AI coding assistants. Instead of treating design assets as static screenshots, MCP exposes them as structured, queryable context.",
      "For years, the hand-off was the most friction-filled part of our work. With MCP, the hand-off disappears. Design tokens, components, and layout patterns are live nodes in a context graph that AI can traverse.",
      "MCP represents a shift from AI as an external generator to AI as an integrated team member with direct access to your design system truth."
    ]
  },
  {
    slug: "red-teaming-frontend-models",
    title: "Red-Teaming Frontier Models on React and TypeScript Tasks",
    excerpt:
      "What breaks when you attack frontier model output with adversarial frontend cases, and what three contract engagements taught me about the harness around a model.",
    category: "AI Engineering",
    publishedAt: "2026-08-14",
    readTime: "2 min",
    featured: false,
    content: [
      "Between February and July 2026 I ran three sequential contract engagements (Mercor, then micro1, then Handshake) evaluating, ranking, and red-teaming frontier model output against scoring rubrics built for React and TypeScript frontend-engineering tasks.",
      "Authoring the adversarial cases was the part that changed my practice. A rubric rewards one behaviour; an adversarial case is written so the wrong behaviour still passes a shallow check, and you find out which failure mode the model actually has.",
      "I worked in ChatGPT Pro and Cursor across four frontier LLMs throughout. The gap between a model's ceiling and its daily output turned out to be about the harness around it far more often than about the model itself."
    ]
  },
  {
    slug: "storybook-to-next-js-playgrounds",
    title: "From Storybook to Next.js Playgrounds",
    excerpt:
      "Bridging isolated component development with full-page integration testing using composable playground patterns.",
    category: "Design Systems",
    publishedAt: "2024-02-14",
    readTime: "1 min",
    featured: false,
    content: [
      "Storybook excels at component isolation, but teams need full-page contexts to validate real integration behavior.",
      "Next.js playgrounds provide the missing layer — letting designers and engineers preview components in realistic page layouts without leaving the design system workflow."
    ]
  },
  {
    slug: "the-case-for-the-t-shaped-principal-engineer",
    title: "The Case for the T-Shaped Principal Engineer in 2024",
    excerpt:
      "Why depth in frontend architecture plus breadth across design, product, and platform creates outsized impact.",
    category: "Leadership",
    publishedAt: "2024-01-22",
    readTime: "1 min",
    featured: false,
    content: [
      "The T-shaped principal engineer combines deep frontend expertise with enough breadth to connect design systems, platform engineering, and product strategy.",
      "In 2024, the most impactful principals are those who can ship design system infrastructure while also mentoring teams on AI-native development patterns."
    ]
  },
  {
    slug: "onboarding-backend-engineers-to-react",
    title: "Teaching Backend Engineers Production React in One Month",
    excerpt:
      "The onboarding methodology that took backend engineers to production-level React in a month, inside an org running a 50+ component design system.",
    category: "Leadership",
    publishedAt: "2026-02-19",
    readTime: "2 min",
    featured: false,
    content: [
      "At Redesign Health I built an onboarding methodology that trained backend engineers to production-level React in one month, inside an org of roughly 10 to 15 engineers working across three cross-functional teams.",
      "The design system gave those engineers one vocabulary instead of a dozen personal ones. A 50+ component Storybook and Chromatic library, which cut dev time around 30% across the org, was worth learning properly because it was already paying for itself.",
      "This was the org where I was promoted twice to Engineering Director while staying hands-on as the frontend architecture SME. Onboarding turned out to be one of the highest-leverage parts of that job."
    ]
  },
  {
    slug: "mastering-tanstack-start",
    title: "Mastering TanStack Start: Full-Stack React Without the Framework Tax",
    excerpt:
      "File-based routing, server functions, and Cloudflare Workers deployment for modern portfolio and SaaS apps.",
    category: "Frameworks",
    publishedAt: "2023-12-10",
    readTime: "1 min",
    featured: false,
    content: [
      "TanStack Start brings together Router, Query, and server-side rendering in a composable package that avoids the lock-in of traditional meta-frameworks.",
      "File-based routing with type-safe params, combined with Cloudflare Workers deployment, makes it ideal for portfolio sites and SaaS MVPs."
    ]
  },
  {
    slug: "shipping-react-native-at-scale",
    title: "Shipping React Native at Scale: Lessons from 100K+ Users",
    excerpt:
      "Monorepo strategies, OTA updates, and design system parity between web and mobile at enterprise scale.",
    category: "Mobile Development",
    publishedAt: "2023-12-05",
    readTime: "1 min",
    featured: false,
    content: [
      "Shipping React Native at scale requires treating mobile as a first-class platform in your monorepo — not a fork of your web codebase.",
      "Design system parity, shared token pipelines, and disciplined release trains are what separate prototypes from products serving 100K+ users."
    ]
  }
]
