import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { GlassPanel } from "./glass-panel"

const meta: Meta<typeof GlassPanel> = {
  title: "UI/GlassPanel",
  component: GlassPanel,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof GlassPanel>

const content = (
  <div className="p-8 text-white">
    <h3 className="mb-2 text-xl font-bold">Glass Panel</h3>
    <p className="text-white/50">Neon portfolio aesthetic component</p>
  </div>
)

export const Default: Story = {
  args: { children: content, className: "rounded-2xl" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Glass Panel")).toBeInTheDocument()
    await expect(canvas.getByText("Neon portfolio aesthetic component")).toBeInTheDocument()
  },
}

export const WithNeonBorder: Story = {
  args: { children: content, className: "rounded-2xl neon-border-gold" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Glass Panel")).toBeInTheDocument()
  },
}

export const HoverGlow: Story = {
  args: {
    children: (
      <div className="p-8 text-white">
        <p>Hover me — border glow on interaction</p>
      </div>
    ),
    className:
      "rounded-2xl transition-all hover:border-gold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText("Hover me — border glow on interaction")
    await expect(text).toBeInTheDocument()
  },
}
