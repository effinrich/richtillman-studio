import { Menu, X } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { Chip } from "../chip"
import { cn } from "../cn"
import type { NavItem } from "../models"
import { PRIMARY_NAV } from "./nav"

type NavigationBarProps = {
  activeItem?: NavItem
  isAvailable?: boolean
}

export function NavigationBar({ activeItem = "home", isAvailable = true }: NavigationBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (media.matches) setMenuOpen(false)
    }
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/*
        Avoid glass-panel / backdrop-filter on this fixed header.
        With body overflow-x: hidden, Chromium can expand the backdrop
        into a full-viewport frost layer once content scrolls behind the nav.
      */}
      <nav
        className="fixed top-0 left-0 z-40 w-full bg-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_1px_0_0_rgba(255,255,255,0.1)]"
        aria-label="Primary"
      >
        <div className="mx-auto flex h-[var(--site-header-height)] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href="/"
            className="flex min-h-11 min-w-0 items-center gap-3 sm:gap-4"
            onClick={closeMenu}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/20 bg-zinc-900 font-mono text-sm font-bold text-gold">
              R
            </div>
            <span className="hidden min-w-0 truncate font-medium tracking-tight text-white/90 sm:inline-block">
              Rich Tillman
              <span className="hidden font-normal text-white/40 lg:inline">
                {" "}
                / Principal Frontend Engineer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-5 text-sm font-medium md:flex lg:gap-8">
            {PRIMARY_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex min-h-11 items-center px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  activeItem === link.item ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isAvailable ? (
              <Chip variant="status" dot pulse>
                Available
              </Chip>
            ) : null}

            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          id={menuId}
          className={cn("border-t border-white/10 md:hidden", menuOpen ? "block" : "hidden")}
          hidden={!menuOpen}
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {PRIMARY_NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "flex min-h-11 items-center px-1 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    activeItem === link.item ? "text-white" : "text-white/60 hover:text-white",
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </>
  )
}
