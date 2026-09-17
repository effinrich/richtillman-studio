import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ForgekitMcpPage } from "./forgekit-mcp-page"

const meta: Meta<typeof ForgekitMcpPage> = {
  title: "Pages/ForgeKitMcp",
  component: ForgekitMcpPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ForgekitMcpPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/ForgeKit/)
    await expect(canvas.getByRole("link", { name: /Back to Work/ })).toHaveAttribute(
      "href",
      "/work",
    )
    await expect(canvas.getByText("6,200+")).toBeInTheDocument()
    await expect(canvas.getByText("200+")).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "forgekit.cloud" })).toHaveAttribute(
      "href",
      "https://forgekit.cloud",
    )
  },
}
