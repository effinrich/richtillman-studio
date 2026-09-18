import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "./cn"

export type ChipVariant = "default" | "status"

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: ChipVariant
  dot?: boolean
  pulse?: boolean
}

const VARIANT: Record<ChipVariant, string> = {
  default: "glass-panel font-mono text-white/70 hover:bg-white/5",
  // No backdrop-filter: status chips sit in the fixed header where blur
  // can composite into a full-viewport overlay while the page scrolls.
  status: "border border-gold/30 bg-gold/5 font-medium text-gold",
}

export function Chip({
  children,
  variant = "default",
  dot = false,
  pulse = false,
  className,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded px-3 py-1.5 text-xs transition-colors",
        VARIANT[variant],
        className,
      )}
      {...props}
    >
      {dot ? (
        <span
          className={cn(
            "inline-block rounded-full bg-gold",
            variant === "status" ? "h-2 w-2" : "h-1.5 w-1.5",
            pulse && "animate-pulse motion-reduce:animate-none",
          )}
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  )
}
