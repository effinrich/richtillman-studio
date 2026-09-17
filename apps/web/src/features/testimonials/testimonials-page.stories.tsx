import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import type { Testimonial } from "#/features/content/seed-data"
import { TestimonialsPage } from "./testimonials-page"

const meta: Meta<typeof TestimonialsPage> = {
  title: "Pages/Testimonials",
  component: TestimonialsPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof TestimonialsPage>

const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Rich's design system work made our 8 teams ship faster than ever.",
    author: "Jane Doe",
    role: "VP Engineering",
    company: "Acme",
  },
  {
    id: "2",
    quote: "The Nx monorepo migration he led cut our CI time by 65%.",
    author: "John Smith",
    role: "Staff Engineer",
    company: "Globex",
  },
]

export const WithQuotes: Story = {
  args: { testimonials: sampleTestimonials },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/Rich's design system work/)).toBeInTheDocument()
    await expect(canvas.getByText("Jane Doe")).toBeInTheDocument()
    await expect(canvas.getByText("VP Engineering · Acme")).toBeInTheDocument()
    await expect(canvas.getByText("50+")).toBeInTheDocument()
  },
}

export const Empty: Story = {
  args: { testimonials: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Quotes from recent collaborators are on the way."),
    ).toBeInTheDocument()
  },
}
