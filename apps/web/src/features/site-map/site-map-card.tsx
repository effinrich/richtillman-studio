import { Link } from "@tanstack/react-router"
import { GlassPanel } from "@richtillman/ui"

export type SiteMapLink = {
  title: string
  description: string
  to:
    | "/"
    | "/work"
    | "/contact"
    | "/resume"
    | "/projects/forgekit-mcp"
    | "/case-studies"
    | "/services"
    | "/resources"
    | "/testimonials"
    | "/faq"
    | "/insights"
    | "/design-system"
  params?: { slug: string }
  accent: "gold" | "cyan" | "magenta"
}

const accentClass = {
  gold: "hover:border-gold/30",
  cyan: "hover:border-cyan/30",
  magenta: "hover:border-magenta/30",
} as const

const titleHover = {
  gold: "group-hover:text-gold",
  cyan: "group-hover:text-cyan",
  magenta: "group-hover:text-magenta",
} as const

type SiteMapCardProps = {
  link: SiteMapLink
}

export function SiteMapCard({ link }: SiteMapCardProps) {
  const card = (
    <GlassPanel
      className={`group h-full rounded-2xl p-6 transition-all ${accentClass[link.accent]}`}
    >
      <h3
        className={`mb-2 text-lg font-semibold leading-tight text-white transition-colors ${titleHover[link.accent]}`}
      >
        {link.title}
      </h3>
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
        {link.description}
      </p>
    </GlassPanel>
  )

  if (link.params) {
    if (link.to === "/case-studies") {
      return (
        <Link to="/case-studies/$slug" params={link.params} className="block">
          {card}
        </Link>
      )
    }
    return (
      <Link to="/insights/$slug" params={link.params} className="block">
        {card}
      </Link>
    )
  }

  return (
    <Link to={link.to} className="block">
      {card}
    </Link>
  )
}
