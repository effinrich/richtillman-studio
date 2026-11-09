import { createServerFn } from "@tanstack/react-start"

import { readCaseStudyBody } from "#/features/content/case-study-bodies"
import { CASE_STUDY_DETAIL_SECTIONS } from "#/features/content/case-study-details"
import { renderMarkdown } from "#/features/content/markdown"
import { applyNpmDownloads, getNpmDownloads } from "#/features/content/npm-downloads"
import { slugValidator } from "#/features/content/queries/slug"
import { CASE_STUDIES } from "#/features/content/seed/case-studies"

async function loadCaseStudies() {
  return applyNpmDownloads(CASE_STUDIES, await getNpmDownloads())
}

export const getCaseStudies = createServerFn({ method: "GET" }).handler(loadCaseStudies)

export const getCaseStudyBySlug = createServerFn({ method: "POST" })
  .validator(slugValidator)
  .handler(async ({ data: slug }) => {
    const studies = await loadCaseStudies()
    return studies.find((study) => study.slug === slug) ?? null
  })

export const getCaseStudyDetailSections = createServerFn({ method: "POST" })
  .validator(slugValidator)
  .handler(async ({ data: slug }) => {
    const sections = CASE_STUDY_DETAIL_SECTIONS[slug] ?? []
    return applyNpmDownloads(sections, await getNpmDownloads())
  })

/**
 * The long-form bodies are markdown and are rendered on the server, so the
 * page ships one string of HTML instead of the source and a parser.
 */
export const getCaseStudyBody = createServerFn({ method: "POST" })
  .validator(slugValidator)
  .handler(async ({ data: slug }) => {
    const body = readCaseStudyBody(slug)

    return body ? renderMarkdown(body) : null
  })
