import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonAnchor } from "../button"
import { SAMPLE_CASE_STUDIES } from "../fixtures"
import { CaseStudiesScreen } from "./case-studies-screen"

const meta: Meta<typeof CaseStudiesScreen> = {
  title: "Screens/CaseStudies",
  component: CaseStudiesScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof CaseStudiesScreen>

export const Default: Story = {
  args: {
    caseStudies: SAMPLE_CASE_STUDIES,
    renderCta: (study) => (
      <ButtonAnchor href={study.href} variant="ghost">
        Read case study
      </ButtonAnchor>
    ),
  },
}
