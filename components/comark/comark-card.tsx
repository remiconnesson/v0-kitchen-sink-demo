import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ComarkCardProps {
  title?: string
  children?: ReactNode
  slotHeader?: ReactNode
  slotFooter?: ReactNode
  class?: string
}

export default function ComarkCard({
  title,
  children,
  slotHeader,
  slotFooter,
  class: className,
}: ComarkCardProps) {
  return (
    <div
      className={cn(
        "my-4 overflow-hidden rounded-xl border-2 border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {(slotHeader || title) && (
        <div className="border-b border-border bg-muted/30 px-5 py-3">
          {slotHeader ?? (
            <h3 className="text-lg font-semibold">{title}</h3>
          )}
        </div>
      )}
      <div className="px-5 py-4 [&>p]:m-0">{children}</div>
      {slotFooter && (
        <div className="border-t border-border bg-muted/20 px-5 py-3 text-sm text-muted-foreground">
          {slotFooter}
        </div>
      )}
    </div>
  )
}
