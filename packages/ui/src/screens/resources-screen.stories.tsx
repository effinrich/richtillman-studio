import type { Meta, StoryObj } from "@storybook/react-vite"
import { ResourcesScreen } from "@richtillman/ui"
import { SAMPLE_RESOURCES } from "../fixtures"

const meta: Meta<typeof ResourcesScreen> = {
  title: "Screens/Resources",
  component: ResourcesScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ResourcesScreen>

export const Default: Story = {
  args: { resources: SAMPLE_RESOURCES },
}
