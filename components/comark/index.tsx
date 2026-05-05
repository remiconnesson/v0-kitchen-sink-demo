"use client"

import { defineComarkComponent } from "@comark/react"
import ComarkAlert from "./alert"
import ComarkCard from "./comark-card"
import ComarkBadge from "./comark-badge"
import Callout from "./callout"
import Steps from "./steps"
import Step from "./step"
import ComarkTabs from "./comark-tabs"
import Divider from "./divider"

/**
 * Pre-configured Comark component with all custom components registered.
 * Usage: <AppComark>{markdownString}</AppComark>
 */
export const AppComark = defineComarkComponent({
  name: "AppComark",
  components: {
    alert: ComarkAlert,
    card: ComarkCard,
    badge: ComarkBadge,
    callout: Callout,
    steps: Steps,
    step: Step,
    tabs: ComarkTabs,
    divider: Divider,
  },
})

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
