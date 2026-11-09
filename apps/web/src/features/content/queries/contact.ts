import type { ContactSubmitInput } from "@richtillman/ui/models.ts"
import { createServerFn } from "@tanstack/react-start"

import { saveContactMessage } from "./contact-store"

/**
 * The contact form posts to a server function, so the D1 binding stays on
 * the Worker and no database credential is ever shipped to the browser.
 */
const submitContactMessage = createServerFn({ method: "POST" })
  .validator((input: ContactSubmitInput) => input)
  .handler(async ({ data }) => saveContactMessage(data))

/**
 * The handler the contact page injects. It either resolves with the stored
 * message, or throws. It never resolves to a fake success.
 */
export async function submitContactForm(input: ContactSubmitInput): Promise<unknown> {
  return submitContactMessage({ data: input })
}
