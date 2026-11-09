import { CONTACT_HONEYPOT_FIELD } from "@richtillman/ui/composites/contact-honeypot.ts"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  recordedStatements,
  resetCloudflareStub,
  restoreCloudflareStub
} from "../../../test/cloudflare-workers"
import {
  ContactSubmissionRejectedError,
  handleContactSubmission
} from "../content/queries/contact-handler"
import { ContactPage } from "./contact-page"

const mockSubmitContactForm = vi.fn()

const message = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  projectType: "Full-time role",
  message: "I have a role for you."
}

function honeypotField(): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(`input[name="${CONTACT_HONEYPOT_FIELD}"]`)
}

function renderPage() {
  render(React.createElement(ContactPage, { submitContactForm: mockSubmitContactForm }))
}

function fillRealFields() {
  fireEvent.change(screen.getByPlaceholderText("Your name"), {
    target: { value: message.name }
  })
  fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
    target: { value: message.email }
  })
  fireEvent.change(screen.getByPlaceholderText("Tell me about the role or project..."), {
    target: { value: message.message }
  })
}

describe("the contact form honeypot", () => {
  beforeEach(() => {
    mockSubmitContactForm.mockReset()
    mockSubmitContactForm.mockResolvedValue({ id: 1 })
    resetCloudflareStub()
    restoreCloudflareStub()
  })

  afterEach(() => {
    cleanup()
  })

  it("renders a text field that a visitor can neither see nor reach", () => {
    renderPage()

    const field = honeypotField()

    expect(field).not.toBeNull()
    expect(field?.type).toBe("text")
    expect(field?.tabIndex).toBe(-1)
    expect(field?.closest("[aria-hidden='true']")).not.toBeNull()
    // A bot skips a hidden, disabled or read-only input, so the field has to
    // be an ordinary text input that accepts a value.
    expect(field?.hasAttribute("hidden")).toBe(false)
    expect(field?.disabled).toBe(false)
    expect(field?.readOnly).toBe(false)
  })

  it("sends the honeypot value with the submission so the server can see it", async () => {
    renderPage()
    fillRealFields()

    const field = honeypotField()
    expect(field).not.toBeNull()
    fireEvent.change(field!, { target: { value: "https://spam.example" } })

    fireEvent.click(screen.getByRole("button", { name: /send message/i }))

    await screen.findByText(/message sent/i)
    expect(mockSubmitContactForm).toHaveBeenCalledWith(
      expect.objectContaining({ companyWebsite: "https://spam.example" })
    )
  })

  it("refuses a submission that filled the honeypot and writes nothing", async () => {
    await expect(
      handleContactSubmission({ ...message, companyWebsite: "https://spam.example" })
    ).rejects.toBeInstanceOf(ContactSubmissionRejectedError)

    expect(recordedStatements).toHaveLength(0)
  })

  it("refuses a honeypot that holds only whitespace", async () => {
    await expect(
      handleContactSubmission({ ...message, companyWebsite: " " })
    ).rejects.toBeInstanceOf(ContactSubmissionRejectedError)

    expect(recordedStatements).toHaveLength(0)
  })

  it("stores the message when the honeypot is empty", async () => {
    await handleContactSubmission({ ...message, companyWebsite: "" })

    expect(recordedStatements).toHaveLength(1)
    expect(recordedStatements[0]?.query).toContain("insert into contact_messages")
  })

  it("stores the message when the honeypot is absent", async () => {
    await handleContactSubmission({ ...message })

    expect(recordedStatements).toHaveLength(1)
  })
})
