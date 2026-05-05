"use client"

import { useState, useEffect } from "react"
import katex from "katex"

interface MathRendererProps {
  content: string
  className?: string
  [key: string]: unknown
}

/**
 * Custom Math renderer for Comark's math plugin.
 *
 * The comark parser produces tree nodes like:
 *   ['math', { class: 'math inline', content: '...' }, '...']
 *
 * ComarkRenderer remaps `class` -> `className` before passing to components.
 * The library's built-in Math component destructures `class` (not `className`),
 * so inline detection breaks. This component handles `className` correctly.
 */
export default function MathRenderer({ content, className = "" }: MathRendererProps) {
  const isInline = className.includes("inline")
  const [html, setHtml] = useState("")

  useEffect(() => {
    try {
      const rendered = katex.renderToString(content, {
        throwOnError: false,
        displayMode: !isInline,
      })
      setHtml(rendered)
    } catch {
      setHtml(`<span class="math-error">Failed to render math</span>`)
    }
  }, [content, isInline])

  if (isInline) {
    return (
      <span
        className="math inline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div
      className="math block my-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
