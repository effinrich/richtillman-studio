import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { HomePage } from "./home-page"

const meta: Meta<typeof HomePage> = {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Building the bridge between design/,
    )
    await expect(canvas.getByRole("link", { name: "See selected work" })).toHaveAttribute(
      "href",
      "/work",
    )
    await expect(canvas.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/contact",
    )
    await expect(canvas.getByText("6,200+")).toBeInTheDocument()
    await expect(canvas.getByText("200+")).toBeInTheDocument()
    await expect(canvas.getByText("500K+")).toBeInTheDocument()
  },
}
