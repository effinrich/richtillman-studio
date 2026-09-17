import { ContactScreen, type ContactSubmitHandler } from "@richtillman/ui"
import { submitContactForm as submitContactFormDefault } from "#/features/content/queries"

export { isValidEmail, isNonEmpty, validateField } from "@richtillman/ui"

type ContactPageProps = {
  submitContactForm?: ContactSubmitHandler
}

export function ContactPage({ submitContactForm = submitContactFormDefault }: ContactPageProps) {
  return <ContactScreen onSubmit={submitContactForm} />
}
