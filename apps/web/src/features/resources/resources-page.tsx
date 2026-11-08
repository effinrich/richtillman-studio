import { ResourcesScreen } from "@richtillman/ui/screens/resources-screen.tsx"

import { getResources } from "#/features/content/queries/resources"

export function ResourcesPage() {
  return <ResourcesScreen resources={getResources()} />
}
