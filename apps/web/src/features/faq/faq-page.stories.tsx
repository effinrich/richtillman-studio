import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, userEvent, within } from "storybook/test"
import { FaqPage } from "./faq-page"

const meta: Meta<typeof FaqPage> = {
  title: "Pages/Faq",
  component: FaqPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof FaqPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/questions/)

    // First question is open by default.
    await expect(
      canvas.getByText(/Principal Frontend Engineer with 10\+ years/),
    ).toBeInTheDocument()

    // Opening another question closes the previous one.
    await userEvent.click(
      canvas.getByRole("button", {
        name: "What makes you different from other React engineers?",
      }),
    )
    await expect(canvas.getByText(/I operate at the intersection/)).toBeInTheDocument()
    await expect(
      canvas.queryByText(/Principal Frontend Engineer with 10\+ years/),
    ).not.toBeInTheDocument()
  },
}
