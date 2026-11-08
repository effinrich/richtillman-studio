import { CanvasBackground, shouldLoadTubesCursor } from "@richtillman/ui"
import { render, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

type MediaState = {
  coarse?: boolean
  reduced?: boolean
}

function stubMatchMedia(state: MediaState) {
  vi.stubGlobal("matchMedia", (query: string) => {
    const matches = query.includes("pointer: coarse")
      ? Boolean(state.coarse)
      : query.includes("prefers-reduced-motion")
        ? Boolean(state.reduced)
        : false

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false
    } as unknown as MediaQueryList
  })
}

function stubConnection(connection?: { saveData?: boolean; effectiveType?: string }) {
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: connection
  })
}

function tubesScripts(): HTMLScriptElement[] {
  return Array.from(document.head.querySelectorAll("script[type='module']"))
}

describe("tubes cursor environment", () => {
  it("loads the cursor on a fine-pointer device", () => {
    expect(
      shouldLoadTubesCursor({
        reducedMotion: false,
        coarsePointer: false,
        saveData: false,
        slowConnection: false
      })
    ).toBe(true)
  })

  it("skips the cursor for touch, reduced motion, and constrained networks", () => {
    const base = {
      reducedMotion: false,
      coarsePointer: false,
      saveData: false,
      slowConnection: false
    }

    expect(shouldLoadTubesCursor({ ...base, coarsePointer: true })).toBe(false)
    expect(shouldLoadTubesCursor({ ...base, reducedMotion: true })).toBe(false)
    expect(shouldLoadTubesCursor({ ...base, saveData: true })).toBe(false)
    expect(shouldLoadTubesCursor({ ...base, slowConnection: true })).toBe(false)
  })
})

describe("canvas background", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    stubConnection(undefined)
    for (const script of tubesScripts()) script.remove()
  })

  it("never requests the third-party cursor on a touch device", async () => {
    stubMatchMedia({ coarse: true })
    stubConnection({ effectiveType: "4g" })

    render(<CanvasBackground />)

    await new Promise((resolve) => setTimeout(resolve, 400))

    expect(tubesScripts()).toHaveLength(0)
  })

  it("never requests the third-party cursor when motion is reduced", async () => {
    stubMatchMedia({ coarse: false, reduced: true })
    stubConnection({ effectiveType: "4g" })

    render(<CanvasBackground />)

    await new Promise((resolve) => setTimeout(resolve, 400))

    expect(tubesScripts()).toHaveLength(0)
  })

  it("requests the cursor from the CDN on a fine-pointer device", async () => {
    stubMatchMedia({ coarse: false, reduced: false })
    stubConnection({ effectiveType: "4g" })

    render(<CanvasBackground />)

    await waitFor(() => expect(tubesScripts().length).toBeGreaterThan(0))
    expect(tubesScripts()[0]?.textContent).toContain("cdn.jsdelivr.net")
  })

  it("does not request the cursor during the first paint", async () => {
    stubMatchMedia({ coarse: false, reduced: false })
    stubConnection({ effectiveType: "4g" })

    render(<CanvasBackground />)

    // The request is deferred to idle, so the first paint never waits on it.
    expect(tubesScripts()).toHaveLength(0)

    await waitFor(() => expect(tubesScripts().length).toBeGreaterThan(0))
  })
})
