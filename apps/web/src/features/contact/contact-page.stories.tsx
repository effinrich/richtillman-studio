import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { expect, fireEvent, userEvent, within } from "storybook/test"
import { ContactPage } from "./contact-page"

const meta: Meta<typeof ContactPage> = {
  title: "Pages/Contact",
  component: ContactPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ContactPage>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(/build/)
    await expect(canvas.getByLabelText("Name")).toBeInTheDocument()
    // The mailto icon link in the sidebar is also labeled "Email" — target the input.
    await expect(canvas.getByLabelText("Email", { selector: "input" })).toBeInTheDocument()
    await expect(canvas.getByLabelText("Message")).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Send message" })).toBeInTheDocument()
  },
}

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const submitButton = canvas.getByRole("button", { name: "Send message" })
    // In a real browser the native `required` constraint blocks the submit
    // event on empty fields, so dispatch the submit event directly to test
    // the React validation path.
    const form = submitButton.closest("form")
    if (!form) throw new Error("Contact form not found")
    fireEvent.submit(form)
    await expect(await canvas.findByText("Name is required")).toBeInTheDocument()
    await expect(await canvas.findByText("Email is required")).toBeInTheDocument()
    await expect(await canvas.findByText("Message is required")).toBeInTheDocument()
  },
}

export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText("Email", { selector: "input" }), "not-an-email")
    await userEvent.tab()
    await expect(await canvas.findByText("Enter a valid email")).toBeInTheDocument()
  },
}

export const SuccessfulSubmit: Story = {
  args: {
    submitContactForm: async () => ({ success: true, id: "story-test" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText("Name"), "Ada Lovelace")
    await userEvent.type(canvas.getByLabelText("Email", { selector: "input" }), "ada@example.com")
    await userEvent.selectOptions(canvas.getByLabelText("Project Type"), "Advisory")
    await userEvent.type(canvas.getByLabelText("Message"), "Design system engagement")
    await userEvent.click(canvas.getByRole("button", { name: "Send message" }))
    await expect(await canvas.findByText(/Message sent/)).toBeInTheDocument()
  },
}
