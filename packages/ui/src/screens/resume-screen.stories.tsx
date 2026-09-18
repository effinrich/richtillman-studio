import type { Meta, StoryObj } from "@storybook/react-vite"
import { ResumeScreen } from "@richtillman/ui"
import { SAMPLE_RESUME } from "../fixtures"

const meta: Meta<typeof ResumeScreen> = {
  title: "Screens/Resume",
  component: ResumeScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ResumeScreen>

export const Default: Story = {
  args: { resume: SAMPLE_RESUME },
}
