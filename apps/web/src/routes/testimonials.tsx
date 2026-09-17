import { createFileRoute } from "@tanstack/react-router"
import { getTestimonials } from "#/features/content/queries"
import { TestimonialsPage } from "#/features/testimonials/testimonials-page"

export const Route = createFileRoute("/testimonials")({
  loader: () => getTestimonials(),
  component: TestimonialsRoute,
})

function TestimonialsRoute() {
  const testimonials = Route.useLoaderData()
  return <TestimonialsPage testimonials={testimonials} />
}
