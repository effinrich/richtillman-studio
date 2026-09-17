import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import { cn } from "../cn"

export type CanvasIntensity = "ambient" | "recessed"

type CanvasBackgroundProps = {
  className?: string
  intensity?: CanvasIntensity
}

const DEFAULT_TUBE_COLORS = ["#00f0ff", "#ff007f", "#ffd700"]
const DEFAULT_LIGHT_COLORS = ["#83f36e", "#00f0ff", "#ff008a", "#ffd700"]

const TRACE_OPACITY: Record<CanvasIntensity, number> = {
  ambient: 0.32,
  recessed: 0.25,
}

const SCRIM: Record<CanvasIntensity, string> = {
  ambient:
    "pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/55 via-black/70 to-black/92",
  recessed:
    "pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/68 via-black/80 to-black/94",
}

function randomHexColors(count: number) {
  return Array.from(
    { length: count },
    () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
  )
}

type TubesApp = {
  tubes: {
    setColors: (colors: Array<string>) => void
    setLightsColors: (colors: Array<string>) => void
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export function CanvasBackground({ className, intensity = "ambient" }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<TubesApp | null>(null)
  const reduceMotion = usePrefersReducedMotion()

  const randomize = useCallback(() => {
    if (!appRef.current) return
    appRef.current.tubes.setColors(randomHexColors(3))
    appRef.current.tubes.setLightsColors(randomHexColors(4))
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false
    let frame = 0
    let timeoutId: number | undefined

    async function init() {
      try {
        const script = document.createElement("script")
        script.type = "module"
        script.textContent = `
          import TubesCursor from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
          window.tubesCursor = TubesCursor;
        `
        document.head.appendChild(script)

        await new Promise<void>((resolve, reject) => {
          timeoutId = window.setTimeout(() => {
            window.cancelAnimationFrame(frame)
            reject(new Error("threejs-components CDN load timed out"))
          }, 5000)

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

        const TubesCursor = (
          window as unknown as {
            tubesCursor: (
              canvas: HTMLCanvasElement,
              options: {
                tubes: {
                  colors: Array<string>
                  lights: { intensity: number; colors: Array<string> }
                }
              },
            ) => TubesApp
          }
        ).tubesCursor

        if (!TubesCursor) return

        appRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: DEFAULT_TUBE_COLORS,
            lights: {
              intensity: 150,
              colors: DEFAULT_LIGHT_COLORS,
            },
          },
        })
      } catch {
        // Graceful fallback when WebGL or CDN module is unavailable
      }
    }

    void init()
    return () => {
      cancelled = true
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(frame)
      appRef.current = null
    }
  }, [reduceMotion])

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.closest("a, button, input, textarea, select, label")) return
    randomize()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 flex min-h-screen w-full cursor-crosshair flex-col overflow-hidden bg-black",
        className,
      )}
      onClick={handleClick}
      role="presentation"
    >
      {reduceMotion ? null : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 block h-full w-full"
          style={{ opacity: TRACE_OPACITY[intensity], touchAction: "none" }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className={SCRIM[intensity]} />
    </div>
  )
}
