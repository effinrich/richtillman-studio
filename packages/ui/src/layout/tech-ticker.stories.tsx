import type { Meta, StoryObj } from "@storybook/react-vite"
import { TechTicker } from "./tech-ticker"

const meta: Meta<typeof TechTicker> = {
  title: "Layout/TechTicker",
  component: TechTicker,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof TechTicker>

export const Default: Story = {}
