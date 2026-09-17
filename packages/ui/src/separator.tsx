import { cn } from "./cn"

export type SeparatorProps = {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Separator({
  className,
  orientation = "horizontal",
}: SeparatorProps) {
  if (orientation === "vertical") {
    return <div aria-hidden className={cn("h-full w-px shrink-0 bg-white/10", className)} />
  }

  return <hr className={cn("h-px w-full shrink-0 border-0 bg-white/10", className)} />
}
