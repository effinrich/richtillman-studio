import type { Meta, StoryObj } from "@storybook/react-vite"
import { TestimonialsScreen } from "@richtillman/ui"
import { SAMPLE_TESTIMONIALS } from "../fixtures"

const meta: Meta<typeof TestimonialsScreen> = {
  title: "Screens/Testimonials",
  component: TestimonialsScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof TestimonialsScreen>

export const Default: Story = {
  args: { testimonials: SAMPLE_TESTIMONIALS },
}
