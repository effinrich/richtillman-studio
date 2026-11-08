import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"

import { cn } from "../cn"

export type CanvasIntensity = "ambient" | "recessed"

type CanvasBackgroundProps = {
  className?: string
  intensity?: CanvasIntensity
}

const DEFAULT_TUBE_COLORS = ["#00f0ff", "#ff007f", "#ffd700"]
const DEFAULT_LIGHT_COLORS = ["#83f36e", "#00f0ff", "#ff008a", "#ffd700"]
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const COARSE_POINTER_QUERY = "(pointer: coarse)"
const TUBES_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
const IDLE_LOAD_TIMEOUT_MS = 3000
const FALLBACK_LOAD_DELAY_MS = 200
const TUBES_LOAD_TIMEOUT_MS = 5000

const TRACE_OPACITY: Record<CanvasIntensity, number> = {
  ambient: 0.32,
  recessed: 0.25
}

const SCRIM: Record<CanvasIntensity, string> = {
  ambient:
    "pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/55 via-black/70 to-black/92",
  recessed:
    "pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/68 via-black/80 to-black/94"
}

function randomHexColors(count: number) {
  return Array.from(
    { length: count },
    () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
  )
}

type TubesApp = {
  tubes: {
    setColors: (colors: Array<string>) => void
    setLightsColors: (colors: Array<string>) => void
  }
}

type TubesCursorConstructor = (
  canvas: HTMLCanvasElement,
  options: {
    tubes: {
      colors: Array<string>
      lights: { intensity: number; colors: Array<string> }
    }
  }
) => TubesApp

function readTubesCursor(): TubesCursorConstructor | undefined {
  const scope = window as Window & { tubesCursor?: TubesCursorConstructor }
  return scope.tubesCursor
}

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

export type TubesEnvironment = {
  reducedMotion: boolean
  coarsePointer: boolean
  saveData: boolean
  slowConnection: boolean
}

/**
 * The tubes cursor is a pointer affordance that pulls a third-party WebGL
 * bundle, 203.7 KiB of transfer and 7.7 s of main-thread scripting. It only
 * runs where that cost is affordable and where the affordance exists: a fine
 * pointer, motion allowed, and a connection that is neither metered nor slow.
 */
export function shouldLoadTubesCursor(environment: TubesEnvironment): boolean {
  if (environment.reducedMotion) return false
  if (environment.coarsePointer) return false
  if (environment.saveData) return false
  if (environment.slowConnection) return false
  return true
}

function readConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined
  return (navigator as Navigator & { connection?: NetworkInformation }).connection
}

function mediaMatches(query: string): boolean {
  if (typeof window.matchMedia !== "function") return false
  return window.matchMedia(query).matches
}

/**
 * Null until the environment has been measured, so the cursor is never
 * requested from a device that has not yet been classified.
 */
function useTubesEnvironment(): TubesEnvironment | null {
  const [environment, setEnvironment] = useState<TubesEnvironment | null>(null)

  useEffect(() => {
    const read = () => {
      const connection = readConnection()
      const effectiveType = connection?.effectiveType

      setEnvironment({
        reducedMotion: mediaMatches(REDUCED_MOTION_QUERY),
        coarsePointer: mediaMatches(COARSE_POINTER_QUERY),
        saveData: connection?.saveData === true,
        slowConnection: effectiveType === "slow-2g" || effectiveType === "2g"
      })
    }

    read()

    if (typeof window.matchMedia !== "function") return

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
    const coarsePointer = window.matchMedia(COARSE_POINTER_QUERY)
    reducedMotion.addEventListener("change", read)
    coarsePointer.addEventListener("change", read)

    // oxlint-disable-next-line typescript/consistent-return
    return () => {
      reducedMotion.removeEventListener("change", read)
      coarsePointer.removeEventListener("change", read)
    }
  }, [])

  return environment
}

export function CanvasBackground({ className, intensity = "ambient" }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<TubesApp | null>(null)
  const environment = useTubesEnvironment()
  const runs = environment !== null && shouldLoadTubesCursor(environment)

  const randomize = useCallback(() => {
    if (!appRef.current) return
    appRef.current.tubes.setColors(randomHexColors(3))
    appRef.current.tubes.setLightsColors(randomHexColors(4))
  }, [])

  useEffect(() => {
    if (!runs) return

    let cancelled = false
    let frame = 0
    let timeoutId: number | undefined
    let idleId: number | undefined

    async function init() {
      try {
        const script = document.createElement("script")
        script.type = "module"
        script.textContent = `
          import TubesCursor from '${TUBES_MODULE_URL}';
          window.tubesCursor = TubesCursor;
        `
        document.head.appendChild(script)

        await new Promise<void>((resolve, reject) => {
          timeoutId = window.setTimeout(() => {
            window.cancelAnimationFrame(frame)
            reject(new Error("threejs-components CDN load timed out"))
          }, TUBES_LOAD_TIMEOUT_MS)

          const check = () => {
            if ((window as Window & { tubesCursor?: unknown }).tubesCursor) {
              window.clearTimeout(timeoutId)
              resolve()
            } else if (cancelled) {
              window.clearTimeout(timeoutId)
              reject(new Error("Canvas unmounted"))
            } else {
              frame = requestAnimationFrame(check)
            }
          }

          check()
        })

        if (cancelled || !canvasRef.current) return

        const TubesCursor = readTubesCursor()

        if (!TubesCursor) return

        appRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: DEFAULT_TUBE_COLORS,
            lights: {
              intensity: 150,
              colors: DEFAULT_LIGHT_COLORS
            }
          }
        })
      } catch {
        // Graceful fallback when WebGL or CDN module is unavailable
      }
    }

    const start = () => {
      void init()
    }

    // Off the critical path: the bundle is requested once the browser is idle
    // after the first paint, never during it.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: IDLE_LOAD_TIMEOUT_MS })
    } else {
      idleId = window.setTimeout(start, FALLBACK_LOAD_DELAY_MS)
    }

    // oxlint-disable-next-line typescript/consistent-return
    return () => {
      cancelled = true
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId)
        } else {
          window.clearTimeout(idleId)
        }
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(frame)
      appRef.current = null
    }
  }, [runs])

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const target = event.target as HTMLElement
    if (target.closest("a, button, input, textarea, select, label")) return
    randomize()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 flex min-h-screen w-full cursor-crosshair flex-col overflow-hidden bg-black",
        className
      )}
      onClick={handleClick}
      role="presentation"
    >
      {runs ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 block h-full w-full"
          style={{ opacity: TRACE_OPACITY[intensity], touchAction: "none" }}
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className={SCRIM[intensity]} />
    </div>
  )
}
