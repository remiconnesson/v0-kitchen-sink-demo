'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({
  filename,
  language,
  children,
}: {
  filename: string
  language: string
  children: string
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground font-mono">
          {filename}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground/60">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto bg-card p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground/90">{children}</code>
      </pre>
    </div>
  )
}
