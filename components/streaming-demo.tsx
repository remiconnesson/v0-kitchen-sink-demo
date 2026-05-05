"use client"

import { useState, useRef, useCallback } from "react"
import { Comark } from "@comark/react"
import ComarkAlert from "@/components/comark/alert"
import ComarkCard from "@/components/comark/comark-card"
import ComarkBadge from "@/components/comark/comark-badge"
import { Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const STREAMING_CONTENT = `# Streaming Demo

This content is being **streamed** token by token, just like an LLM response.

::alert{type="info"}
Comark handles incomplete syntax gracefully with \`autoClose\`.
::

Here is a list that builds up:

- First item arrives
- Then the second
- And finally the **third**

The :badge[streaming]{color="green"} mode keeps the UI responsive throughout.

::card{title="Real-Time Rendering"}
Comark re-parses on every chunk and the React renderer efficiently diffs the output.
::
`

const components = {
  alert: ComarkAlert,
  card: ComarkCard,
  badge: ComarkBadge,
}

export default function StreamingDemo() {
  const [content, setContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startStreaming = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setContent("")
    setIsStreaming(true)

    let index = 0
    const words = STREAMING_CONTENT.split(/(\s+)/)

    function emitNext() {
      if (index >= words.length) {
        setIsStreaming(false)
        return
      }
      // Add 1-3 tokens at a time for a realistic feel
      const count = Math.min(1 + Math.floor(Math.random() * 3), words.length - index)
      const chunk = words.slice(index, index + count).join("")
      index += count
      setContent((prev) => prev + chunk)
      timerRef.current = setTimeout(emitNext, 30 + Math.random() * 60)
    }

    emitNext()
  }, [])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setContent("")
    setIsStreaming(false)
  }, [])

  return (
    <section id="streaming" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Streaming Mode
        </h2>
        <p className="mt-1 text-muted-foreground text-pretty">
          Comark can render content as it arrives, token by token. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            streaming
          </code>{" "}
          prop tells the renderer content is still arriving, and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            caret
          </code>{" "}
          adds a blinking cursor. The parser auto-closes incomplete markdown so
          partial bold, lists, and components render correctly mid-stream.
        </p>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={startStreaming}
          disabled={isStreaming}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border-2 border-border px-4 py-2 text-sm font-medium transition-colors",
            isStreaming
              ? "cursor-not-allowed opacity-50"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Play className="size-4" />
          {isStreaming ? "Streaming..." : "Start Stream"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>

      <div className="rounded-xl border-2 border-border bg-card p-5 min-h-[200px]">
        {content ? (
          <Comark streaming={isStreaming} caret components={components}>
            {content}
          </Comark>
        ) : (
          <p className="text-muted-foreground italic">
            Press &quot;Start Stream&quot; to simulate an LLM streaming response...
          </p>
        )}
      </div>
    </section>
  )
}
