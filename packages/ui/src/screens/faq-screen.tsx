import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../cn"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { FaqItemModel } from "../models"
import { SectionHeader } from "../section-header"

type FaqScreenProps = {
  items: FaqItemModel[]
}

export function FaqScreen({ items }: FaqScreenProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <PortfolioLayout activeItem="faq">
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Common <span className="neon-text">questions</span>
            </>
          }
          description="Everything you need to know about working together on design systems, monorepos, and AI-native tooling."
        />

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openId === item.id
            return (
              <GlassPanel
                key={item.id}
                className={`overflow-hidden rounded-2xl stagger-${index + 1}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 font-bold text-white">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-white/40 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-white/5 px-6 pb-6">
                    <p className="pt-4 leading-relaxed text-white/60">{item.answer}</p>
                  </div>
                ) : null}
              </GlassPanel>
            )
          })}
        </div>
      </main>
    </PortfolioLayout>
  )
}
