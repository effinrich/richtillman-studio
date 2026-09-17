import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { PROJECTS } from "#/features/content/seed-data"
import { TestRouterProvider } from "#/lib/test-router"
import { ProjectCard } from "./project-card"

afterEach(cleanup)

function seedProject(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) throw new Error(`Seed project "${slug}" not found`)
  return project
}

describe("ProjectCard link resolution", () => {
  it("resolves case-study links to the slug URL", async () => {
    render(
      <TestRouterProvider>
        <ProjectCard project={seedProject("nx-monorepo-scale")} />
      </TestRouterProvider>,
    )
    const link = await screen.findByRole("link")
    expect(link.getAttribute("href")).toBe("/case-studies/nx-monorepo")
  })

  it("resolves article links to the slug URL", async () => {
    render(
      <TestRouterProvider>
        <ProjectCard project={seedProject("flagship-mobile")} />
      </TestRouterProvider>,
    )
    const link = await screen.findByRole("link")
    expect(link.getAttribute("href")).toBe("/insights/shipping-react-native-at-scale")
  })
})
