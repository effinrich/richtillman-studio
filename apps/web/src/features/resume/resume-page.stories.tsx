import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, within } from "storybook/test"
import { ResumePage } from "./resume-page"

const meta: Meta<typeof ResumePage> = {
  title: "Pages/Resume",
  component: ResumePage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ResumePage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/Rich/)
    await expect(canvas.getByRole("link", { name: /Download PDF/ })).toHaveAttribute(
      "href",
      "/resume/rich-tillman.pdf",
    )
    await expect(
      canvas.getByText(/Principal Frontend Engineer with 15\+ years/),
    ).toBeInTheDocument()
    await Promise.all(
      // Job titles also appear in the nav tagline / hero copy — match the h3 headings.
      ["Principal Frontend Engineer", "Staff Frontend Engineer", "Senior Frontend Engineer"].map(
        (title) => expect(canvas.getByRole("heading", { name: title })).toBeInTheDocument(),
      ),
    )
    await expect(canvas.getByText("React 19 / TypeScript")).toBeInTheDocument()
  },
}
