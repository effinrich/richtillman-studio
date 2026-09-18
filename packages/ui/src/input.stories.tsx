import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Input } from "@richtillman/ui"

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    id: "story-input",
    name: "name",
    placeholder: "Ada Lovelace",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByPlaceholderText("Ada Lovelace")).toBeInTheDocument()
  },
}

export const Filled: Story = {
  args: {
    id: "story-input-filled",
    name: "name",
    defaultValue: "Ada Lovelace",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByDisplayValue("Ada Lovelace")).toBeInTheDocument()
  },
}

export const WithError: Story = {
  args: {
    id: "story-input-error",
    name: "email",
    type: "email",
    defaultValue: "nope",
    error: "Enter a valid email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByDisplayValue("nope")).toHaveAttribute("aria-invalid", "true")
  },
}
