import type { ReactNode } from "react"

interface StepProps {
  title?: string
  children?: ReactNode
}

export default function Step({ title, children }: StepProps) {
  return (
    <div className="relative pb-6 [counter-increment:step]">
      <div className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary before:content-[counter(step)]" />
      {title && (
        <h4 className="mb-1 font-semibold text-foreground">{title}</h4>
      )}
      <div className="text-muted-foreground [&>p]:m-0">{children}</div>
    </div>
  )
}
