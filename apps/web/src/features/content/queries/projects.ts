import { createServerFn } from "@tanstack/react-start"

import { applyNpmDownloads, getNpmDownloads } from "#/features/content/npm-downloads"
import { PROJECTS } from "#/features/content/seed/projects"
import { supabase } from "#/features/supabase/client"

async function loadProjects() {
  const model = await getNpmDownloads()

  if (!supabase) return applyNpmDownloads(PROJECTS, model)

  const { data, error } = await supabase.from("projects").select("*").order("created_at")
  if (error || !data?.length) return applyNpmDownloads(PROJECTS, model)

  return applyNpmDownloads(
    data.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      tags: row.tags,
      metric: row.metric ?? undefined,
      href: row.href,
      image: row.image ?? undefined,
      featured: row.featured
    })),
    model
  )
}

export const getProjects = createServerFn({ method: "GET" }).handler(loadProjects)

export const getSpecimenProject = createServerFn({ method: "GET" }).handler(async () => {
  const projects = await loadProjects()
  const specimen = projects.find((project) => project.slug === "forgekit-mcp") ?? projects[0]

  if (!specimen) {
    throw new Error("No project is available for the design system specimen")
  }

  return specimen
})
