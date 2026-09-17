import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ARTICLES } from "#/features/content/seed-data"
import { ArticleCard } from "./article-card"

const meta: Meta<typeof ArticleCard> = {
  title: "Cards/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ArticleCard>

export const FeaturedAnalysis: Story = {
  args: { article: ARTICLES.find((a) => a.slug === "the-model-context-protocol") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("The Model Context Protocol: A Frontend Engineer's Guide"),
    ).toBeInTheDocument()
    await expect(canvas.getByText("Featured Analysis")).toBeInTheDocument()
    // The tanstack-react storybook mock renders Link's raw `to` — exact
    // param resolution is asserted in article-card.router.test.tsx.
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/insights/$slug")
  },
}

export const Performance: Story = {
  args: { article: ARTICLES.find((a) => a.slug === "architecting-for-100-on-lighthouse") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Performance")).toBeInTheDocument()
    // The tanstack-react storybook mock renders Link's raw `to` — exact
    // param resolution is asserted in article-card.router.test.tsx.
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/insights/$slug")
  },
}
