import { TestimonialsScreen } from "@richtillman/ui"
import type { NpmDownloadsModel } from "@richtillman/ui"

import type { Testimonial } from "#/features/content/seed-data"

type TestimonialsPageProps = {
  testimonials: Testimonial[]
  npmDownloads: NpmDownloadsModel
}

export function TestimonialsPage({ testimonials, npmDownloads }: TestimonialsPageProps) {
  return <TestimonialsScreen testimonials={testimonials} npmDownloads={npmDownloads} />
}
