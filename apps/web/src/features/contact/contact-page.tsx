import type { ContactSubmitHandler } from "@richtillman/ui/models.ts"
import { ContactScreen } from "@richtillman/ui/screens/contact-screen.tsx"

import { submitContactForm as submitContactFormDefault } from "#/features/content/queries/contact"

export {
  isNonEmpty,
  isValidEmail,
  validateField
} from "@richtillman/ui/composites/contact-validation.ts"

type ContactPageProps = {
  submitContactForm?: ContactSubmitHandler
}

export function ContactPage({ submitContactForm = submitContactFormDefault }: ContactPageProps) {
  return <ContactScreen onSubmit={submitContactForm} />
}
