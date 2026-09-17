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

export function getFieldErrors(formData: Record<string, string>): Record<string, string> {
  return {
    ...validateField("name", formData.name ?? ""),
    ...validateField("email", formData.email ?? ""),
    ...validateField("message", formData.message ?? ""),
  }
}
