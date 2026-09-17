/** Active section key for layout chrome highlighting. */
export type NavItem =
  | "home"
  | "work"
  | "stack"
  | "contact"
  | "insights"
  | "services"
  | "testimonials"
  | "resources"
  | "case-studies"
  | "faq"
  | "resume"
  | "design-system"

export type NavLink = {
  label: string
  href: string
  item: NavItem
}

/** Primary header links. `/projects` redirects to `/work` — do not list both. */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Work", href: "/work", item: "work" },
  { label: "Stack", href: "/resources", item: "stack" },
  { label: "Design System", href: "/design-system", item: "design-system" },
  { label: "Resume", href: "/resume", item: "resume" },
  { label: "Contact", href: "/contact", item: "contact" },
]

export const SECONDARY_NAV: NavLink[] = [
  { label: "Insights", href: "/insights", item: "insights" },
  { label: "Services", href: "/services", item: "services" },
  { label: "Case Studies", href: "/case-studies", item: "case-studies" },
  { label: "Testimonials", href: "/testimonials", item: "testimonials" },
  { label: "FAQ", href: "/faq", item: "faq" },
  { label: "Resume", href: "/resume", item: "resume" },
  { label: "Site Map", href: "/site-map", item: "home" },
]
