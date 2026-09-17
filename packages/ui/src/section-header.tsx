import type { ReactNode } from "react"
import { cn } from "./cn"

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  className?: string
  headingLevel?: "h1" | "h2"
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  headingLevel = "h1",
}: SectionHeaderProps) {
  const Heading = headingLevel

  return (
    <header className={cn("mb-16 md:mb-24", className)}>
      {eyebrow ? (
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-gold/40" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        </div>
      ) : null}
      <Heading className="mb-8 text-5xl font-bold tracking-tighter md:text-7xl">{title}</Heading>
      {description ? (
        <p className="max-w-2xl text-xl leading-relaxed text-white/50">{description}</p>
      ) : null}
    </header>
  )
}
