import { createServerFn } from "@tanstack/react-start"

import {
  applyNpmDownloads,
  getNpmDownloads,
  npmDownloadsNote
} from "#/features/content/npm-downloads"
import { METRICS } from "#/features/content/seed/metrics"

export const getHomeMetrics = createServerFn({ method: "GET" }).handler(async () => {
  const model = await getNpmDownloads()

  return {
    metrics: applyNpmDownloads(METRICS, model),
    metricsNote: npmDownloadsNote(model)
  }
})
