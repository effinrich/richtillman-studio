import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Gold: Story = {
  args: { children: "Featured Analysis", variant: "gold" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Featured Analysis")).toBeInTheDocument()
  },
}

export const Cyan: Story = {
  args: { children: "Performance", variant: "cyan" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Performance")).toBeInTheDocument()
  },
}

export const Magenta: Story = {
  args: { children: "AI Engineering", variant: "magenta" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("AI Engineering")).toBeInTheDocument()
  },
}

export const Neutral: Story = {
  args: { children: "Default variant", variant: "neutral" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Default variant")).toBeInTheDocument()
  },
}

export const LongContent: Story = {
  args: {
    children: "Design Systems · Nx Monorepos · AI-Native Tooling",
    variant: "gold",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Design Systems · Nx Monorepos · AI-Native Tooling"),
    ).toBeInTheDocument()
  },
}
