import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { CASE_STUDIES } from "#/features/content/seed-data"
import { CaseStudyDetailPage } from "./case-study-detail-page"

const meta: Meta<typeof CaseStudyDetailPage> = {
  title: "Pages/CaseStudyDetail",
  component: CaseStudyDetailPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyDetailPage>

const nxMonorepo = CASE_STUDIES.find((s) => s.slug === "nx-monorepo")

export const NxMonorepo: Story = {
  args: { caseStudy: nxMonorepo },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Redesign Health Platform Portal",
    )
    await expect(canvas.getByRole("link", { name: /Back to Case Studies/ })).toHaveAttribute(
      "href",
      "/case-studies",
    )
    await expect(canvas.getByText("38")).toBeInTheDocument()
    await expect(canvas.getByText("15+")).toBeInTheDocument()
    await expect(canvas.getByText("180+")).toBeInTheDocument()
    await expect(canvas.getByText("More case studies")).toBeInTheDocument()
    await expect(canvas.getByText("ForgeKit MCP")).toBeInTheDocument()
  },
}
