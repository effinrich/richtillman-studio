import { ServicesScreen } from "@richtillman/ui"
import { getServices } from "#/features/content/queries"

export function ServicesPage() {
  return <ServicesScreen services={getServices()} />
}
