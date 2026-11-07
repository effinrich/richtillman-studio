import type { Meta, StoryObj } from "@storybook/react-vite"

import { SAMPLE_NPM_DOWNLOADS } from "../fixtures"
import { ForgekitMcpScreen } from "./forgekit-mcp-screen"

const meta: Meta<typeof ForgekitMcpScreen> = {
  title: "Screens/ForgekitMcp",
  component: ForgekitMcpScreen,
  parameters: { layout: "fullscreen" }
}

export default meta
type Story = StoryObj<typeof ForgekitMcpScreen>

export const Default: Story = {
  args: { npmDownloads: SAMPLE_NPM_DOWNLOADS }
}
