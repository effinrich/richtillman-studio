import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let viewTransitionRejectionGuardInstalled = false;

// TanStack Router calls document.startViewTransition() without awaiting or
// catching the returned transition's promises (router.js `startViewTransition`).
// A fast second navigation (double-click, rapid nav) makes the browser abort
// the in-flight transition, which rejects with InvalidStateError — spec-standard,
// harmless to navigation, but surfaces as an unhandled rejection. Swallow only
// that specific, known case so real errors still surface.
function installViewTransitionRejectionGuard() {
  if (viewTransitionRejectionGuardInstalled || typeof window === "undefined") return;
  viewTransitionRejectionGuardInstalled = true;

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    if (
      reason instanceof DOMException &&
      (reason.name === "InvalidStateError" || reason.name === "AbortError") &&
      /Transition was aborted|Old view transition aborted by new view transition|Transition was skipped/.test(
        reason.message,
      )
    ) {
      event.preventDefault();
    }
  });
}

export function getRouter() {
  installViewTransitionRejectionGuard();

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
