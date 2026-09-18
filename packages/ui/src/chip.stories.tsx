import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Chip } from "./chip"

const meta: Meta<typeof Chip> = {
  title: "Primitives/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: { children: "React + TypeScript" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("React + TypeScript")).toBeInTheDocument()
  },
}

export const WithDot: Story = {
  args: { children: "Remote", dot: true, pulse: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Remote")).toBeInTheDocument()
  },
}

export const Status: Story = {
  args: { children: "Available", variant: "status", dot: true, pulse: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Available")).toBeInTheDocument()
  },
}
