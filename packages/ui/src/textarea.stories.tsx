import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Textarea } from "./field"

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    id: "story-message",
    name: "message",
    rows: 5,
    placeholder: "Tell me about your project...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByPlaceholderText("Tell me about your project...")).toBeInTheDocument()
  },
}

export const Filled: Story = {
  args: {
    id: "story-message-filled",
    name: "message",
    rows: 5,
    defaultValue: "We need a design system for three product teams.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByDisplayValue("We need a design system for three product teams."),
    ).toBeInTheDocument()
  },
}

export const WithError: Story = {
  args: {
    id: "story-message-error",
    name: "message",
    rows: 5,
    error: "Message is required",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  },
}
