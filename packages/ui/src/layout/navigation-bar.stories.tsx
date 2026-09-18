import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { NavigationBar } from "./navigation-bar"

const meta: Meta<typeof NavigationBar> = {
  title: "Layout/NavigationBar",
  component: NavigationBar,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof NavigationBar>

export const Home: Story = {
  args: { activeItem: "home", isAvailable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: /Rich Tillman/ })).toHaveAttribute("href", "/")
    await Promise.all(
      ["Work", "Stack", "Design System", "Resume", "Contact"].map((label) =>
        expect(canvas.getByRole("link", { name: label })).toBeInTheDocument(),
      ),
    )
    await expect(canvas.getByText("Available")).toBeInTheDocument()
  },
}

export const Unavailable: Story = {
  args: { activeItem: "contact", isAvailable: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Available")).not.toBeInTheDocument()
  },
}
