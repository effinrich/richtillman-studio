import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SiteFooter } from "./site-footer"

const meta: Meta<typeof SiteFooter> = {
  title: "Layout/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SiteFooter>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await Promise.all(
      ["Insights", "Services", "Case Studies", "Testimonials", "FAQ", "Resume", "Site Map"].map(
        (label) => expect(canvas.getByRole("link", { name: label })).toBeInTheDocument(),
      ),
    )
    await expect(canvas.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:hello@richtillman.dev",
    )
    await expect(canvas.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/effinrich",
    )
    await expect(canvas.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/richtillman",
    )
  },
}
