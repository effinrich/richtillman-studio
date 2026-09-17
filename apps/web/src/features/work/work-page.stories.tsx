import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { PROJECTS } from "#/features/content/seed-data"
import { WorkPage } from "./work-page"

const meta: Meta<typeof WorkPage> = {
  title: "Pages/Work",
  component: WorkPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof WorkPage>

export const Default: Story = {
  args: { projects: PROJECTS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/Portfolio/)
    await Promise.all(
      PROJECTS.map((project) => expect(canvas.getByText(project.title)).toBeInTheDocument()),
    )
    await expect(canvas.getByRole("link", { name: "Discuss a project" })).toHaveAttribute(
      "href",
      "/contact",
    )
  },
}

export const Empty: Story = {
  args: { projects: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/Portfolio/)
    await expect(canvas.queryByText("ForgeKit MCP")).not.toBeInTheDocument()
  },
}
