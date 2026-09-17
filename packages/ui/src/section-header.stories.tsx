import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SectionHeader } from "./section-header"

const meta: Meta<typeof SectionHeader> = {
  title: "UI/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof SectionHeader>

export const Complete: Story = {
  args: {
    eyebrow: "Selected Work",
    title: (
      <>
        Portfolio <span className="neon-text">projects</span>
      </>
    ),
    description:
      "TokenCast, ForgeKit MCP, MCP Atlas — tools and platforms at the intersection of design systems and AI-native development.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Selected Work")).toBeInTheDocument()
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument()
    await expect(canvas.getByText(/TokenCast, ForgeKit MCP, MCP Atlas/)).toBeInTheDocument()
  },
}

export const TitleOnly: Story = {
  args: { title: "Minimal header" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Minimal header" })).toBeInTheDocument()
  },
}

export const WithDescriptionOnly: Story = {
  args: {
    title: "No eyebrow",
    description: "A section header without the eyebrow rule.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("A section header without the eyebrow rule.")).toBeInTheDocument()
  },
}
