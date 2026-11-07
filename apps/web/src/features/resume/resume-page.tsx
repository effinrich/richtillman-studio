import { ResumeScreen } from "@richtillman/ui"
import type { ResumeModel } from "@richtillman/ui"

type ResumePageProps = {
  resume: ResumeModel
}

export function ResumePage({ resume }: ResumePageProps) {
  return <ResumeScreen resume={resume} />
}
