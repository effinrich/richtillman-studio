import { supabase } from "#/features/supabase/client"

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
      message: input.message
    })
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  return { success: true, id: data.id }
}
