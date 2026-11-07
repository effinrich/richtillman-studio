import {
  FEATURED_MCP_PACKAGES,
  NPM_DOWNLOADS_SEED,
  PUBLISHED_PACKAGES,
  type NpmDownloadsModel
} from "@richtillman/ui"
import { describe, expect, it, beforeEach } from "vitest"

import { CASE_STUDY_DETAIL_SECTIONS } from "./case-study-details"
import {
  FEATURED_NPM_DOWNLOADS_TOKEN,
  NPM_DOWNLOADS_TOKEN,
  applyNpmDownloads,
  fetchNpmDownloads,
  getNpmDownloads,
  resetNpmDownloadsCache
} from "./npm-downloads"
import * as seed from "./seed-data"

function pointResponse(downloads: number, end = "2026-11-06"): Response {
  return new Response(
    JSON.stringify({ downloads, start: "2025-11-07", end, package: "forgekit-storybook-mcp" }),
    { status: 200, headers: { "content-type": "application/json" } }
  )
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input
  if (input instanceof URL) return input.href
  return input.url
}

function packageNameFrom(url: string): string {
  return decodeURIComponent(url.slice(url.lastIndexOf("/") + 1))
}

let clock = 1_700_000_000_000

function currentTime(): number {
  return clock
}

async function unreachableFetch(): Promise<Response> {
  throw new Error("network unreachable")
}

const model: NpmDownloadsModel = {
  measuredAt: "2026-11-06",
  live: true,
  packages: [
    { name: "forgekit-figma-mcp", downloads: 300 },
    { name: "forgekit-storybook-mcp", downloads: 7000 },
    { name: "@effinrich/ui", downloads: 100 }
  ]
}

describe("npm downloads", () => {
  beforeEach(() => {
    resetNpmDownloadsCache()
    clock = 1_700_000_000_000
  })

  it("asks the npm API once per published package", async () => {
    const requested: string[] = []
    const fetchImpl = async (input: RequestInfo | URL) => {
      const url = requestUrl(input)
      requested.push(url)
      return pointResponse(packageNameFrom(url) === "forgekit-storybook-mcp" ? 8000 : 100)
    }

    const result = await fetchNpmDownloads({ fetchImpl })

    expect(requested).toHaveLength(PUBLISHED_PACKAGES.length)
    expect(result.live).toBe(true)
    expect(result.measuredAt).toBe("2026-11-06")
    expect(result.packages).toHaveLength(PUBLISHED_PACKAGES.length)
    expect(result.packages.find((p) => p.name === "forgekit-storybook-mcp")?.downloads).toBe(8000)
  })

  it("fails closed when a single package cannot be read", async () => {
    const fetchImpl = async (input: RequestInfo | URL) => {
      if (requestUrl(input).includes("forgekit-radix-mcp")) {
        return new Response("not found", { status: 404 })
      }
      return pointResponse(100)
    }

    await expect(fetchNpmDownloads({ fetchImpl })).rejects.toThrow(/forgekit-radix-mcp/)
  })

  it("falls back to the measured seed when the API is unreachable", async () => {
    const result = await getNpmDownloads({ fetchImpl: unreachableFetch })

    expect(result).toEqual(NPM_DOWNLOADS_SEED)
    expect(result.live).toBe(false)
  })

  it("serves the cached snapshot until the cache goes stale", async () => {
    let calls = 0
    const fetchImpl = async () => {
      calls += 1
      return pointResponse(100)
    }

    const first = await getNpmDownloads({ fetchImpl, now: currentTime })
    const second = await getNpmDownloads({ fetchImpl, now: currentTime })

    expect(calls).toBe(PUBLISHED_PACKAGES.length)
    expect(second).toBe(first)
  })

  it("refreshes once the cache is older than the TTL", async () => {
    let calls = 0
    const fetchImpl = async () => {
      calls += 1
      return pointResponse(100)
    }

    await getNpmDownloads({ fetchImpl, now: currentTime })
    clock += 60 * 60 * 1000 + 1
    await getNpmDownloads({ fetchImpl, now: currentTime })

    expect(calls).toBe(PUBLISHED_PACKAGES.length * 2)
  })

  it("interpolates download counts into nested content", () => {
    const content = {
      metrics: [{ value: NPM_DOWNLOADS_TOKEN, label: "npm downloads" }],
      body: `${FEATURED_NPM_DOWNLOADS_TOKEN} downloads across two packages`
    }

    expect(applyNpmDownloads(content, model)).toEqual({
      metrics: [{ value: "7,400", label: "npm downloads" }],
      body: "7,300 downloads across two packages"
    })
  })

  it("refuses content that still carries an unresolved token", () => {
    expect(() => applyNpmDownloads({ body: "{{unknown_token}}" }, model)).toThrow(
      /unresolved token/i
    )
  })

  it("counts every published package in the seed", () => {
    expect(NPM_DOWNLOADS_SEED.packages.map((entry) => entry.name)).toEqual([...PUBLISHED_PACKAGES])
    expect(
      FEATURED_MCP_PACKAGES.every((name) =>
        NPM_DOWNLOADS_SEED.packages.some((entry) => entry.name === name)
      )
    ).toBe(true)
  })

  it("leaves no hardcoded download figure in the content", () => {
    const serialized = JSON.stringify(Object.values(seed))

    expect(serialized).not.toMatch(/8,000\+/)
    expect(serialized).not.toMatch(/\b9,392\b/)
  })

  it("resolves every download token in the real content", () => {
    const resolved = [
      applyNpmDownloads(seed.METRICS, NPM_DOWNLOADS_SEED),
      applyNpmDownloads(seed.PROJECTS, NPM_DOWNLOADS_SEED),
      applyNpmDownloads(seed.CASE_STUDIES, NPM_DOWNLOADS_SEED),
      applyNpmDownloads(seed.RESUME_SECTIONS, NPM_DOWNLOADS_SEED),
      applyNpmDownloads(CASE_STUDY_DETAIL_SECTIONS["forgekit-mcp"], NPM_DOWNLOADS_SEED)
    ]

    expect(JSON.stringify(resolved)).not.toMatch(/\{\{/)
  })
})
