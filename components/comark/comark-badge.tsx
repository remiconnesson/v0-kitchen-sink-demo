import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const colorMap: Record<string, string> = {
  blue: "bg-primary/10 text-primary border-primary/20",
  green: "bg-secondary/10 text-secondary border-secondary/20",
  red: "bg-destructive/10 text-destructive border-destructive/20",
  yellow: "bg-accent/10 text-accent-foreground border-accent/20",
  default: "bg-muted text-muted-foreground border-border",
}

interface ComarkBadgeProps {
  color?: string
  children?: ReactNode
}

export default function ComarkBadge({
  color = "default",
  children,
}: ComarkBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colorMap[color] ?? colorMap.default
      )}
    >
      {children}
    </span>
  )
}
