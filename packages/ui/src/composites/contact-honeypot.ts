/**
 * The contact form carries a field that no visitor can see. It sits off-screen
 * inside an `aria-hidden` wrapper and the keyboard skips it, so a person never
 * fills it and never notices it. A bot that fills every input in the form
 * fills this one too, and the server refuses that submission before anything
 * is written.
 *
 * The field name and the test for it live here so the form and the server
 * cannot drift apart.
 */
export const CONTACT_HONEYPOT_FIELD = "company_website"

/**
 * Whether the hidden field carries a value. Whitespace counts as a value,
 * because a submission that put anything in the field did not come from the
 * form as a person reads it.
 */
export function isHoneypotFilled(value: string | undefined | null): boolean {
  return typeof value === "string" && value.length > 0
}
