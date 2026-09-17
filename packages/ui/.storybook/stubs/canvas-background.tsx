import { cn } from "../../src/cn"

/** Deterministic stand-in so page/layout Chromatic snapshots are not CDN/WebGL. */
export function CanvasBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 z-0 min-h-screen w-full bg-black", className)}
      role="presentation"
    />
  )
}
