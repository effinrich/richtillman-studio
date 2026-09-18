import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { ContactForm } from "@richtillman/ui"

const meta: Meta<typeof ContactForm> = {
  title: "Cards/ContactForm",
  component: ContactForm,
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof ContactForm>

export const Default: Story = {
  args: {
    onSubmit: async () => undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Send message" })).toBeInTheDocument()
    await expect(canvas.getByLabelText("Name")).toBeInTheDocument()
  },
}

export const Filled: Story = {
  args: {
    onSubmit: async () => undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText("Name"), "Ada Lovelace")
    await userEvent.type(canvas.getByLabelText("Email"), "ada@example.com")
    await userEvent.type(canvas.getByLabelText("Message"), "We need a shared Storybook library.")
    await expect(canvas.getByDisplayValue("Ada Lovelace")).toBeInTheDocument()
  },
}
