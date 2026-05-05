import type { ComponentType } from "react"
import ComarkAlert from "./alert"
import ComarkCard from "./comark-card"
import ComarkBadge from "./comark-badge"
import Callout from "./callout"
import Steps from "./steps"
import Step from "./step"
import ComarkTabs from "./comark-tabs"
import Divider from "./divider"

/**
 * Shared component map — used by both the server-side AppComark
 * and the client-side AppComarkClient wrappers.
 *
 * This file is intentionally separate from index.tsx so that
 * client components can import it without pulling in the async
 * Comark server component.
 */
// biome-ignore lint/suspicious/noExplicitAny: component props vary
export const comarkComponents: Record<string, ComponentType<any>> = {
  alert: ComarkAlert,
  card: ComarkCard,
  badge: ComarkBadge,
  callout: Callout,
  steps: Steps,
  step: Step,
  tabs: ComarkTabs,
  divider: Divider,
}

export {
  ComarkAlert,
  ComarkCard,
  ComarkBadge,
  Callout,
  Steps,
  Step,
  ComarkTabs,
  Divider,
}
