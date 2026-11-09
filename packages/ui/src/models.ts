import type { ReactNode } from "react"

export type Metric = {
  value: string
  label: string
}

export type NpmDownloadsModel = {
  /** Last day counted by the npm downloads API, as an ISO date. */
  measuredAt: string
  /** False when the counts came from the bundled fallback rather than the API. */
  live: boolean
  /** Download count per published npm package, over the last 12 months. */
  packages: { name: string; downloads: number }[]
}

export type ProjectCardModel = {
  slug: string
  title: string
  description: string
  tags: string[]
  href: string
  metric?: string
  image?: string
}

export type ArticleCardModel = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  href: string
  featured?: boolean
  content?: string[]
}

/**
 * One published article, as the writing index renders it. The link points at
 * the post on DEV Community, not at a copy of it.
 */
export type WritingEntryModel = {
  id: number
  title: string
  description: string
  url: string
  publishedAt: string
  readingTime: string
  tags: string[]
  reactions: number
  comments: number
}

export type TestimonialModel = {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export type ServiceModel = {
  id: string
  title: string
  description: string
  icon: string
}

export type CaseStudyModel = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  summary: string
  metrics: { label: string; value: string }[]
  href: string
  image?: string
  liveHref?: string
}

export type CaseStudySection = {
  label: string
  body: string
}

export type FaqItemModel = {
  id: string
  question: string
  answer: string
}

export type ResourceModel = {
  id: string
  title: string
  description: string
  category: string
  href: string
}

export type ResumeModel = {
  summary: string
  experience: Array<{
    title: string
    company: string
    period: string
    highlights: string[]
  }>
  projects: Array<{
    title: string
    detail: string
  }>
  skills: string[]
}

export type SiteMapAccent = "gold" | "cyan" | "magenta"

export type SiteMapLinkModel = {
  title: string
  description: string
  href: string
  accent: SiteMapAccent
}

export type SiteMapSectionModel = {
  id: string
  label: string
  accent: SiteMapAccent
  links: Omit<SiteMapLinkModel, "accent">[]
}

export type ContactSubmitInput = {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
  /**
   * The hidden field the form carries for bots. It is empty for every real
   * submission, and the server refuses the ones that filled it.
   */
  companyWebsite?: string
}

export type ContactSubmitHandler = (input: ContactSubmitInput) => Promise<unknown>

export type ColorToken = {
  name: string
  cssVar: string
  value: string
  usage: string
}

export type TypeSpecimen = {
  role: string
  sample: string
  spec: string
  className: string
}

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
  | "writing"

export type NavLink = {
  label: string
  href: string
  item: NavItem
}

export type ScreenActions = ReactNode
