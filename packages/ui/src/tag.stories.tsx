import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Tag } from "./tag"

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: { children: "MCP" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("MCP")).toBeInTheDocument()
  },
}
