interface DividerProps {
  label?: string
}

export default function Divider({ label }: DividerProps) {
  if (label) {
    return (
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    )
  }
  return <hr className="my-8 border-t-2 border-border" />
}
