import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { ContactInfo } from "@richtillman/ui"

const meta: Meta<typeof ContactInfo> = {
  title: "Cards/ContactInfo",
  component: ContactInfo,
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof ContactInfo>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "hello@richtillman.dev" })).toBeInTheDocument()
    await expect(canvas.getByText("Remote · US Eastern Time")).toBeInTheDocument()
  },
}
