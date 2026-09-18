import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  args: { orientation: "horizontal" },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("separator")).toBeInTheDocument()
  },
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div className="h-16">
        <Story />
      </div>
    ),
  ],
}
