import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SiteMapCard } from "./site-map-card"

const meta: Meta<typeof SiteMapCard> = {
  title: "Cards/SiteMapCard",
  component: SiteMapCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SiteMapCard>

export const Gold: Story = {
  args: {
    link: {
      title: "Work Portfolio",
      to: "/work",
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

export const Cyan: Story = {
  args: {
    link: {
      title: "Case Studies Hub",
      to: "/case-studies",
      description: "Architecture impact stories",
      accent: "cyan",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/case-studies")
  },
}

export const MagentaWithParams: Story = {
  args: {
    link: {
      title: "Model Context Protocol",
      to: "/insights",
      params: { slug: "the-model-context-protocol" },
      description: "Featured analysis",
      accent: "magenta",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The tanstack-react storybook mock renders Link's raw `to` — exact
    // param resolution is asserted in site-map-card.router.test.tsx.
    await expect(canvas.getByRole("link")).toHaveAttribute("href", "/insights/$slug")
  },
}
