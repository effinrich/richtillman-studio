import { SiteMapScreen, type SiteMapSectionModel } from "@richtillman/ui"

const SECTIONS: SiteMapSectionModel[] = [
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
      { title: "Contact Form", href: "/contact", description: "Project inquiry + availability" },
      {
        title: "Professional Resume",
        href: "/resume",
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
        href: "/projects/forgekit-mcp",
        description: "MCP server deep dive",
      },
      {
        title: "Case Studies Hub",
        href: "/case-studies",
        description: "Architecture impact stories",
      },
      {
        title: "Nx Monorepo Architecture",
        href: "/case-studies/nx-monorepo",
        description: "40+ packages, 12 teams",
      },
      { title: "Services & Expertise", href: "/services", description: "Engagement offerings" },
      { title: "Resources & Stack", href: "/resources", description: "Tools and guides" },
      { title: "Design System", href: "/design-system", description: "Tokens and live components" },
    ],
  },
  {
    id: "03",
    label: "03 — Trust & Credentials",
    accent: "gold",
    links: [
      { title: "Testimonials", href: "/testimonials", description: "Engineering leader quotes" },
      { title: "FAQ", href: "/faq", description: "Engagement & process answers" },
    ],
  },
  {
    id: "04",
    label: "04 — Knowledge Base",
    accent: "magenta",
    links: [
      { title: "Insights & Articles", href: "/insights", description: "Blog index" },
      {
        title: "Model Context Protocol",
        href: "/insights/the-model-context-protocol",
        description: "Featured analysis",
      },
      {
        title: "Architecting for 100",
        href: "/insights/architecting-for-100-on-lighthouse",
        description: "Lighthouse playbook",
      },
      {
        title: "Storybook Playgrounds",
        href: "/insights/storybook-to-next-js-playgrounds",
        description: "Design system DX",
      },
      {
        title: "T-Shaped Principal",
        href: "/insights/the-case-for-the-t-shaped-principal-engineer",
        description: "Leadership essay",
      },
      {
        title: "LLM Agents in Monorepo",
        href: "/insights/llm-agents-in-the-monorepo",
        description: "48-hour migration",
      },
      {
        title: "Mastering TanStack Start",
        href: "/insights/mastering-tanstack-start",
        description: "Framework deep dive",
      },
      {
        title: "React Native at Scale",
        href: "/insights/shipping-react-native-at-scale",
        description: "500K+ users lessons",
      },
    ],
  },
]

export function SiteMapPage() {
  return <SiteMapScreen sections={SECTIONS} />
}
