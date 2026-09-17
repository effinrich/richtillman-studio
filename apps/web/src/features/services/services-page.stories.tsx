import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { SERVICES } from "#/features/content/seed-data"
import { ServicesPage } from "./services-page"

const meta: Meta<typeof ServicesPage> = {
  title: "Pages/Services",
  component: ServicesPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ServicesPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/build/)
    await Promise.all(
      SERVICES.map((service) => expect(canvas.getByText(service.title)).toBeInTheDocument()),
    )
    await Promise.all(
      ["Hourly Consulting", "Project-Based", "Retainer", "Code Review Sessions"].map((model) =>
        expect(canvas.getByText(model)).toBeInTheDocument(),
      ),
    )
  },
}
