import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "./cn"

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
