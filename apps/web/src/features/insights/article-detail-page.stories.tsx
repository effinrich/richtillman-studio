import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ARTICLES } from "#/features/content/seed-data"
import { ArticleDetailPage } from "./article-detail-page"

const meta: Meta<typeof ArticleDetailPage> = {
  title: "Pages/ArticleDetail",
  component: ArticleDetailPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ArticleDetailPage>

const article = ARTICLES.find((a) => a.slug === "the-model-context-protocol")

export const ModelContextProtocol: Story = {
  args: { article },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The Model Context Protocol: A Frontend Engineer's Guide",
    )
    await expect(canvas.getByRole("link", { name: /Back to Insights/ })).toHaveAttribute(
      "href",
      "/insights",
    )
    await expect(
      canvas.getByText(/The Model Context Protocol \(MCP\) represents/),
    ).toBeInTheDocument()
    await expect(canvas.getByText("Key Takeaway")).toBeInTheDocument()
    await expect(canvas.getByText(article?.excerpt ?? "")).toBeInTheDocument()
  },
}
