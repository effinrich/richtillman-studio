import { CONTACT_DELIVERY_FAILED } from "@richtillman/ui/contact-copy.ts"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import React from "react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

import { ContactPage } from "./contact-page"

const mockSubmitContactForm = vi.fn()

function renderPage() {
  render(React.createElement(ContactPage, { submitContactForm: mockSubmitContactForm }))
}

function fillAndSubmit(message = "I have a role for you.") {
  fireEvent.change(screen.getByPlaceholderText("Your name"), {
    target: { value: "Ada Lovelace" }
  })
  fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
    target: { value: "ada@example.com" }
  })
  fireEvent.change(screen.getByPlaceholderText("Tell me about the role or project..."), {
    target: { value: message }
  })
  fireEvent.click(screen.getByRole("button", { name: /send message/i }))
}

describe("contact form delivery", () => {
  beforeEach(() => {
    mockSubmitContactForm.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it("shows the success banner when the message is stored", async () => {
    mockSubmitContactForm.mockResolvedValue({ id: 1 })

    renderPage()
    fillAndSubmit()

    expect(await screen.findByText(/message sent/i)).not.toBeNull()
  })

  it("does not claim success when the message cannot be stored", async () => {
    mockSubmitContactForm.mockRejectedValue(new Error("ContactStoreUnavailableError"))

    renderPage()
    fillAndSubmit()

    expect(await screen.findByText(CONTACT_DELIVERY_FAILED)).not.toBeNull()
    expect(screen.queryByText(/message sent/i)).toBeNull()
  })

  it("offers an email fallback that carries the visitor's message", async () => {
    mockSubmitContactForm.mockRejectedValue(new Error("boom"))

    renderPage()
    fillAndSubmit("Please read this message.")

    const fallback = await screen.findByRole("link", { name: /email instead/i })
    const href = fallback.getAttribute("href") ?? ""

    expect(href).toContain("mailto:")
    expect(decodeURIComponent(href)).toContain("Please read this message.")
    expect(decodeURIComponent(href)).toContain("ada@example.com")
  })

  it("never shows a raw error message to the visitor", async () => {
    mockSubmitContactForm.mockRejectedValue(
      new Error("PostgREST: new row violates row-level security policy")
    )

    renderPage()
    fillAndSubmit()

    await screen.findByText(CONTACT_DELIVERY_FAILED)
    expect(screen.queryByText(/row-level security/i)).toBeNull()
  })
})
