import type { ContactSubmitInput } from "@richtillman/ui/models.ts"
import { env } from "cloudflare:workers"

/**
 * Raised when a contact submission cannot be stored. The name is what makes
 * the failure legible in the worker's logs.
 */
export class ContactStoreUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ContactStoreUnavailableError"
  }
}

export type SavedContactMessage = { id: number }

/**
 * Writes one contact submission to D1. It refuses by name when the binding is
 * missing, rather than reporting a message as stored when it is not.
 */
export async function saveContactMessage(input: ContactSubmitInput): Promise<SavedContactMessage> {
  const database: D1Database | undefined = env.DB

  if (!database) {
    throw new ContactStoreUnavailableError(
      "The contact form has no D1 binding. Check the DB binding on the richtillman-studio Worker."
    )
  }

  const row = await database
    .prepare(
      `insert into contact_messages (name, email, company, project_type, message)
       values (?, ?, ?, ?, ?)
       returning id`
    )
    .bind(input.name, input.email, input.company ?? null, input.projectType, input.message)
    .first<{ id: number }>()

  if (!row || typeof row.id !== "number") {
    throw new ContactStoreUnavailableError("The contact message insert returned no row id.")
  }

  return { id: row.id }
}
