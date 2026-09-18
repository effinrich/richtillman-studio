import type { ComponentProps } from "react"
import { cn } from "./cn"

export type TextareaProps = ComponentProps<"textarea"> & {
  error?: string
}

export function Textarea({ id, error, className, ...props }: TextareaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(
        "glass-input min-h-11 w-full resize-none rounded px-4 py-3 text-white placeholder:text-white/50",
        className,
      )}
      {...props}
    />
  )
}
