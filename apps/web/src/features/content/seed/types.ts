// The shape of every seed collection. Kept in one place so the collections
// stay independent of each other.
export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  metric?: string
  href: string
  image?: string
  featured: boolean
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  featured: boolean
  content: string[]
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  summary: string
  metrics: { label: string; value: string }[]
  image?: string
  liveHref?: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type Resource = {
  id: string
  title: string
  description: string
  category: string
  href: string
}

export type ResumeContent = {
  summary: string
  experience: {
    title: string
    company: string
    period: string
    highlights: string[]
  }[]
  projects: {
    title: string
    detail: string
  }[]
  skills: string[]
}
