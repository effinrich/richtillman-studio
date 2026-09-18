import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiteMapScreen } from "./site-map-screen"
import { SAMPLE_SITE_MAP } from "../fixtures"

const meta: Meta<typeof SiteMapScreen> = {
  title: "Screens/SiteMap",
  component: SiteMapScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof SiteMapScreen>

export const Default: Story = {
  args: { sections: SAMPLE_SITE_MAP },
}
