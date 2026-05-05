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
  info: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200",
  warning: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200",
  error: "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-950 dark:text-red-200",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
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
