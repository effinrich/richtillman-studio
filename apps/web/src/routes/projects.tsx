import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  // This route is the layout for /projects/forgekit-mcp, so the redirect has to
  // fire for the index path only. Redirecting unconditionally sent the
  // ForgeKit MCP page to /work.
  beforeLoad: ({ location }) => {
    if (location.pathname.replace(/\/+$/, "") === "/projects") {
      throw redirect({ to: "/work" })
    }
  }
})
