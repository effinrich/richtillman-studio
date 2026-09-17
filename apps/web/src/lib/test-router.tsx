import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterContextProvider,
} from "@tanstack/react-router"
import type { ReactNode } from "react"

// Real TanStack Router harness for unit tests. The Storybook environment
// mocks `@tanstack/react-router` (Link renders the raw `to`), so resolved
// hrefs like "/insights/the-model-context-protocol" can only be verified
// here, against the real Link implementation.
export function TestRouterProvider({ children }: { children: ReactNode }) {
  const rootRoute = createRootRoute()
  const insightsDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/insights/$slug",
    component: () => null,
  })
  const caseStudyDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/case-studies/$slug",
    component: () => null,
  })
  const routeTree = rootRoute.addChildren([insightsDetailRoute, caseStudyDetailRoute])
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  })
  return <RouterContextProvider router={router}>{children}</RouterContextProvider>
}
