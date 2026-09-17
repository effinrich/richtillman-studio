import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { ButtonAnchor } from "../button"
import { SAMPLE_METRICS } from "../fixtures"
import { HomeScreen } from "./home-screen"

const meta: Meta<typeof HomeScreen> = {
  title: "Screens/Home",
  component: HomeScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof HomeScreen>

export const Default: Story = {
  args: {
    metrics: SAMPLE_METRICS,
    actions: (
      <>
        <ButtonAnchor href="/work" variant="primary" fullWidth>
          See selected work
        </ButtonAnchor>
        <ButtonAnchor href="/contact" variant="glass" fullWidth>
          Get in touch
        </ButtonAnchor>
      </>
    ),
  },
}
