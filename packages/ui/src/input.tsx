import type { ComponentProps } from "react"
import { cn } from "./cn"

export type InputProps = ComponentProps<"input"> & {
  error?: string
}

export function Input({ id, error, className, ...props }: InputProps) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(
        "glass-input min-h-11 w-full rounded px-4 py-3 text-white placeholder:text-white/50",
        className,
      )}
      {...props}
    />
  )
}
