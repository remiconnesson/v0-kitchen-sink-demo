import { defineComarkComponent } from "@comark/react"
import { comarkComponents } from "./components-map"

/**
 * Pre-configured async Server Component wrapper.
 * Use this in Server Components only (no "use client").
 *
 * Usage: <AppComark>{markdownString}</AppComark>
 */
export const AppComark = defineComarkComponent({
  name: "AppComark",
  components: comarkComponents,
})

// Re-export everything from the shared map for convenience
export {
  comarkComponents,
  ComarkAlert,
  ComarkCard,
  ComarkBadge,
  Callout,
  Steps,
  Step,
  ComarkTabs,
  Divider,
} from "./components-map"
