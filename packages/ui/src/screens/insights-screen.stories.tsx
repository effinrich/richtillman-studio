import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonAnchor } from "../button"
import { SAMPLE_ARTICLES } from "../fixtures"
import { InsightsScreen } from "./insights-screen"

const meta: Meta<typeof InsightsScreen> = {
  title: "Screens/Insights",
  component: InsightsScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof InsightsScreen>

export const Default: Story = {
  args: {
    articles: SAMPLE_ARTICLES,
    featuredCta: (
      <ButtonAnchor href={SAMPLE_ARTICLES[0]?.href ?? "/insights"} variant="primary">
        Read article
      </ButtonAnchor>
    ),
  },
}
