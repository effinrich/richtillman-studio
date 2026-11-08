import type { ResumeModel } from "@richtillman/ui/models.ts"
import { ResumeScreen } from "@richtillman/ui/screens/resume-screen.tsx"

type ResumePageProps = {
  resume: ResumeModel
}

export function ResumePage({ resume }: ResumePageProps) {
  return <ResumeScreen resume={resume} />
}
