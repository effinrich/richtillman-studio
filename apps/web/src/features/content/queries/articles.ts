import { createServerFn } from "@tanstack/react-start"

import { slugValidator } from "#/features/content/queries/slug"
import { ARTICLES } from "#/features/content/seed/articles"
import { supabase } from "#/features/supabase/client"

async function loadArticles() {
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
    content: row.content
  }))
}

export const getArticles = createServerFn({ method: "GET" }).handler(loadArticles)

export const getArticleBySlug = createServerFn({ method: "POST" })
  .validator(slugValidator)
  .handler(async ({ data: slug }) => {
    if (!supabase) {
      return ARTICLES.find((article) => article.slug === slug) ?? null
    }

    const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()
    if (error || !data) return ARTICLES.find((article) => article.slug === slug) ?? null

    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      publishedAt: data.published_at,
      readTime: data.read_time,
      featured: data.featured,
      content: data.content
    }
  })
