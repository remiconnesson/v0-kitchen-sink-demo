"use client"

import { useState } from "react"
import { AppComark } from "@/components/comark"
import { Pencil, Eye } from "lucide-react"

const INITIAL = `# Try it yourself!

Write any **Markdown** here and use Comark components.

::alert{type="success"}
Edit this text to see live rendering below.
::

::card{title="Your Card"}
Cards support **markdown** in their body.

#footer
And named slots like this footer.
::

Inline components work too: :badge[Cool]{color="blue"} right in text.
`

export default function Playground() {
  const [value, setValue] = useState(INITIAL)

  return (
    <section id="playground" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Live Playground
        </h2>
        <p className="mt-1 text-muted-foreground text-pretty">
          Edit the MDC source on the left and see the rendered output update in
          real time. All registered components (alert, card, badge, callout,
          steps, step, tabs, divider) are available.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-border bg-muted/20 p-1">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Pencil className="size-3.5" />
            Editor
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            className="h-80 w-full resize-none rounded-lg bg-foreground/5 p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Type Comark MDC here..."
          />
        </div>

        <div className="rounded-xl border-2 border-border bg-card p-1">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Eye className="size-3.5" />
            Preview
          </div>
          <div className="h-80 overflow-y-auto rounded-lg p-4">
            <AppComark>{value}</AppComark>
          </div>
        </div>
      </div>
    </section>
  )
}
