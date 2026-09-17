import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import type { SiteMapLink } from "#/features/site-map/site-map-card"
import { SiteMapCard } from "#/features/site-map/site-map-card"
import { SectionHeader } from "@richtillman/ui"

type SiteMapSection = {
  id: string
  label: string
  accent: SiteMapLink["accent"]
  links: Omit<SiteMapLink, "accent">[]
}

const SECTIONS: SiteMapSection[] = [
  {
    id: "01",
    label: "01 — Core Experience",
    accent: "gold",
    links: [
      { title: "Interactive Neon Hero", to: "/", description: "Home with tubes cursor background" },
      { title: "Work Portfolio", to: "/work", description: "TokenCast, MCP Atlas, ForgeKit" },
      { title: "Contact Form", to: "/contact", description: "Project inquiry + availability" },
      {
        title: "Professional Resume",
        to: "/resume",
        description: "Experience, skills, open source",
      },
    ],
  },
  {
    id: "02",
    label: "02 — Engineering Showcase",
    accent: "cyan",
    links: [
      {
        title: "ForgeKit MCP Detail",
        to: "/projects/forgekit-mcp",
        description: "MCP server deep dive",
      },
      {
        title: "Case Studies Hub",
        to: "/case-studies",
        description: "Architecture impact stories",
      },
      {
        title: "Nx Monorepo Architecture",
        to: "/case-studies",
        params: { slug: "nx-monorepo" },
        description: "40+ packages, 12 teams",
      },
      { title: "Services & Expertise", to: "/services", description: "Engagement offerings" },
      { title: "Resources & Stack", to: "/resources", description: "Tools and guides" },
      {
        title: "Design System",
        to: "/design-system",
        description: "Tokens and live components",
      },
    ],
  },
  {
    id: "03",
    label: "03 — Trust & Credentials",
    accent: "gold",
    links: [
      {
        title: "Testimonials",
        to: "/testimonials",
        description: "Engineering leader quotes",
      },
      { title: "FAQ", to: "/faq", description: "Engagement & process answers" },
    ],
  },
  {
    id: "04",
    label: "04 — Knowledge Base",
    accent: "magenta",
    links: [
      { title: "Insights & Articles", to: "/insights", description: "Blog index" },
      {
        title: "Model Context Protocol",
        to: "/insights",
        params: { slug: "the-model-context-protocol" },
        description: "Featured analysis",
      },
      {
        title: "Architecting for 100",
        to: "/insights",
        params: { slug: "architecting-for-100-on-lighthouse" },
        description: "Lighthouse playbook",
      },
      {
        title: "Storybook Playgrounds",
        to: "/insights",
        params: { slug: "storybook-to-next-js-playgrounds" },
        description: "Design system DX",
      },
      {
        title: "T-Shaped Principal",
        to: "/insights",
        params: { slug: "the-case-for-the-t-shaped-principal-engineer" },
        description: "Leadership essay",
      },
      {
        title: "LLM Agents in Monorepo",
        to: "/insights",
        params: { slug: "llm-agents-in-the-monorepo" },
        description: "48-hour migration",
      },
      {
        title: "Mastering TanStack Start",
        to: "/insights",
        params: { slug: "mastering-tanstack-start" },
        description: "Framework deep dive",
      },
      {
        title: "React Native at Scale",
        to: "/insights",
        params: { slug: "shipping-react-native-at-scale" },
        description: "500K+ users lessons",
      },
    ],
  },
]

const underlineClass = {
  gold: "after:bg-gold",
  cyan: "after:bg-cyan",
  magenta: "after:bg-magenta",
} as const

export function SiteMapPage() {
  return (
    <PortfolioLayout activeItem="home">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Site Map"
          title={
            <>
              Project <span className="neon-text">Atlas</span>
            </>
          }
          description="Grid overview of every route mapped from the SuperDesign HTML exports."
        />

        <div className="space-y-16">
          {SECTIONS.map((section) => (
            <section key={section.id}>
              <h2
                className={`relative mb-8 inline-block pb-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white/40 after:absolute after:bottom-0 after:left-0 after:h-px after:w-16 ${underlineClass[section.accent]}`}
              >
                {section.label}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.links.map((link) => (
                  <SiteMapCard
                    key={`${link.to}-${link.title}`}
                    link={{ ...link, accent: section.accent }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </PortfolioLayout>
  )
}
