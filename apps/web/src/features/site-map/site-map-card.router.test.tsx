import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { TestRouterProvider } from "#/lib/test-router"
import { SiteMapCard } from "./site-map-card"
import type { SiteMapLink } from "./site-map-card"

afterEach(cleanup)

describe("SiteMapCard link resolution", () => {
  it("resolves param links to the slug URL", async () => {
    const link: SiteMapLink = {
      title: "Model Context Protocol",
      to: "/insights",
      params: { slug: "the-model-context-protocol" },
      description: "Featured analysis",
      accent: "magenta",
    }
    render(
      <TestRouterProvider>
        <SiteMapCard link={link} />
      </TestRouterProvider>,
    )
    const anchor = await screen.findByRole("link")
    expect(anchor.getAttribute("href")).toBe("/insights/the-model-context-protocol")
  })

  it("renders plain links as-is", async () => {
    const link: SiteMapLink = {
      title: "Work Portfolio",
      to: "/work",
      description: "TokenCast, MCP Atlas, ForgeKit",
      accent: "gold",
    }
    render(
      <TestRouterProvider>
        <SiteMapCard link={link} />
      </TestRouterProvider>,
    )
    const anchor = await screen.findByRole("link")
    expect(anchor.getAttribute("href")).toBe("/work")
  })
})
