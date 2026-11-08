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
  edgeCache?: EdgeCache | null
}

/**
 * The edge cache is the Cloudflare Cache API, which is shared by every
 * isolate in a colo. The module level cache below only lives inside one
 * isolate, so a cold isolate in a new colo would otherwise ask the npm API
 * for the counts all over again.
 */
export type EdgeCache = {
  match: (request: Request) => Promise<Response | undefined>
  put: (request: Request, response: Response) => Promise<void>
}

const EDGE_CACHE_KEY = "https://richtillman.xyz/.cache/npm-downloads.json"

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

function defaultEdgeCache(): EdgeCache | undefined {
  const scope = globalThis as { caches?: { default?: EdgeCache } }
  const edgeCache = scope.caches?.default

  if (!edgeCache) return undefined

  return {
    match: (request) => edgeCache.match(request),
    put: (request, response) => edgeCache.put(request, response)
  }
}

function parseSnapshot(body: unknown): NpmDownloadsModel | null {
  if (typeof body !== "object" || body === null) return null

  const measuredAt = Reflect.get(body, "measuredAt")
  const packages = Reflect.get(body, "packages")

  if (typeof measuredAt !== "string") return null
  if (!Array.isArray(packages)) return null

  const entries = packages.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return []

    const name = Reflect.get(entry, "name")
    const downloads = Reflect.get(entry, "downloads")

    if (typeof name !== "string" || typeof downloads !== "number") return []

    return [{ name, downloads }]
  })

  if (entries.length !== packages.length) return null

  return { measuredAt, live: true, packages: entries }
}

async function readEdgeCache(edgeCache: EdgeCache | undefined): Promise<NpmDownloadsModel | null> {
  if (!edgeCache) return null

  try {
    const response = await edgeCache.match(new Request(EDGE_CACHE_KEY))
    if (!response) return null

    const body: unknown = await response.json()
    return parseSnapshot(body)
  } catch {
    return null
  }
}

async function writeEdgeCache(
  edgeCache: EdgeCache | undefined,
  model: NpmDownloadsModel
): Promise<void> {
  if (!edgeCache) return

  try {
    const response = new Response(JSON.stringify(model), {
      headers: {
        "content-type": "application/json",
        "cache-control": `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}`
      }
    })

    await edgeCache.put(new Request(EDGE_CACHE_KEY), response)
  } catch {
    // The edge cache is an optimisation. Never a reason to fail a read.
  }
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

  const edgeCache =
    options.edgeCache === undefined ? defaultEdgeCache() : (options.edgeCache ?? undefined)

  const shared = await readEdgeCache(edgeCache)
  if (shared) {
    cache = { model: shared, fetchedAt: now }
    lastFailureAt = null
    return shared
  }

  if (lastFailureAt !== null && now - lastFailureAt < FAILURE_BACKOFF_MS) {
    return cache?.model ?? NPM_DOWNLOADS_SEED
  }

  try {
    const model = await fetchNpmDownloads(options)
    cache = { model, fetchedAt: now }
    lastFailureAt = null
    await writeEdgeCache(edgeCache, model)
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
