import type { Meta, StoryObj } from "@storybook/react-vite"
import { ForgekitMcpScreen } from "@richtillman/ui"

const meta: Meta<typeof ForgekitMcpScreen> = {
  title: "Screens/ForgekitMcp",
  component: ForgekitMcpScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ForgekitMcpScreen>

export const Default: Story = {}
