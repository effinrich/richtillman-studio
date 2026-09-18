import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "../badge"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import { Tag } from "../tag"

const PACKAGES = [
  {
    name: "forgekit-figma-mcp",
    description:
      "MCP server that extracts Figma variables and design tokens programmatically. Generates typed theme configs for Chakra UI, Tailwind, and shadcn — enabling AI-driven design-to-code workflows.",
    npmCmd: "npm install forgekit-figma-mcp",
    npmUrl: "https://npmjs.com/package/forgekit-figma-mcp",
    features: ["Figma variables", "Design tokens", "Chakra · Tailwind · shadcn"],
  },
  {
    name: "forgekit-storybook-mcp",
    description:
      "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents. Automates story generation, documentation scaffolding, and component testing workflows.",
    npmCmd: "npm install forgekit-storybook-mcp",
    npmUrl: "https://npmjs.com/package/forgekit-storybook-mcp",
    features: ["Storybook metadata", "Story generation", "a11y automation"],
  },
] as const

type ForgekitMcpScreenProps = {
  backHref?: string
}

export function ForgekitMcpScreen({ backHref = "/work" }: ForgekitMcpScreenProps) {
  return (
    <PortfolioLayout activeItem="work">
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <a
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Work
        </a>

        <header className="mb-12">
          <Badge variant="gold" className="mb-6">
            Open Source · MCP
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            ForgeKit <span className="neon-text">MCP</span>
          </h1>
          <p className="text-xl leading-relaxed text-white/50">
            The first MCP servers purpose-built for Figma-to-React design system workflows.
          </p>
        </header>

        <div className="mb-12 grid grid-cols-3 gap-4">
          {[
            { value: "6,200+", label: "npm installs" },
            { value: "2", label: "MCP packages" },
            { value: "4", label: "IDE integrations" },
          ].map((metric) => (
            <GlassPanel key={metric.label} className="rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gold">{metric.value}</p>
              <p className="font-mono text-[10px] text-white/50">{metric.label}</p>
            </GlassPanel>
          ))}
        </div>

        <article className="mb-12 space-y-6">
          <p className="text-lg leading-relaxed text-white/70">
            ForgeKit MCP integrates directly with AI coding assistants like Cursor, Windsurf, and
            Claude Desktop. Instead of screenshot interpretation, the servers return structured
            design-system context — tokens, component trees, and Storybook metadata agents can act
            on.
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            The goal is code that matches your system: typed theme configs and stories grounded in
            real argTypes, not generic Tailwind guesses.
          </p>
        </article>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <GlassPanel key={pkg.name} className="rounded-2xl p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                npm package
              </p>
              <h2 className="mb-3 font-mono text-sm font-medium text-white md:text-base">
                {pkg.name}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-white/60">{pkg.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {pkg.features.map((feature) => (
                  <Tag key={feature}>{feature}</Tag>
                ))}
              </div>
              <p className="mb-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/50">
                $ {pkg.npmCmd}
              </p>
              <a
                href={pkg.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-cyan transition-colors hover:text-white"
              >
                npmjs.com
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="rounded-2xl border-l-4 border-l-cyan p-8">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/50">Also</p>
          <h2 className="mb-3 text-xl font-bold">ForgeKit Core CLI</h2>
          <p className="mb-4 text-sm leading-relaxed text-white/60">
            Scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and
            CI/CD — Figma token sync baked in from day one. Targets Chakra UI, shadcn/ui, Tamagui,
            and React Native.
          </p>
          <a
            href="https://forgekit.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan transition-colors hover:text-white"
          >
            forgekit.cloud
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </GlassPanel>
      </main>
    </PortfolioLayout>
  )
}
