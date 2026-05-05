import type { ReactNode } from "react"
import {
  InfoIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  ShieldAlertIcon,
} from "lucide-react"

const alertConfig = {
  note: {
    icon: InfoIcon,
    label: "Note",
    border: "border-blue-400 dark:border-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  tip: {
    icon: LightbulbIcon,
    label: "Tip",
    border: "border-emerald-400 dark:border-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-800 dark:text-emerald-200",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  important: {
    icon: AlertCircleIcon,
    label: "Important",
    border: "border-violet-400 dark:border-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950",
    text: "text-violet-800 dark:text-violet-200",
    iconColor: "text-violet-500 dark:text-violet-400",
  },
  warning: {
    icon: AlertTriangleIcon,
    label: "Warning",
    border: "border-amber-400 dark:border-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-800 dark:text-amber-200",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  caution: {
    icon: ShieldAlertIcon,
    label: "Caution",
    border: "border-red-400 dark:border-red-600",
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500 dark:text-red-400",
  },
} as const

type AlertType = keyof typeof alertConfig

interface GitHubAlertBlockquoteProps {
  as?: string
  children?: ReactNode
  [key: string]: unknown
}

/**
 * Custom blockquote element override.
 * When the comark `alert` plugin sets `as` on a blockquote
 * (e.g. as="note"), this renders a styled GitHub-style alert.
 * Otherwise it renders a standard blockquote.
 */
export default function GitHubAlertBlockquote({
  as,
  children,
  ...rest
}: GitHubAlertBlockquoteProps) {
  const alertType = as as AlertType | undefined
  const config = alertType ? alertConfig[alertType] : undefined

  if (!config) {
    // Render as a regular blockquote
    return (
      <blockquote
        className="my-3 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
        {...rest}
      >
        {children}
      </blockquote>
    )
  }

  const Icon = config.icon

  return (
    <div
      className={`my-3 rounded-lg border-l-4 ${config.border} ${config.bg} px-4 py-3`}
      role="alert"
    >
      <div className={`mb-1 flex items-center gap-2 font-semibold ${config.text}`}>
        <Icon className={`size-4 ${config.iconColor}`} />
        {config.label}
      </div>
      <div className={`${config.text} text-sm [&>p]:my-1`}>{children}</div>
    </div>
  )
}
