import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Field, Input } from "./field"

const meta: Meta<typeof Field> = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  args: {
    label: "Name",
    htmlFor: "story-name",
    children: <Input id="story-name" name="name" placeholder="Ada Lovelace" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Name")).toBeInTheDocument()
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    htmlFor: "story-email",
    error: "Enter a valid email",
    children: (
      <Input
        id="story-email"
        name="email"
        type="email"
        error="Enter a valid email"
        defaultValue="nope"
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Enter a valid email")).toBeInTheDocument()
    await expect(canvas.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true")
  },
}
