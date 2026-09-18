import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { SAMPLE_PROJECTS } from "../fixtures"
import { ProjectCard } from "./project-card"

const meta: Meta<typeof ProjectCard> = {
  title: "Cards/ProjectCard",
  component: ProjectCard,
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
type Story = StoryObj<typeof ProjectCard>

export const InternalProject: Story = {
  args: { project: SAMPLE_PROJECTS.find((p) => p.slug === "forgekit-mcp") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("ForgeKit MCP")).toBeInTheDocument()
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/projects/forgekit-mcp")
  },
}

export const CaseStudy: Story = {
  args: { project: SAMPLE_PROJECTS.find((p) => p.slug === "nx-monorepo-scale") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Case Study")).toBeInTheDocument()
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/case-studies/nx-monorepo")
  },
}

export const ExternalLink: Story = {
  args: { project: SAMPLE_PROJECTS.find((p) => p.slug === "tokencast") },
}

export const WithoutImage: Story = {
  args: { project: SAMPLE_PROJECTS.find((p) => p.slug === "storybook-system") },
}
