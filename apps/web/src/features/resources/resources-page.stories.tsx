import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ResourcesPage } from "./resources-page"

const meta: Meta<typeof ResourcesPage> = {
  title: "Pages/Resources",
  component: ResourcesPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ResourcesPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/stack/)
    await expect(canvas.getByText("Design System Starter Kit")).toBeInTheDocument()
    await expect(canvas.getByText("Nx Monorepo Architecture Guide")).toBeInTheDocument()
    await expect(
      canvas.getByRole("link", { name: /ForgeKit MCP \(opens in new tab\)/ }),
    ).toHaveAttribute("href", "https://forgekit.cloud")
  },
}
