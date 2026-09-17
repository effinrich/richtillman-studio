import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import React from "react"
import { ContactPage } from "./contact-page"
import { isValidEmail, isNonEmpty, validateField } from "@richtillman/ui"

const mockSubmitContactForm = vi.fn()

describe("contact form validation", () => {
  describe("isValidEmail", () => {
    it("rejects empty email", () => {
      expect(isValidEmail("")).toBe(false)
    })

    it("rejects email without @", () => {
      expect(isValidEmail("userexample.com")).toBe(false)
    })

    it("rejects email without domain", () => {
      expect(isValidEmail("user@")).toBe(false)
    })

    it("rejects email without top-level domain", () => {
      expect(isValidEmail("user@example")).toBe(false)
    })

    it("accepts valid email", () => {
      expect(isValidEmail("user@example.com")).toBe(true)
    })

    it("accepts valid email with subdomain", () => {
      expect(isValidEmail("user@mail.example.com")).toBe(true)
    })

    it("trims whitespace", () => {
      expect(isValidEmail("  user@example.com  ")).toBe(true)
    })

    it("rejects email with spaces", () => {
      expect(isValidEmail("user @example.com")).toBe(false)
    })
  })

  describe("isNonEmpty", () => {
    it("rejects empty string", () => {
      expect(isNonEmpty("")).toBe(false)
    })

    it("rejects whitespace-only string", () => {
      expect(isNonEmpty("   ")).toBe(false)
    })

    it("rejects tab-only string", () => {
      expect(isNonEmpty("\t")).toBe(false)
    })

    it("accepts non-empty string", () => {
      expect(isNonEmpty("text")).toBe(true)
    })

    it("accepts string with leading/trailing whitespace", () => {
      expect(isNonEmpty("  text  ")).toBe(true)
    })
  })

  describe("validateField", () => {
    describe("name field", () => {
      it("returns error when name is empty", () => {
        const errors = validateField("name", "")
        expect(errors.name).toBe("Name is required")
      })

      it("returns error when name is whitespace-only", () => {
        const errors = validateField("name", "   ")
        expect(errors.name).toBe("Name is required")
      })

      it("returns no error when name is valid", () => {
        const errors = validateField("name", "John Doe")
        expect(errors.name).toBeUndefined()
      })
    })

    describe("email field", () => {
      it("returns error when email is empty", () => {
        const errors = validateField("email", "")
        expect(errors.email).toBe("Email is required")
      })

      it("returns email format error when email is invalid", () => {
        const errors = validateField("email", "userexample.com")
        expect(errors.email).toBe("Enter a valid email")
      })

      it("returns no error when email is valid", () => {
        const errors = validateField("email", "user@example.com")
        expect(errors.email).toBeUndefined()
      })
    })

    describe("message field", () => {
      it("returns error when message is empty", () => {
        const errors = validateField("message", "")
        expect(errors.message).toBe("Message is required")
      })

      it("returns error when message is whitespace-only", () => {
        const errors = validateField("message", "   ")
        expect(errors.message).toBe("Message is required")
      })

      it("returns no error when message is valid", () => {
        const errors = validateField("message", "This is a message")
        expect(errors.message).toBeUndefined()
      })
    })
  })
})

describe("ContactPage form submission", () => {
  beforeEach(() => {
    mockSubmitContactForm.mockClear()
    mockSubmitContactForm.mockResolvedValue(undefined)
  })

  afterEach(() => {
    cleanup()
  })

  function renderPage() {
    render(React.createElement(ContactPage, { submitContactForm: mockSubmitContactForm }))
  }

  it("prevents form submission when name is empty", () => {
    renderPage()

    const emailInput = screen.getByPlaceholderText("you@company.com")
    const messageTextarea = screen.getByPlaceholderText("Tell me about your project...")
    const submitButton = screen.getByRole("button", { name: /send message/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(messageTextarea, { target: { value: "Test message" } })
    fireEvent.click(submitButton)

    expect(mockSubmitContactForm).not.toHaveBeenCalled()
  })

  it("prevents form submission when email is invalid", () => {
    renderPage()

    const nameInput = screen.getByPlaceholderText("Your name")
    const emailInput = screen.getByPlaceholderText("you@company.com")
    const messageTextarea = screen.getByPlaceholderText("Tell me about your project...")
    const submitButton = screen.getByRole("button", { name: /send message/i })

    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.change(messageTextarea, { target: { value: "Test message" } })
    fireEvent.click(submitButton)

    expect(mockSubmitContactForm).not.toHaveBeenCalled()
  })

  it("prevents form submission when message is empty", () => {
    renderPage()

    const nameInput = screen.getByPlaceholderText("Your name")
    const emailInput = screen.getByPlaceholderText("you@company.com")
    const submitButton = screen.getByRole("button", { name: /send message/i })

    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.click(submitButton)

    expect(mockSubmitContactForm).not.toHaveBeenCalled()
  })

  it("allows form submission when all fields are valid", () => {
    renderPage()

    const nameInput = screen.getByPlaceholderText("Your name")
    const emailInput = screen.getByPlaceholderText("you@company.com")
    const messageTextarea = screen.getByPlaceholderText("Tell me about your project...")
    const submitButton = screen.getByRole("button", { name: /send message/i })

    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(messageTextarea, { target: { value: "Test message" } })
    fireEvent.click(submitButton)

    expect(mockSubmitContactForm).toHaveBeenCalled()
  })
})
