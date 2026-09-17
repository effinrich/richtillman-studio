import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ARTICLES } from "#/features/content/seed-data"
import { InsightsPage } from "./insights-page"

const meta: Meta<typeof InsightsPage> = {
  title: "Pages/Insights",
  component: InsightsPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof InsightsPage>

export const WithFeatured: Story = {
  args: { articles: ARTICLES },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/signal/)
    await expect(canvas.getByText("Featured")).toBeInTheDocument()
    await expect(
      canvas.getByText("The Model Context Protocol: A Frontend Engineer's Guide"),
    ).toBeInTheDocument()
    // The tanstack-react storybook mock renders Link's raw `to` — exact
    // param resolution is asserted in article-card.router.test.tsx.
    await expect(canvas.getByRole("link", { name: "Read article" })).toHaveAttribute(
      "href",
      "/insights/$slug",
    )
    await expect(
      canvas.getByText("Architecting for 100 on Lighthouse: The Airbnb Playbook"),
    ).toBeInTheDocument()
  },
}

export const WithoutFeatured: Story = {
  args: { articles: ARTICLES.filter((a) => !a.featured) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Featured")).not.toBeInTheDocument()
    await expect(canvas.queryByRole("link", { name: "Read article" })).not.toBeInTheDocument()
  },
}
