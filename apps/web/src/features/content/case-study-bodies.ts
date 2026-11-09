import { stripTitleBlock } from "./markdown"
import proseDoesNotBindAgents from "./seed/case-study-bodies/prose-does-not-bind-agents.md?raw"

/**
 * The long-form case study bodies. The markdown files are the articles as
 * published, so the same file can be read on its own, and the site renders it
 * without a second copy to keep in step.
 */
export const CASE_STUDY_BODIES: Record<string, string> = {
  "prose-does-not-bind-agents": proseDoesNotBindAgents
}

export function readCaseStudyBody(slug: string): string | null {
  const body = CASE_STUDY_BODIES[slug]

  return body ? stripTitleBlock(body) : null
}
