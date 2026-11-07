import type { Meta, StoryObj } from "@storybook/react-vite"

import { SAMPLE_NPM_DOWNLOADS, SAMPLE_TESTIMONIALS } from "../fixtures"
import { TestimonialsScreen } from "./testimonials-screen"

const meta: Meta<typeof TestimonialsScreen> = {
  title: "Screens/Testimonials",
  component: TestimonialsScreen,
  parameters: { layout: "fullscreen" }
}

export default meta
type Story = StoryObj<typeof TestimonialsScreen>

export const Default: Story = {
  args: { testimonials: SAMPLE_TESTIMONIALS, npmDownloads: SAMPLE_NPM_DOWNLOADS }
}
