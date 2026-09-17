import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SiteFooter } from "./site-footer"

const meta: Meta<typeof SiteFooter> = {
  title: "Layout/SiteFooter",
  component: SiteFooter,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof SiteFooter>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:hello@richtillman.dev",
    )
  },
}
