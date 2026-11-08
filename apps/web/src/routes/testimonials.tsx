import { createFileRoute } from "@tanstack/react-router"

import { getNpmDownloadsSnapshot } from "#/features/content/queries/npm-downloads"
import { getTestimonials } from "#/features/content/queries/testimonials"
import { TestimonialsPage } from "#/features/testimonials/testimonials-page"

export const Route = createFileRoute("/testimonials")({
  loader: async () => {
    const [testimonials, npmDownloads] = await Promise.all([
      getTestimonials(),
      getNpmDownloadsSnapshot()
    ])

    return { testimonials, npmDownloads }
  },
  component: TestimonialsRoute
})

function TestimonialsRoute() {
  const { testimonials, npmDownloads } = Route.useLoaderData()
  return <TestimonialsPage testimonials={testimonials} npmDownloads={npmDownloads} />
}
