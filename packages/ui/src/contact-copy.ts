/**
 * Availability copy for the contact page. The headline names the roles being
 * hired for, so a reader does not take this for a contract-only portfolio.
 */
export const CONTACT_AVAILABILITY =
  "Open to Principal and Staff Frontend roles, product engineering, and engineering leadership."

export const CONTACT_ENGAGEMENT_OPTIONS =
  "Contract, advisory, and fractional engagements welcome too, typically 3-6 months for design systems, monorepo architecture, or MCP tooling."

/**
 * The address the contact form falls back to when a submission cannot be
 * stored. It is one constant because the footer, the contact card and the
 * form's failure path all have to agree on it.
 */
export const CONTACT_EMAIL = "hello@richtillman.xyz"

/**
 * What a visitor sees when their message could not be delivered. It says what
 * happened and what to do instead, and it never claims the message was
 * received.
 */
export const CONTACT_DELIVERY_FAILED =
  "Your message could not be sent. Email me instead and it will reach me directly."

export type ContactMailtoInput = {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
}

/**
 * A mailto link carrying the visitor's message, so the fallback is a delivery
 * path rather than a dead address.
 */
export function buildContactMailto(input: ContactMailtoInput): string {
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    `Enquiry: ${input.projectType}`,
    "",
    input.message
  ]
    .filter((line): line is string => line !== null)
    .join("\n")

  const subject = encodeURIComponent(`Portfolio enquiry: ${input.projectType}`)

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`
}

/**
 * What the visitor is getting in touch about. Employment comes first, so a
 * recruiter asking about a role does not have to file it under "Other".
 */
export const ENQUIRY_TYPES = [
  "Full-time role",
  "Contract or advisory",
  "Fractional",
  "Design System",
  "Nx Monorepo",
  "MCP / AI Tooling",
  "Frontend Platform",
  "Other"
] as const
