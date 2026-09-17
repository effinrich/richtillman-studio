import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { ARTICLES } from "#/features/content/seed-data"
import { TestRouterProvider } from "#/lib/test-router"
import { ArticleCard } from "./article-card"

afterEach(cleanup)

function seedArticle(slug: string) {
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) throw new Error(`Seed article "${slug}" not found`)
  return article
}

describe("ArticleCard link resolution", () => {
  it("resolves the article link to the slug URL", async () => {
    render(
      <TestRouterProvider>
        <ArticleCard article={seedArticle("the-model-context-protocol")} />
      </TestRouterProvider>,
    )
    const link = await screen.findByRole("link")
    expect(link.getAttribute("href")).toBe("/insights/the-model-context-protocol")
  })

  it("resolves a different slug to its own URL", async () => {
    render(
      <TestRouterProvider>
        <ArticleCard article={seedArticle("architecting-for-100-on-lighthouse")} />
      </TestRouterProvider>,
    )
    const link = await screen.findByRole("link")
    expect(link.getAttribute("href")).toBe("/insights/architecting-for-100-on-lighthouse")
  })
})
