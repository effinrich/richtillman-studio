import { cn } from "@richtillman/ui"

type CanvasBackgroundProps = {
  className?: string
}

export function CanvasBackground({ className }: CanvasBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 flex min-h-screen w-full cursor-crosshair flex-col overflow-hidden bg-black",
        className,
      )}
      role="presentation"
    >
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
