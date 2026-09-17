import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { ContactScreen } from "./contact-screen"

const meta: Meta<typeof ContactScreen> = {
  title: "Screens/Contact",
  component: ContactScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ContactScreen>

export const Default: Story = {
  args: {
    onSubmit: async () => undefined,
  },
}
