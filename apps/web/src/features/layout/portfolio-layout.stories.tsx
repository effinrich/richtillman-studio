import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { PortfolioLayout } from "./portfolio-layout"

const meta: Meta<typeof PortfolioLayout> = {
  title: "Layout/PortfolioLayout",
  component: PortfolioLayout,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof PortfolioLayout>

const sampleChildren = (
  <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
    <h1 className="text-4xl font-bold text-white">Layout fixture</h1>
  </main>
)

export const WithTicker: Story = {
  args: {
    children: sampleChildren,
    activeItem: "home",
    showTicker: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Layout fixture" })).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: /Rich Tillman/ })).toBeInTheDocument()
    // Ticker renders its row twice; assert one of its items is present.
    await expect(canvas.getAllByText("Next.js")).toHaveLength(2)
  },
}

export const WithoutTicker: Story = {
  args: {
    children: sampleChildren,
    activeItem: "work",
    showTicker: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Next.js")).not.toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Work" })).toBeInTheDocument()
  },
}
