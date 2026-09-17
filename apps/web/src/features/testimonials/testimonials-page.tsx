import { TestimonialsScreen } from "@richtillman/ui"
import type { Testimonial } from "#/features/content/seed-data"

type TestimonialsPageProps = {
  testimonials: Testimonial[]
}

export function TestimonialsPage({ testimonials }: TestimonialsPageProps) {
  return <TestimonialsScreen testimonials={testimonials} />
}
