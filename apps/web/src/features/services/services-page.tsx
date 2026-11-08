import { ServicesScreen } from "@richtillman/ui/screens/services-screen.tsx"

import { getServices } from "#/features/content/queries/services"

export function ServicesPage() {
  return <ServicesScreen services={getServices()} />
}
