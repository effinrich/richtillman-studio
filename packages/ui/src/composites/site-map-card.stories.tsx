import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { SiteMapCard } from "./site-map-card"

const meta: Meta<typeof SiteMapCard> = {
  title: "Cards/SiteMapCard",
  component: SiteMapCard,
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
type Story = StoryObj<typeof SiteMapCard>

export const Default: Story = {
  args: {
    link: {
      title: "Work Portfolio",
      href: "/work",
      description: "TokenCast, MCP Atlas, ForgeKit",
      accent: "gold",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Work Portfolio")).toBeInTheDocument()
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/work")
  },
}
