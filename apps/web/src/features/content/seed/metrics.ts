// Every figure here is checkable: npm download counts come from the npm
// registry API, Lighthouse scores were measured with Lighthouse 12.8.2, and
// the Freebird, Pineapple, and Redesign Health figures match the resume.
export const METRICS = [
  {
    value: "{{npm_downloads}}",
    label: "npm downloads in 12 months · {{npm_package_count}} published packages"
  },
  { value: "200", label: "components in the Freebird design system" },
  { value: "100K+", label: "users on the Pineapple React Native app" }
] as const
