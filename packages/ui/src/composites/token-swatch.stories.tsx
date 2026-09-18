import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { TokenSwatch } from "./token-swatch"

const meta: Meta<typeof TokenSwatch> = {
  title: "Cards/TokenSwatch",
  component: TokenSwatch,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[240px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TokenSwatch>

export const Default: Story = {
  args: {
    token: {
      name: "gold",
      cssVar: "--color-gold",
      value: "#ffd700",
      usage: "Primary CTA, eyebrows, availability, focus ring",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: /Copy gold token/ })).toBeInTheDocument()
    await expect(canvas.getByText("#ffd700")).toBeInTheDocument()
  },
}
