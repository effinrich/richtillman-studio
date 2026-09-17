import { useState, useCallback } from "react"
import { CheckCircle, Mail, MapPin } from "lucide-react"
import { submitContactForm as submitContactFormDefault } from "#/features/content/queries"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { Button, Chip, Field, GlassPanel, Input, SectionHeader, Select, Textarea } from "@richtillman/ui"

const PROJECT_TYPES = [
  "Design System",
  "Nx Monorepo",
  "MCP / AI Tooling",
  "Frontend Platform",
  "Advisory",
  "Other",
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return emailPattern.test(email.trim())
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}

export function validateField(fieldName: string, value: string): Record<string, string> {
  const errors: Record<string, string> = {}

  if (fieldName === "name" && !isNonEmpty(value)) {
    errors.name = "Name is required"
  }
  if (fieldName === "email") {
    if (!isNonEmpty(value)) {
      errors.email = "Email is required"
    } else if (!isValidEmail(value)) {
      errors.email = "Enter a valid email"
    }
  }
  if (fieldName === "message" && !isNonEmpty(value)) {
    errors.message = "Message is required"
  }

  return errors
}

function getFieldErrors(formData: Record<string, string>): Record<string, string> {
  return {
    ...validateField("name", formData.name),
    ...validateField("email", formData.email),
    ...validateField("message", formData.message),
  }
}

export function ContactPage({
  submitContactForm = submitContactFormDefault,
}: {
  submitContactForm?: typeof submitContactFormDefault
} = {}) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFieldBlur = useCallback((fieldName: string, value: string) => {
    const newErrors = validateField(fieldName, value)
    setErrors((prev) => {
      const updated = { ...prev }
      if (newErrors[fieldName]) {
        updated[fieldName] = newErrors[fieldName]
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
        if (newErrors[fieldName]) {
          setErrors((prev) => ({ ...prev, [fieldName]: newErrors[fieldName] }))
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: formData.projectType,
        message: formData.message,
      })
      setSubmitted(true)
      event.currentTarget.reset()
      setErrors({})
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PortfolioLayout activeItem="contact">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="neon-text">something</span>
            </>
          }
          description="Available for senior contract engagements, design system builds, and AI-native tooling projects."
        />

        {submitted ? (
          <div className="success-banner mb-8 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <p className="text-sm text-green-300">
              Message sent! I&apos;ll get back to you within 48 hours.
            </p>
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-5">
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

          <div className="contact-info-card space-y-6 lg:col-span-2">
            <GlassPanel className="rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <h3 className="font-bold text-white">Email</h3>
              </div>
              <a
                href="mailto:hello@richtillman.dev"
                className="text-white/60 transition-colors hover:text-gold"
              >
                hello@richtillman.dev
              </a>
            </GlassPanel>

            <GlassPanel className="rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan" />
                <h3 className="font-bold text-white">Location</h3>
              </div>
              <p className="text-white/60">Remote · US Eastern Time</p>
            </GlassPanel>

            <GlassPanel className="rounded-2xl p-6">
              <div className="mb-2 flex items-center gap-2">
                <Chip variant="status" dot pulse>
                  Available for new projects
                </Chip>
              </div>
              <p className="text-sm text-white/40">
                Typical engagement: 3-6 month contracts for design systems, monorepo architecture,
                or MCP tooling.
              </p>
            </GlassPanel>
          </div>
        </div>
      </main>
    </PortfolioLayout>
  )
}
