import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonAnchor } from "../button"
import { SAMPLE_PROJECTS } from "../fixtures"
import { DesignSystemScreen } from "./design-system-screen"

const meta: Meta<typeof DesignSystemScreen> = {
  title: "Screens/DesignSystem",
  component: DesignSystemScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof DesignSystemScreen>

export const Default: Story = {
  args: {
    specimenProject: SAMPLE_PROJECTS[1]!,
    actions: (
      <ButtonAnchor href="/work" variant="primary">
        See selected work
      </ButtonAnchor>
    ),
  },
}
