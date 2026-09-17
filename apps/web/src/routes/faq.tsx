import { createFileRoute } from "@tanstack/react-router"
import { FaqPage } from "#/features/faq/faq-page"

export const Route = createFileRoute("/faq")({
  component: FaqPage,
})
