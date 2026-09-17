import {
  ARTICLES,
  CASE_STUDIES,
  FAQ_ITEMS,
  PROJECTS,
  RESUME_SECTIONS,
  RESOURCES,
  SERVICES,
  TESTIMONIALS,
} from "#/features/content/seed-data"
import { supabase } from "#/features/supabase/client"

export async function getProjects() {
  if (!supabase) return PROJECTS

  const { data, error } = await supabase.from("projects").select("*").order("created_at")
  if (error || !data?.length) return PROJECTS

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    tags: row.tags,
    metric: row.metric ?? undefined,
    href: row.href,
    image: row.image ?? undefined,
    featured: row.featured,
  }))
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) ?? null
}

export async function getArticles() {
  if (!supabase) return ARTICLES

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
  if (error || !data?.length) return ARTICLES

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.published_at,
    readTime: row.read_time,
    featured: row.featured,
    content: row.content,
  }))
}

export async function getArticleBySlug(slug: string) {
  if (!supabase) {
    return ARTICLES.find((a) => a.slug === slug) ?? null
  }

  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()
  if (error || !data) return ARTICLES.find((a) => a.slug === slug) ?? null

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    publishedAt: data.published_at,
    readTime: data.read_time,
    featured: data.featured,
    content: data.content,
  }
}

export async function getTestimonials() {
  if (!supabase) return TESTIMONIALS

  const { data, error } = await supabase.from("testimonials").select("*")
  if (error || !data?.length) return TESTIMONIALS

  return data.map((row) => ({
    id: row.id,
    quote: row.quote,
    author: row.author,
    role: row.role,
    company: row.company,
  }))
}

export function getServices() {
  return SERVICES
}

export function getCaseStudies() {
  return CASE_STUDIES
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((cs) => cs.slug === slug) ?? null
}

export function getFaqItems() {
  return FAQ_ITEMS
}

export function getResources() {
  return RESOURCES
}

export function getResumeSections() {
  return RESUME_SECTIONS
}

export async function submitContactForm(input: {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
}) {
  if (!supabase) {
    return { success: true, id: "local-dev" }
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      project_type: input.projectType,
      message: input.message,
    })
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  return { success: true, id: data.id }
}
