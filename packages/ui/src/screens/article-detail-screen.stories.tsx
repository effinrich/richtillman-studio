import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArticleDetailScreen } from "@richtillman/ui"
import { SAMPLE_ARTICLES } from "../fixtures"

const meta: Meta<typeof ArticleDetailScreen> = {
  title: "Screens/ArticleDetail",
  component: ArticleDetailScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ArticleDetailScreen>

export const Default: Story = {
  args: {
    article: SAMPLE_ARTICLES[0]!,
  },
}
