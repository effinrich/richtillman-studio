import type { ReactNode } from "react"
import type { NavItem } from "../models"
import { CanvasBackground } from "./canvas-background"
import { NavigationBar } from "./navigation-bar"
import { SiteFooter } from "./site-footer"
import { TechTicker } from "./tech-ticker"

type PortfolioLayoutProps = {
  children: ReactNode
  activeItem?: NavItem
  showTicker?: boolean
}

export function PortfolioLayout({
  children,
  activeItem = "home",
  showTicker = false,
}: PortfolioLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <CanvasBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <NavigationBar activeItem={activeItem} />
        <div className="flex-1">{children}</div>
        {showTicker ? <TechTicker /> : null}
        <SiteFooter />
      </div>
    </div>
  )
}
