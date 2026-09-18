import type { Meta, StoryObj } from "@storybook/react-vite"
import { FaqScreen } from "@richtillman/ui"
import { SAMPLE_FAQ } from "../fixtures"

const meta: Meta<typeof FaqScreen> = {
  title: "Screens/Faq",
  component: FaqScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof FaqScreen>

export const Default: Story = {
  args: { items: SAMPLE_FAQ },
}
