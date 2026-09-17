import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { CASE_STUDIES } from "#/features/content/seed-data"
import { CaseStudiesPage } from "./case-studies-page"

const meta: Meta<typeof CaseStudiesPage> = {
  title: "Pages/CaseStudies",
  component: CaseStudiesPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CaseStudiesPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/impact/)
    await Promise.all(
      CASE_STUDIES.map((study) => expect(canvas.getByText(study.title)).toBeInTheDocument()),
    )
    await expect(canvas.getAllByRole("link", { name: "Read case study" })).toHaveLength(
      CASE_STUDIES.length,
    )
  },
}
