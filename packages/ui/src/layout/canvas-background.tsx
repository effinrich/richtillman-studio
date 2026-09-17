import { useCallback, useEffect, useRef } from "react"
import { cn } from "../cn"

type CanvasBackgroundProps = {
  className?: string
}

const DEFAULT_TUBE_COLORS = ["#00f0ff", "#ff007f", "#ffd700"]
const DEFAULT_LIGHT_COLORS = ["#83f36e", "#00f0ff", "#ff008a", "#ffd700"]

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

export function CanvasBackground({ className }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<TubesApp | null>(null)

  const randomize = useCallback(() => {
    if (!appRef.current) return
    appRef.current.tubes.setColors(randomHexColors(3))
    appRef.current.tubes.setLightsColors(randomHexColors(4))
  }, [])

  useEffect(() => {
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
    }
  }, [])

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block h-full w-full"
        style={{ opacity: 0.9, touchAction: "none" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/20 via-black/40 to-black" />
    </div>
  )
}
