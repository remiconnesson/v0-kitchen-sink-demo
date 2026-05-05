import type { ReactNode } from "react"

interface StepsProps {
  children?: ReactNode
}

export default function Steps({ children }: StepsProps) {
  return (
    <div className="my-4 ml-4 border-l-2 border-primary/30 pl-6 [counter-reset:step]">
      {children}
    </div>
  )
}
