import type { NpmDownloadsModel } from "@richtillman/ui/models.ts"
import { ForgekitMcpScreen } from "@richtillman/ui/screens/forgekit-mcp-screen.tsx"

type ForgekitMcpPageProps = {
  npmDownloads: NpmDownloadsModel
}

export function ForgekitMcpPage({ npmDownloads }: ForgekitMcpPageProps) {
  return <ForgekitMcpScreen npmDownloads={npmDownloads} />
}
