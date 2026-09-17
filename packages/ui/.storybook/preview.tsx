import type { Preview } from "@storybook/react-vite"
import "@richtillman/ui/styles.css"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
    layout: "centered",
    chromatic: {
      pauseAnimationAtEnd: true,
      diffThreshold: 0.2,
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
