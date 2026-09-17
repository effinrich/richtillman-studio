import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: "See selected work", variant: "primary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "See selected work" })).toBeInTheDocument()
  },
}

export const Glass: Story = {
  args: { children: "Get in touch", variant: "glass" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Get in touch" })).toBeInTheDocument()
  },
}

export const Outline: Story = {
  args: { children: "Discuss a project", variant: "outline" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Discuss a project" })).toBeInTheDocument()
  },
}

export const Disabled: Story = {
  args: { children: "Sending...", variant: "primary", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Sending..." })).toBeDisabled()
  },
}
