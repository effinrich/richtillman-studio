import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { ContactSuccess } from "@richtillman/ui"

const meta: Meta<typeof ContactSuccess> = {
  title: "Cards/ContactSuccess",
  component: ContactSuccess,
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof ContactSuccess>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/Message sent/)).toBeInTheDocument()
  },
}
