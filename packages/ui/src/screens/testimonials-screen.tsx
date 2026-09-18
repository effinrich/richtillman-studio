import { Quote } from "lucide-react"
import { GlassPanel } from "../glass-panel"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { Metric } from "../models"
import { SectionHeader } from "../section-header"
import type { TestimonialModel } from "../models"
import type { TestimonialsScreenProps } from "./types"

const SOCIAL_PROOF: Metric[] = [
  { value: "50+", label: "Teams advised" },
  { value: "500K+", label: "Users shipped to" },
  { value: "98%", label: "Visual test coverage" },
  { value: "10+", label: "Years shipping React" }
]

export type TestimonialScreenProps = {
  testimonials: TestimonialModel[]
}

export function TestimonialsScreen({ testimonials }: TestimonialsScreenProps) {
  return (
    <PortfolioLayout activeItem="testimonials">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              Trusted by <span className="neon-text">teams</span>
            </>
          }
          description="What engineering leaders and design system practitioners say about working together."
        />

        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {SOCIAL_PROOF.map((stat, index) => (
            <GlassPanel
              key={stat.label}
              className={`rounded-2xl p-6 text-center stagger-${index + 1}`}
            >
              <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {stat.value}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {stat.label}
              </p>
            </GlassPanel>
          ))}
        </div>

        {testimonials.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <GlassPanel
                key={testimonial.id}
                className={`rounded-2xl p-8 stagger-${Math.min(index + 1, 6)}`}
              >
                <Quote className="mb-4 h-8 w-8 text-gold/40" />
                <blockquote className="mb-6 text-lg leading-relaxed text-white/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/40">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </GlassPanel>
            ))}
          </div>
        ) : (
          <GlassPanel className="rounded-2xl p-12 text-center">
            <Quote className="mx-auto mb-4 h-8 w-8 text-white/20" />
            <p className="text-white/50">Quotes from recent collaborators are on the way.</p>
          </GlassPanel>
        )}
      </main>
    </PortfolioLayout>
  )
}
