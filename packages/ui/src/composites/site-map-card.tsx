import { GlassPanel } from "../glass-panel"
import type { SiteMapLinkModel } from "../models"

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
  link: SiteMapLinkModel
}

export function SiteMapCard({ link }: SiteMapCardProps) {
  return (
    <a href={link.href} className="block" aria-label={`${link.title}. ${link.description}`}>
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
    </a>
  )
}
