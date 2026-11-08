import { FaqScreen } from "@richtillman/ui/screens/faq-screen.tsx"

import { getFaqItems } from "#/features/content/queries/faq"

export function FaqPage() {
  return <FaqScreen items={getFaqItems()} />
}
