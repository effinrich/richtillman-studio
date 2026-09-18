import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { InPageTabs } from "./in-page-tabs"

const meta: Meta<typeof InPageTabs> = {
  title: "Primitives/InPageTabs",
  component: InPageTabs,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="bg-black px-6 pt-24 text-white">
        <Story />
        <section id="color" className="h-40">
          Color
        </section>
        <section id="type" className="h-40">
          Type
        </section>
        <section id="effects" className="h-40">
          Effects
        </section>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof InPageTabs>

export const Default: Story = {
  args: {
    items: [
      { href: "#color", label: "Color" },
      { href: "#type", label: "Type" },
      { href: "#effects", label: "Effects" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "On this page" })).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Color" })).toHaveAttribute("href", "#color")
  },
}
