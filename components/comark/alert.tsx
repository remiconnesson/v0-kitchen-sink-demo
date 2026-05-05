import type { ReactNode } from "react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
} as const

const styles = {
  info: "border-primary/30 bg-primary/5 text-primary",
  warning: "border-accent/30 bg-accent/5 text-accent-foreground",
  error: "border-destructive/30 bg-destructive/5 text-destructive",
  success: "border-secondary/30 bg-secondary/5 text-secondary-foreground",
} as const

type AlertType = keyof typeof styles

interface AlertProps {
  type?: AlertType
  children: ReactNode
}

export default function ComarkAlert({ type = "info", children }: AlertProps) {
  const Icon = icons[type] || Info
  return (
    <div
      className={cn(
        "my-4 flex gap-3 rounded-lg border-2 p-4",
        styles[type] ?? styles.info
      )}
      role="alert"
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="prose-sm [&>p]:m-0">{children}</div>
    </div>
  )
}
