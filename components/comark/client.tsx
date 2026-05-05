"use client"

import { ComarkClient } from "@comark/react"
import type { ParseOptions } from "comark"
import type { ReactNode } from "react"
import { comarkComponents } from "./components-map"

interface AppComarkClientProps {
  children?: ReactNode
  markdown?: string
  streaming?: boolean
  caret?: boolean
  className?: string
  components?: Record<string, React.ComponentType<unknown>>
  plugins?: ParseOptions["plugins"]
}

/**
 * Pre-configured Client Component wrapper around ComarkClient.
 * Use this anywhere you need Comark rendering inside a "use client" tree
 * (playground, streaming demos, interactive sections, etc.).
 *
 * Props are forwarded to ComarkClient, which parses on the client
 * via useMemo + Suspense.
 */
export default function AppComarkClient({
  children,
  markdown,
  streaming,
  caret,
  className,
  components: extraComponents,
  plugins,
}: AppComarkClientProps) {
  const mergedComponents = {
    ...comarkComponents,
    ...extraComponents,
  }

  return (
    <ComarkClient
      markdown={children ? String(children) : markdown}
      components={mergedComponents}
      streaming={streaming}
      caret={caret}
      className={className}
      plugins={plugins}
    />
  )
}
