import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Preview } from "@storybook/tanstack-react"
import "@richtillman/ui/styles.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
})

const preview: Preview = {
  beforeEach: () => {
    queryClient.clear()
  },
  parameters: {
    tanstack: {
      router: {
        context: { queryClient },
      },
    },
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
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default preview
