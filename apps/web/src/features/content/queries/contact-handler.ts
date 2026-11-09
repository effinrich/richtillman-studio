import { isHoneypotFilled } from "@richtillman/ui/composites/contact-honeypot.ts"
import type { ContactSubmitInput } from "@richtillman/ui/models.ts"

import { saveContactMessage, type SavedContactMessage } from "./contact-store"

/**
 * Raised when a contact submission is refused before anything is written. The
 * name is what makes the refusal legible in the worker's logs.
 */
export class ContactSubmissionRejectedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ContactSubmissionRejectedError"
  }
}

/**
 * Decides whether a submission is stored.
 *
 * The hidden field is the one signal that separates a person from a bot that
 * fills every input it finds. A submission that filled it is refused here, so
 * nothing is written. The refusal is deliberate: the form never reports a
 * message as sent when it was not stored.
 */
export async function handleContactSubmission(
  input: ContactSubmitInput
): Promise<SavedContactMessage> {
  if (isHoneypotFilled(input.companyWebsite)) {
    throw new ContactSubmissionRejectedError(
      "The contact submission filled the honeypot field, so it was not stored."
    )
  }

  return saveContactMessage(input)
}
