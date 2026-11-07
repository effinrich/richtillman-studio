import { createFileRoute } from "@tanstack/react-router"

import { getResumeSections } from "#/features/content/queries"
import { ResumePage } from "#/features/resume/resume-page"

export const Route = createFileRoute("/resume")({
  loader: () => getResumeSections(),
  component: ResumeRoute
})

function ResumeRoute() {
  const resume = Route.useLoaderData()
  return <ResumePage resume={resume} />
}
