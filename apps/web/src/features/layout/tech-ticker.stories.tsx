import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { TechTicker } from "./tech-ticker"

const meta: Meta<typeof TechTicker> = {
  title: "Layout/TechTicker",
  component: TechTicker,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof TechTicker>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The ticker row is rendered twice for a seamless loop.
    await expect(canvas.getAllByText("Next.js")).toHaveLength(2)
    await expect(canvas.getAllByText("TanStack Start")).toHaveLength(2)
    await expect(canvas.getAllByText("Chromatic")).toHaveLength(2)
  },
}
