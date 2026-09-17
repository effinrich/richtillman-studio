import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, userEvent, within } from "storybook/test"
// Relative import on purpose: the `#/features/layout/canvas-background` specifier
// is aliased to a deterministic stub in Storybook, but this story documents the
// real (CDN-backed) component.
import { CanvasBackground } from "./canvas-background"

const meta: Meta<typeof CanvasBackground> = {
  title: "Layout/CanvasBackground",
  component: CanvasBackground,
  parameters: {
    layout: "fullscreen",
    // The real Three.js tubes scene is animated and CDN-backed, so it is not a
    // stable Chromatic snapshot target. Interaction coverage lives here instead.
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
    // Clicking the backdrop randomizes the tube colors; with no app initialized
    // it must not throw.
    await userEvent.click(backdrop)
  },
}
