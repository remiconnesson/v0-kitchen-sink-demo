"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ComarkTabsProps {
  tabs?: string
  children?: ReactNode
  slotTab1?: ReactNode
  slotTab2?: ReactNode
  slotTab3?: ReactNode
}

export default function ComarkTabs({
  tabs = "Tab 1,Tab 2",
  children,
  slotTab1,
  slotTab2,
  slotTab3,
}: ComarkTabsProps) {
  const tabNames = typeof tabs === "string" ? tabs.split(",").map((t) => t.trim()) : []
  const [active, setActive] = useState(0)
  const slots = [children, slotTab1, slotTab2, slotTab3].filter(Boolean)

  return (
    <div className="my-4 overflow-hidden rounded-xl border-2 border-border">
      <div className="flex border-b border-border bg-muted/30">
        {tabNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors",
              active === i
                ? "border-b-2 border-primary bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="p-4 [&>p]:m-0">{slots[active]}</div>
    </div>
  )
}
