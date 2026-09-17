import type { ReactNode } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Badge } from "../badge"
import { Button, ButtonAnchor } from "../button"
import { Chip } from "../chip"
import { ProjectCard } from "../composites/project-card"
import { TokenSwatch } from "../composites/token-swatch"
import { Field, Input, Select, Textarea } from "../field"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ProjectCardModel } from "../models"
import { SectionHeader } from "../section-header"
import { Tag } from "../tag"
import { BRAND_TOKENS, SURFACE_TOKENS, TYPE_SPECIMENS } from "./design-tokens"

const JUMP_LINKS = [
  { href: "#color", label: "Color" },
  { href: "#type", label: "Type" },
  { href: "#effects", label: "Effects" },
  { href: "#primitives", label: "Primitives" },
  { href: "#composites", label: "Composites" },
] as const

function DocsSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-52">
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-gold/40" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        </div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-white/50">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Specimen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <GlassPanel className="rounded-2xl p-6 md:p-8">
      <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {title}
      </h3>
      {children}
    </GlassPanel>
  )
}

type DesignSystemScreenProps = {
  specimenProject: ProjectCardModel
  actions: ReactNode
}

export function DesignSystemScreen({ specimenProject, actions }: DesignSystemScreenProps) {
  return (
    <PortfolioLayout activeItem="design-system">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Design System"
          title={
            <>
              The system this site <span className="neon-text">actually</span> ships.
            </>
          }
          description="Tokens and components imported from the same modules as Work, Contact, and Home. Not a parallel library."
        />

        <nav
          aria-label="On this page"
          className="sticky top-20 z-30 -mx-6 mb-20 border-b border-white/5 bg-black/95 px-6 py-3"
        >
          <div className="overflow-x-auto">
            <GlassPanel className="inline-flex w-max gap-2 rounded-full p-2">
              {JUMP_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  <Chip>{link.label}</Chip>
                </a>
              ))}
            </GlassPanel>
          </div>
        </nav>

        <div className="space-y-28">
          <DocsSection
            id="color"
            eyebrow="Foundations"
            title="Color"
            description="Named in @theme. Gold is the only primary action color. Cyan and magenta are accents — never the only way to tell two things apart."
          >
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Brand
            </h3>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BRAND_TOKENS.map((token) => (
                <TokenSwatch key={token.name} token={token} />
              ))}
            </div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Surfaces
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SURFACE_TOKENS.map((token) => (
                <TokenSwatch key={token.name} token={token} />
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-white/40">
              Click a swatch to copy its value.
            </p>
          </DocsSection>

          <DocsSection
            id="type"
            eyebrow="Foundations"
            title="Typography"
            description="Inter for reading. JetBrains Mono for meta: eyebrows, tokens, chips, tags."
          >
            <GlassPanel className="divide-y divide-white/10 overflow-hidden rounded-2xl">
              {TYPE_SPECIMENS.map((specimen) => (
                <div key={specimen.role} className="px-6 py-8 md:px-8">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {specimen.role}
                  </p>
                  <p className={specimen.className}>
                    {specimen.role === "Hero" ? (
                      <>
                        Building the <span className="neon-text">bridge</span>.
                      </>
                    ) : (
                      specimen.sample
                    )}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-white/30">{specimen.spec}</p>
                </div>
              ))}
            </GlassPanel>
          </DocsSection>

          <DocsSection
            id="effects"
            eyebrow="Foundations"
            title="Effects"
            description="Glass, neon rails, and a restrained gold glow. Blur marks a dismissed background or a raised surface — it is not decoration."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <GlassPanel className="rounded-2xl p-8">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  glass-panel
                </p>
                <p className="text-sm text-white/60">
                  16px blur, hairline border, inset highlight.
                </p>
              </GlassPanel>
              <GlassPanel className="rounded-2xl p-8 neon-border-gold">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  neon-border-gold
                </p>
                <p className="text-sm text-white/60">Left rail + gold bloom.</p>
              </GlassPanel>
              <GlassPanel className="rounded-2xl p-8 neon-border-cyan">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  neon-border-cyan
                </p>
                <p className="text-sm text-white/60">Same recipe, cyan rail. Magenta exists too.</p>
              </GlassPanel>
            </div>
          </DocsSection>

          <DocsSection
            id="primitives"
            eyebrow="Primitives"
            title="Controls"
            description="These are the same components Home, Work, and Contact import. If a recipe needed a class string, it is a component now."
          >
            <div className="grid gap-6">
              <Specimen title="Button">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">
                    Primary
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button variant="glass">Glass</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="muted">Muted</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </Specimen>

              <Specimen title="Chip · Badge · Tag">
                <div className="flex flex-wrap items-center gap-3">
                  <Chip dot pulse>
                    Remote
                  </Chip>
                  <Chip>React + TypeScript</Chip>
                  <Chip variant="status" dot pulse>
                    Available
                  </Chip>
                  <Badge variant="gold">Featured</Badge>
                  <Badge variant="cyan">Performance</Badge>
                  <Badge variant="magenta">AI Engineering</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Tag>MCP</Tag>
                  <Tag>Nx</Tag>
                  <Tag>Storybook</Tag>
                </div>
              </Specimen>

              <Specimen title="Field">
                <form className="grid max-w-xl gap-6" onSubmit={(event) => event.preventDefault()}>
                  <Field label="Name" htmlFor="ds-name">
                    <Input
                      id="ds-name"
                      name="name"
                      placeholder="Ada Lovelace"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" htmlFor="ds-email" error="Enter a valid email">
                    <Input
                      id="ds-email"
                      name="email"
                      type="email"
                      defaultValue="not-an-email"
                      error="Enter a valid email"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Project type" htmlFor="ds-type">
                    <Select id="ds-type" name="projectType" defaultValue="Design System">
                      <option>Design System</option>
                      <option>Nx Monorepo</option>
                      <option>MCP / AI Tooling</option>
                    </Select>
                  </Field>
                  <Field label="Message" htmlFor="ds-message">
                    <Textarea
                      id="ds-message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about the work."
                    />
                  </Field>
                  <Button type="submit" variant="primary">
                    Send message
                  </Button>
                </form>
              </Specimen>
            </div>
          </DocsSection>

          <DocsSection
            id="composites"
            eyebrow="Composites"
            title="Page pieces"
            description="SectionHeader, GlassPanel, and ProjectCard are shared across routes. This page renders the live modules — not copies."
          >
            <div className="space-y-8">
              <Specimen title="SectionHeader">
                <SectionHeader
                  className="mb-0 md:mb-0"
                  headingLevel="h2"
                  eyebrow="Selected Work"
                  title={
                    <>
                      Portfolio <span className="neon-text">projects</span>
                    </>
                  }
                  description="TokenCast, ForgeKit MCP, MCP Atlas — tools at the intersection of design systems and AI-native development."
                />
              </Specimen>

              <Specimen title="ProjectCard">
                <div className="max-w-sm">
                  <ProjectCard project={specimenProject} />
                </div>
              </Specimen>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                {actions}
                <ButtonAnchor
                  href="https://forgekit.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="muted"
                >
                  forgekit.cloud
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </ButtonAnchor>
              </div>
            </div>
          </DocsSection>
        </div>
      </main>
    </PortfolioLayout>
  )
}
