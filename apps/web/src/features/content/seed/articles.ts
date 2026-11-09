import type { Article } from "./types"

export const ARTICLES: Article[] = [
  {
    slug: "red-teaming-frontend-models",
    title: "Red-Teaming Frontier Models on React and TypeScript Tasks",
    excerpt:
      "What breaks when you attack frontier model output with adversarial frontend cases, and what three contract engagements taught me about the harness around a model.",
    category: "AI Engineering",
    publishedAt: "2026-08-14",
    readTime: "2 min",
    featured: true,
    content: [
      "Between February and July 2026 I ran three sequential contract engagements (Mercor, then micro1, then Handshake) evaluating, ranking, and red-teaming frontier model output against scoring rubrics built for React and TypeScript frontend-engineering tasks.",
      "Authoring the adversarial cases was the part that changed my practice. A rubric rewards one behaviour; an adversarial case is written so the wrong behaviour still passes a shallow check, and you find out which failure mode the model actually has.",
      "I worked in ChatGPT Pro and Cursor across four frontier LLMs throughout. The gap between a model's ceiling and its daily output turned out to be about the harness around it far more often than about the model itself."
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
