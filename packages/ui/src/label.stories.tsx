import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    htmlFor: "story-name",
    children: "Name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Name")).toBeInTheDocument()
  },
}
