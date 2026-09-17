import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SiteMapPage } from "./site-map-page"

const meta: Meta<typeof SiteMapPage> = {
  title: "Pages/SiteMap",
  component: SiteMapPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SiteMapPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/Atlas/)
    await Promise.all(
      [
        "01 — Core Experience",
        "02 — Engineering Showcase",
        "03 — Trust & Credentials",
        "04 — Knowledge Base",
      ].map((section) => expect(canvas.getByText(section)).toBeInTheDocument()),
    )
    await expect(canvas.getByRole("link", { name: /Work Portfolio/ })).toHaveAttribute(
      "href",
      "/work",
    )
    // The tanstack-react storybook mock renders Link's raw `to` — exact
    // param resolution is asserted in site-map-card.router.test.tsx.
    await expect(canvas.getByRole("link", { name: /Model Context Protocol/ })).toHaveAttribute(
      "href",
      "/insights/$slug",
    )
  },
}
