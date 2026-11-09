import { useCallback, useState, type FormEvent } from "react"

import { Button } from "../button"
import { buildContactMailto, CONTACT_DELIVERY_FAILED, ENQUIRY_TYPES } from "../contact-copy"
import { Field, Input, Select, Textarea } from "../field"
import type { ContactSubmitHandler, ContactSubmitInput } from "../models"
import { getFieldErrors, validateField } from "./contact-validation"

function readFormString(form: FormData, name: string): string {
  const value = form.get(name)
  return typeof value === "string" ? value : ""
}

type ContactFormProps = {
  onSubmit: ContactSubmitHandler
  onSubmitted?: () => void
}

export function ContactForm({ onSubmit, onSubmitted }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [failedSubmission, setFailedSubmission] = useState<ContactSubmitInput | null>(null)

  const handleFieldBlur = useCallback((fieldName: string, value: string) => {
    const newErrors = validateField(fieldName, value)
    setErrors((prev) => {
      const updated = { ...prev }
      const message = newErrors[fieldName]
      if (message) {
        updated[fieldName] = message
      } else {
        delete updated[fieldName]
      }
      return updated
    })
  }, [])

  const handleFieldChange = useCallback(
    (fieldName: string, value: string) => {
      if (errors[fieldName]) {
        const newErrors = validateField(fieldName, value)
        const message = newErrors[fieldName]
        if (message) {
          setErrors((prev) => ({ ...prev, [fieldName]: message }))
        } else {
          setErrors((prev) => {
            const updated = { ...prev }
            delete updated[fieldName]
            return updated
          })
        }
      }
    },
    [errors]
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    // React clears `event.currentTarget` once the dispatch finishes, and the
    // await below suspends past that point. The element is captured here so
    // the form can still be reset after the submission settles.
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const formData = {
      name: readFormString(form, "name"),
      email: readFormString(form, "email"),
      company: readFormString(form, "company") || undefined,
      projectType: readFormString(form, "projectType"),
      message: readFormString(form, "message")
    }

    const validationErrors = getFieldErrors({
      name: formData.name,
      email: formData.email,
      message: formData.message
    })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setLoading(false)
      return
    }

    try {
      await onSubmit(formData)
      formElement.reset()
      setErrors({})
      setFailedSubmission(null)
      onSubmitted?.()
    } catch (err) {
      // The cause goes to the console. The visitor gets a delivery path, not
      // a stack trace and not a claim that their message arrived.
      console.error("contact form submission failed", err)
      setError(CONTACT_DELIVERY_FAILED)
      setFailedSubmission(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your name"
            error={errors.name}
            onBlur={(e) => handleFieldBlur("name", e.currentTarget.value)}
            onChange={(e) => handleFieldChange("name", e.currentTarget.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            error={errors.email}
            onBlur={(e) => handleFieldBlur("email", e.currentTarget.value)}
            onChange={(e) => handleFieldChange("email", e.currentTarget.value)}
          />
        </Field>
      </div>

      <Field label="Company" htmlFor="company">
        <Input id="company" name="company" placeholder="Optional" />
      </Field>

      <Field label="Role or project" htmlFor="projectType">
        <Select id="projectType" name="projectType" required>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role or project..."
          error={errors.message}
          onBlur={(e) => handleFieldBlur("message", e.currentTarget.value)}
          onChange={(e) => handleFieldChange("message", e.currentTarget.value)}
        />
      </Field>

      {error ? (
        <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-6 py-4">
          <p className="text-sm text-red-300">{error}</p>
          {failedSubmission ? (
            <a
              href={buildContactMailto(failedSubmission)}
              className="mt-3 inline-block text-sm font-medium text-gold underline underline-offset-4 transition-colors hover:text-white"
            >
              Send it by email instead
            </a>
          ) : null}
        </div>
      ) : null}

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
