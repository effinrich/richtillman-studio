import {
  FEATURED_MCP_PACKAGES,
  NPM_DOWNLOADS_SEED,
  PUBLISHED_PACKAGES,
  formatCount,
  sumDownloads,
  type NpmDownloadsModel
} from "@richtillman/ui"
import type { Metric } from "@richtillman/ui"

import type { CaseStudyDetailSection } from "#/features/content/case-study-details"
import type { CaseStudy, Project, ResumeContent } from "#/features/content/seed-data"

const NPM_DOWNLOADS_ENDPOINT = "https://api.npmjs.org/downloads/point/last-year"
const CACHE_TTL_MS = 60 * 60 * 1000
const FAILURE_BACKOFF_MS = 5 * 60 * 1000
const REQUEST_TIMEOUT_MS = 1500

export const NPM_DOWNLOADS_TOKEN = "{{npm_downloads}}"
export const FEATURED_NPM_DOWNLOADS_TOKEN = "{{featured_npm_downloads}}"
export const NPM_PACKAGE_COUNT_TOKEN = "{{npm_package_count}}"

export type NpmDownloadsOptions = {
  fetchImpl?: typeof fetch
  now?: () => number
  timeoutMs?: number
}

type CacheEntry = {
  model: NpmDownloadsModel
  fetchedAt: number
}

let cache: CacheEntry | null = null
let lastFailureAt: number | null = null

export function resetNpmDownloadsCache(): void {
  cache = null
  lastFailureAt = null
}

function readPointResponse(body: unknown, name: string): { downloads: number; end: string } {
  if (typeof body !== "object" || body === null) {
    throw new Error(`npm downloads API returned an unexpected body for ${name}`)
  }

  const downloads = Reflect.get(body, "downloads")
  const end = Reflect.get(body, "end")

  if (typeof downloads !== "number") {
    throw new Error(`npm downloads API returned no download count for ${name}`)
  }

  return { downloads, end: typeof end === "string" ? end : "" }
}

async function fetchPackageCount(
  name: string,
  options: NpmDownloadsOptions
): Promise<{ name: string; downloads: number; measuredAt: string }> {
  const fetchImpl = options.fetchImpl ?? fetch
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS
  const response = await fetchImpl(`${NPM_DOWNLOADS_ENDPOINT}/${encodeURIComponent(name)}`, {
    signal: AbortSignal.timeout(timeoutMs)
  })

  if (!response.ok) {
    throw new Error(`npm downloads API returned ${response.status} for ${name}`)
  }

  const body: unknown = await response.json()
  const point = readPointResponse(body, name)

  return { name, downloads: point.downloads, measuredAt: point.end }
}

/**
 * Reads the live download count for every published package. One request per
 * package, all in parallel. Any failure fails the whole read: a partial total
 * would be a made-up number.
 */
export async function fetchNpmDownloads(
  options: NpmDownloadsOptions = {}
): Promise<NpmDownloadsModel> {
  const results = await Promise.all(
    PUBLISHED_PACKAGES.map((name) => fetchPackageCount(name, options))
  )

  const measuredAt = results.reduce(
    (latest, entry) => (entry.measuredAt > latest ? entry.measuredAt : latest),
    ""
  )

  return {
    measuredAt,
    live: true,
    packages: results.map(({ name, downloads }) => ({ name, downloads }))
  }
}

/**
 * Cached read of the live counts. Falls back to the last good snapshot, then
 * to the measured seed, so the page never renders an invented number.
 */
export async function getNpmDownloads(
  options: NpmDownloadsOptions = {}
): Promise<NpmDownloadsModel> {
  const now = options.now?.() ?? Date.now()

  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) return cache.model

  if (lastFailureAt !== null && now - lastFailureAt < FAILURE_BACKOFF_MS) {
    return cache?.model ?? NPM_DOWNLOADS_SEED
  }

  try {
    const model = await fetchNpmDownloads(options)
    cache = { model, fetchedAt: now }
    lastFailureAt = null
    return model
  } catch {
    lastFailureAt = now
    return cache?.model ?? NPM_DOWNLOADS_SEED
  }
}

/**
 * Source note for a measured figure, so a reader can date the number.
 */
export function npmDownloadsNote(model: NpmDownloadsModel): string {
  return model.live
    ? `npm downloads API · measured ${model.measuredAt}`
    : `npm downloads API unreachable · bundled measurement from ${model.measuredAt}`
}

const TOKEN_RESOLVERS: Record<string, (model: NpmDownloadsModel) => string> = {
  [NPM_DOWNLOADS_TOKEN]: (model) => formatCount(sumDownloads(model)),
  [FEATURED_NPM_DOWNLOADS_TOKEN]: (model) =>
    formatCount(sumDownloads(model, FEATURED_MCP_PACKAGES)),
  [NPM_PACKAGE_COUNT_TOKEN]: (model) => String(model.packages.length)
}

const UNRESOLVED_TOKEN = /\{\{\s*[a-z0-9_]+\s*\}\}/i

export function interpolateText(input: string, model: NpmDownloadsModel): string {
  let output = input

  for (const [token, resolve] of Object.entries(TOKEN_RESOLVERS)) {
    output = output.split(token).join(resolve(model))
  }

  if (UNRESOLVED_TOKEN.test(output)) {
    throw new Error(`Content contains an unresolved token: ${output}`)
  }

  return output
}

function interpolate(value: unknown, model: NpmDownloadsModel): unknown {
  if (typeof value === "string") return interpolateText(value, model)

  if (Array.isArray(value)) return value.map((entry) => interpolate(entry, model))

  if (typeof value === "object" && value !== null) {
    const output: Record<string, unknown> = {}

    for (const [key, entry] of Object.entries(value)) {
      output[key] = interpolate(entry, model)
    }

    return output
  }

  return value
}

export function applyNpmDownloads(metrics: readonly Metric[], model: NpmDownloadsModel): Metric[]
export function applyNpmDownloads(projects: readonly Project[], model: NpmDownloadsModel): Project[]
export function applyNpmDownloads(
  caseStudies: readonly CaseStudy[],
  model: NpmDownloadsModel
): CaseStudy[]
export function applyNpmDownloads(
  sections: readonly CaseStudyDetailSection[],
  model: NpmDownloadsModel
): CaseStudyDetailSection[]
export function applyNpmDownloads(resume: ResumeContent, model: NpmDownloadsModel): ResumeContent
export function applyNpmDownloads(
  value: Record<string, unknown>,
  model: NpmDownloadsModel
): Record<string, unknown>
export function applyNpmDownloads(value: unknown, model: NpmDownloadsModel): unknown {
  return interpolate(value, model)
}
