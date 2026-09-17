import { FaqScreen } from "@richtillman/ui"
import { getFaqItems } from "#/features/content/queries"

export function FaqPage() {
  return <FaqScreen items={getFaqItems()} />
}
