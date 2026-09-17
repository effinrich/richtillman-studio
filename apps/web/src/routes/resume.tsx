import { createFileRoute } from "@tanstack/react-router"
import { ResumePage } from "#/features/resume/resume-page"

export const Route = createFileRoute("/resume")({
  component: ResumePage,
})
