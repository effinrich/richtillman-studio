import type { ComponentProps } from "react"
import { cn } from "./cn"

export type LabelProps = ComponentProps<"label">

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("mb-2 block font-mono text-xs uppercase tracking-widest text-white/50", className)}
      {...props}
    >
      {children}
    </label>
  )
}
