import { ResourcesScreen } from "@richtillman/ui"
import { getResources } from "#/features/content/queries"

export function ResourcesPage() {
  return <ResourcesScreen resources={getResources()} />
}
