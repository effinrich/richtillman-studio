import type { Meta, StoryObj } from "@storybook/react-vite"
import { ServicesScreen } from "./services-screen"
import { SAMPLE_SERVICES } from "../fixtures"

const meta: Meta<typeof ServicesScreen> = {
  title: "Screens/Services",
  component: ServicesScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ServicesScreen>

export const Default: Story = {
  args: { services: SAMPLE_SERVICES },
}
