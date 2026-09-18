import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { ArticleCard } from "./article-card"
import { SAMPLE_ARTICLES } from "../fixtures"

const meta: Meta<typeof ArticleCard> = {
  title: "Cards/ArticleCard",
  component: ArticleCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ArticleCard>

export const Default: Story = {
  args: { article: SAMPLE_ARTICLES[0]! },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("The Model Context Protocol")).toBeInTheDocument()
    await expect(canvas.getByRole("link")).toHaveAttribute(
      "href",
      "/insights/the-model-context-protocol",
    )
  },
}
