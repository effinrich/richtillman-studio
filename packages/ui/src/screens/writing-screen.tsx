import { ArrowUpRight } from "lucide-react"

import { Badge } from "../badge"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { WritingEntryModel } from "../models"
import { SectionHeader } from "../section-header"

type WritingScreenProps = {
  entries: WritingEntryModel[]
  measuredAt: string
}

/**
 * The writing index. Every entry is a post published on DEV Community, and
 * every entry links out to it: this page is the directory, DEV is the article.
 */
export function WritingScreen({ entries, measuredAt }: WritingScreenProps) {
  return (
    <PortfolioLayout activeItem="writing">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Writing"
          title={
            <>
              Published on <span className="neon-text">DEV Community</span>.
            </>
          }
          description="Long-form writing on design tokens, agent-native developer tooling, and the systems around them. Each post links to DEV, where the discussion lives."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <GlassPanel
              key={entry.id}
              className="flex flex-col rounded-2xl p-6 transition-colors hover:border-gold/30"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] text-white/50">{entry.publishedAt}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-mono text-[10px] text-white/50">{entry.readingTime}</span>
                {entry.reactions > 0 ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="font-mono text-[10px] text-white/50">
                      {entry.reactions} reactions
                    </span>
                  </>
                ) : null}
              </div>

              <h2 className="mb-3 text-xl font-bold text-white">{entry.title}</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/50">{entry.description}</p>

              {entry.tags.length > 0 ? (
                <div className="mb-6 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-[#ffe54c]"
              >
                Read on DEV
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </GlassPanel>
          ))}
        </div>

        <p className="mt-12 font-mono text-[10px] text-white/50">
          Measured from the dev.to API on {measuredAt}.
        </p>
      </main>
    </PortfolioLayout>
  )
}
