import { createServerFn } from "@tanstack/react-start"

import { applyNpmDownloads, getNpmDownloads } from "#/features/content/npm-downloads"
import { RESUME_SECTIONS } from "#/features/content/seed/resume"

export const getResumeSections = createServerFn({ method: "GET" }).handler(async () => {
  return applyNpmDownloads(RESUME_SECTIONS, await getNpmDownloads())
})
