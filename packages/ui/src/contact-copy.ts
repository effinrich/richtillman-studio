/**
 * Availability copy for the contact page. The headline names the roles being
 * hired for, so a reader does not take this for a contract-only portfolio.
 */
export const CONTACT_AVAILABILITY =
  "Open to Principal and Staff Frontend roles, product engineering, and engineering leadership."

export const CONTACT_ENGAGEMENT_OPTIONS =
  "Contract, advisory, and fractional engagements welcome too, typically 3-6 months for design systems, monorepo architecture, or MCP tooling."

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
