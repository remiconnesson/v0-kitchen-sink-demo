"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import AppComarkClient from "@/components/comark/client"
import { Code, Eye } from "lucide-react"

interface DemoSectionProps {
  id: string
  title: string
  description: string
  source: string
  children?: ReactNode
}

/**
 * A reusable section that shows the Comark MDC source code alongside
 * the live rendered output. Toggles between "Source" and "Preview" on
 * small screens; shows both side-by-side on large screens.
 */
export default function DemoSection({
  id,
  title,
  description,
  source,
}: DemoSectionProps) {
  const [tab, setTab] = useState<"preview" | "source">("preview")

  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground text-balance">
          {title}
        </h2>
        <p className="mt-1 text-muted-foreground text-pretty">{description}</p>
      </div>

      {/* Mobile tab switcher */}
      <div className="flex gap-1 rounded-lg bg-muted/50 p-1 lg:hidden mb-3">
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "preview"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          <Eye className="size-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setTab("source")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "source"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          <Code className="size-4" />
          MDC Source
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Rendered output */}
        <div
          className={cn(
            "rounded-xl border-2 border-border bg-card p-5",
            tab === "source" && "hidden lg:block"
          )}
        >
          <div className="mb-2 hidden items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground lg:flex">
            <Eye className="size-3.5" />
            Rendered Output
          </div>
          <div className="comark-output">
            <AppComarkClient>{source}</AppComarkClient>
          </div>
        </div>

        {/* Source code */}
        <div
          className={cn(
            "rounded-xl border-2 border-border bg-muted/20 p-5",
            tab === "preview" && "hidden lg:block"
          )}
        >
          <div className="mb-2 hidden items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground lg:flex">
            <Code className="size-3.5" />
            MDC Source
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-foreground/5 p-4 font-mono text-sm leading-relaxed text-foreground">
            {source}
          </pre>
        </div>
      </div>
    </section>
  )
}
