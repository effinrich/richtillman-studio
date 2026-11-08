// The full seed content, re-exported from the per-collection modules.
//
// The server keeps the whole seed available as the fallback when Supabase is
// not configured. Client code imports the collection it renders instead of
// this barrel, so a route only ships the content it uses.
export * from "./seed/types"
export { METRICS } from "./seed/metrics"
export { PROJECTS } from "./seed/projects"
export { ARTICLES } from "./seed/articles"
export { TESTIMONIALS } from "./seed/testimonials"
export { SERVICES } from "./seed/services"
export { CASE_STUDIES } from "./seed/case-studies"
export { FAQ_ITEMS } from "./seed/faq"
export { RESOURCES } from "./seed/resources"
export { RESUME_SECTIONS } from "./seed/resume"
