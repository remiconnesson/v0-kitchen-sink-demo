import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  emoji?: string
  children?: ReactNode
}

export default function Callout({ emoji = "💡", children }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-4 flex gap-3 rounded-lg border-2 border-primary/20 bg-primary/5 px-4 py-3"
      )}
    >
      <span className="text-xl leading-7" aria-hidden="true">
        {emoji}
      </span>
      <div className="flex-1 [&>p]:m-0">{children}</div>
    </div>
  )
}
