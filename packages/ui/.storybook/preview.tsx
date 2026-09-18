import type { Preview } from "@storybook/react-vite"
import "@richtillman/ui/styles.css"

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
    layout: "centered",
    a11y: {
      test: "error",
    },
    chromatic: {
      pauseAnimationAtEnd: true,
      delay: 300,
      diffThreshold: 0.5,
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1280px", height: "800px" } },
      },
    },
  },
}

export default preview
