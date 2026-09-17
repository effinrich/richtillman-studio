import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { DesignSystemPage } from "./design-system-page"

const meta: Meta<typeof DesignSystemPage> = {
  title: "Pages/DesignSystem",
  component: DesignSystemPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof DesignSystemPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/actually/)
    await expect(canvas.getByRole("link", { name: "Design System" })).toHaveAttribute(
      "href",
      "/design-system",
    )
    await expect(canvas.getByText("gold")).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Primary" })).toBeInTheDocument()
  },
}
