import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { NavigationBar } from "./navigation-bar"

const meta: Meta<typeof NavigationBar> = {
  title: "Layout/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
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
    await expect(canvas.queryByRole("link", { name: "Projects" })).not.toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume")
    await expect(canvas.getByText("Available")).toBeInTheDocument()
  },
}

export const Work: Story = {
  args: { activeItem: "work", isAvailable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work")
  },
}

export const Unavailable: Story = {
  args: { activeItem: "contact", isAvailable: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Available")).not.toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact")
  },
}
