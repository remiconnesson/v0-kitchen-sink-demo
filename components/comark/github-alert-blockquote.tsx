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
    border: "border-blue-400",
    bg: "bg-blue-50",
    text: "text-blue-800",
    iconColor: "text-blue-500",
  },
  tip: {
    icon: LightbulbIcon,
    label: "Tip",
    border: "border-emerald-400",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    iconColor: "text-emerald-500",
  },
  important: {
    icon: AlertCircleIcon,
    label: "Important",
    border: "border-violet-400",
    bg: "bg-violet-50",
    text: "text-violet-800",
    iconColor: "text-violet-500",
  },
  warning: {
    icon: AlertTriangleIcon,
    label: "Warning",
    border: "border-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-800",
    iconColor: "text-amber-500",
  },
  caution: {
    icon: ShieldAlertIcon,
    label: "Caution",
    border: "border-red-400",
    bg: "bg-red-50",
    text: "text-red-800",
    iconColor: "text-red-500",
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
