import { useEffect, useState } from "react"
import { cn } from "./cn"

export type InPageTab = {
  href: `#${string}`
  label: string
}

function idFromHref(href: InPageTab["href"]): string {
  return href.slice(1)
}

function remToPx(value: string, fallbackPx: number): number {
  const trimmed = value.trim()
  if (trimmed.endsWith("rem")) {
    const rem = Number.parseFloat(trimmed)
    if (Number.isFinite(rem)) return rem * 16
  }
  if (trimmed.endsWith("px")) {
    const px = Number.parseFloat(trimmed)
    if (Number.isFinite(px)) return px
  }
  return fallbackPx
}

export function InPageTabs({
  items,
  ariaLabel = "On this page",
}: {
  items: readonly InPageTab[]
  ariaLabel?: string
}) {
  const [activeHref, setActiveHref] = useState<InPageTab["href"] | null>(null)

  useEffect(() => {
    const syncFromHash = () => {
      const match = items.find((item) => item.href === window.location.hash)
      if (match) setActiveHref(match.href)
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)

    const observed = items
      .map((item) => document.getElementById(idFromHref(item.href)))
      .filter((node): node is HTMLElement => node !== null)

    const styles = getComputedStyle(document.documentElement)
    const stackPx =
      remToPx(styles.getPropertyValue("--site-header-height"), 80) +
      remToPx(styles.getPropertyValue("--ds-subnav-height"), 56)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          // oxlint-disable-next-line unicorn/no-array-sort
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const top = visible[0]
        if (!top) return
        const href = `#${top.target.id}`
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        if (items.some((item) => item.href === href)) setActiveHref(href as InPageTab["href"])
      },
      {
        rootMargin: `-${stackPx}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.4],
      },
    )

    for (const node of observed) observer.observe(node)

    return () => {
      window.removeEventListener("hashchange", syncFromHash)
      observer.disconnect()
    }
  }, [items])

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-[calc(var(--site-header-height)-1px)] z-30 -mx-6 mb-20 border-b border-white/10 bg-black px-6"
    >
      <ul className="flex h-[var(--ds-subnav-height)] items-stretch gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isCurrent = activeHref === item.href
          return (
            <li key={item.href} className="flex shrink-0">
              <a
                href={item.href}
                aria-current={isCurrent ? "location" : undefined}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center border-b-2 px-3 text-sm tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isCurrent
                    ? "border-gold font-medium text-white"
                    : "border-transparent text-white/50 hover:text-white/80",
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
