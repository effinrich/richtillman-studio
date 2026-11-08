import { createServerFn } from "@tanstack/react-start"

import { TESTIMONIALS } from "#/features/content/seed/testimonials"
import { supabase } from "#/features/supabase/client"

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  if (!supabase) return TESTIMONIALS

  const { data, error } = await supabase.from("testimonials").select("*")
  if (error || !data?.length) return TESTIMONIALS

  return data.map((row) => ({
    id: row.id,
    quote: row.quote,
    author: row.author,
    role: row.role,
    company: row.company
  }))
})
