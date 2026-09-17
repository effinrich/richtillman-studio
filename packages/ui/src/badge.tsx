import type { ReactNode } from "react"
import { cn } from "./cn"

type BadgeProps = {
  children: ReactNode
  variant?: "gold" | "cyan" | "magenta" | "neutral"
  className?: string
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  gold: "bg-gold/10 border-gold/30 text-gold",
  cyan: "bg-cyan/10 border-cyan/30 text-cyan",
  magenta: "bg-magenta/10 border-magenta/30 text-magenta",
  neutral: "bg-white/5 border-white/10 text-white/70",
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
