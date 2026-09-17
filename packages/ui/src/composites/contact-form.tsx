import { useCallback, useState, type FormEvent } from "react"
import { Button } from "../button"
import { Field, Input, Select, Textarea } from "../field"
import type { ContactSubmitHandler } from "../models"
import { getFieldErrors, validateField } from "./contact-validation"

const PROJECT_TYPES = [
  "Design System",
  "Nx Monorepo",
  "MCP / AI Tooling",
  "Frontend Platform",
  "Advisory",
  "Other",
]

type ContactFormProps = {
  onSubmit: ContactSubmitHandler
  onSubmitted?: () => void
}

export function ContactForm({ onSubmit, onSubmitted }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    [errors],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(event.currentTarget)
    const formData = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? "") || undefined,
      projectType: String(form.get("projectType") ?? ""),
      message: String(form.get("message") ?? ""),
    }

    const validationErrors = getFieldErrors(formData as Record<string, string>)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setLoading(false)
      return
    }

    try {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: formData.projectType,
        message: formData.message,
      })
      event.currentTarget.reset()
      setErrors({})
      onSubmitted?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
      <div className="form-field grid gap-6 sm:grid-cols-2">
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

      <Field label="Project Type" htmlFor="projectType">
        <Select id="projectType" name="projectType" required>
          {PROJECT_TYPES.map((type) => (
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
          placeholder="Tell me about your project..."
          error={errors.message}
          onBlur={(e) => handleFieldBlur("message", e.currentTarget.value)}
          onChange={(e) => handleFieldChange("message", e.currentTarget.value)}
        />
      </Field>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
