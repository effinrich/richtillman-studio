import { MousePointerClick } from "lucide-react"
import type { ReactNode } from "react"
import { Chip } from "../chip"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { Metric } from "../models"

type HomeScreenProps = {
  metrics: readonly Metric[]
  actions: ReactNode
}

export function HomeScreen({ metrics, actions }: HomeScreenProps) {
  return (
    <PortfolioLayout activeItem="home" showTicker>
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-32 pb-24">
        <div className="pointer-events-auto max-w-4xl space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Chip dot>Remote</Chip>
            <Chip>React + TypeScript</Chip>
            <Chip>Storybook • Chromatic</Chip>
            <Chip>Nx monorepos at scale</Chip>
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
            Building the bridge between design <span className="neon-text">systems</span> and
            AI-native developer tooling.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed font-normal text-white/60 md:text-xl">
            I&apos;m <span className="font-medium text-white">Rich Tillman</span> — Principal
            Frontend Engineer. I architect{" "}
            <span className="font-medium text-white">enterprise-scale</span> React platforms, Nx
            monorepos, and 0→1 SaaS products — and the design systems (Storybook + React + Figma)
            that keep design, product, and engineering shipping in lockstep.
          </p>

          <div className="flex flex-col flex-wrap items-start gap-4 pt-4 sm:flex-row sm:items-center">
            {actions}
          </div>
        </div>

        <div
          className="absolute top-1/2 right-8 hidden -translate-y-1/2 animate-pulse flex-col items-center gap-3 text-white/50 lg:flex"
          aria-hidden
        >
          <MousePointerClick className="h-6 w-6" aria-hidden />
          <span className="vertical-text font-mono text-[10px] uppercase tracking-widest">
            Click bg to randomize
          </span>
        </div>
      </main>

      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
        <GlassPanel className="grid grid-cols-1 gap-8 rounded-2xl p-8 md:grid-cols-3 md:gap-12 md:p-10">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-2 ${index > 0 ? "md:border-l md:border-white/10 md:pl-12" : ""}`}
              style={{ animation: `fade-in-up 0.6s ease-out ${0.1 + index * 0.15}s backwards` }}
            >
              <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {metric.value}
              </p>
              <p className="font-mono text-sm text-white/50">{metric.label}</p>
            </div>
          ))}
        </GlassPanel>
      </div>
    </PortfolioLayout>
  )
}
