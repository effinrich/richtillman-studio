import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, userEvent, within } from "storybook/test"
import { CanvasBackground } from "./canvas-background"

const meta: Meta<typeof CanvasBackground> = {
  title: "Layout/CanvasBackground",
  component: CanvasBackground,
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
}

export default meta
type Story = StoryObj<typeof CanvasBackground>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const backdrop = canvas.getByRole("presentation")
    await expect(backdrop).toBeInTheDocument()
    await userEvent.click(backdrop)
  },
}
