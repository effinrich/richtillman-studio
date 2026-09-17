import { Cpu, GitBranch, Layers, Users, Zap } from "lucide-react"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ServiceModel } from "../models"
import { SectionHeader } from "../section-header"

const iconMap = {
  layers: Layers,
  "git-branch": GitBranch,
  cpu: Cpu,
  zap: Zap,
} as const

const ENGAGEMENT_TYPES = [
  { title: "Hourly Consulting", detail: "Architecture reviews, pairing, advisory" },
  { title: "Project-Based", detail: "Fixed-scope design systems & platforms" },
  { title: "Retainer", detail: "Fractional principal (1–2 days/week)" },
  { title: "Code Review Sessions", detail: "Focused audits with actionable reports" },
] as const

type ServicesScreenProps = {
  services: ServiceModel[]
}

export function ServicesScreen({ services }: ServicesScreenProps) {
  return (
    <PortfolioLayout activeItem="services">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Services & Expertise"
          title={
            <>
              What I <span className="neon-text">build</span>
            </>
          }
          description="Principal-level frontend engineering for teams shipping at scale — from design systems to AI-native developer tooling."
        />

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Users
            return (
              <GlassPanel
                key={service.id}
                className={`rounded-2xl p-8 transition-all hover:border-gold/30 stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                <p className="leading-relaxed text-white/50">{service.description}</p>
              </GlassPanel>
            )
          })}
        </div>

        <section>
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Engagement models
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_TYPES.map((item) => (
              <GlassPanel key={item.title} className="rounded-2xl p-6">
                <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/40">{item.detail}</p>
              </GlassPanel>
            ))}
          </div>
        </section>
      </main>
    </PortfolioLayout>
  )
}
