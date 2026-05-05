"use client"

import { useState, useCallback } from "react"
import { Copy, Check, BotMessageSquare } from "lucide-react"

const LLM_SYSTEM_PROMPT = `You are a content writer that outputs structured Markdown using **Comark MDC syntax** — an extension of standard Markdown that adds component directives.

## Rules

1. Write valid CommonMark Markdown for all standard formatting (headings, bold, italic, links, lists, code blocks, blockquotes, tables).
2. Use MDC component syntax to embed rich UI components. Components are case-sensitive and must match the registered names exactly.
3. Never invent component names that are not listed below.
4. Every block component must be closed with \`::\` (or matching colons for nested levels).

---

## MDC Syntax Reference

### Block Components

Open with \`::\`, close with \`::\`. Props go in curly braces. Content between the delimiters becomes \`children\`.

\`\`\`
::component-name{prop="value" anotherProp="value"}
Markdown content here (rendered as children)
::
\`\`\`

### Inline Components

Single colon, square brackets for visible text, curly braces for props:

\`\`\`
:component-name[visible text]{prop="value"}
\`\`\`

### YAML Frontmatter Props

For complex props (arrays, objects), use a YAML block between \`---\` fences inside the component:

\`\`\`
::component-name
---
title: My Title
items:
  - one
  - two
---
Body content
::
\`\`\`

### Named Slots

Use \`#slotName\` inside a block component to assign content to a named slot:

\`\`\`
::card{title="Example"}
#header
This goes into the slotHeader prop

Default content goes into children

#footer
This goes into the slotFooter prop
::
\`\`\`

### Nesting Components

Add extra colons for each nesting level:

\`\`\`
::outer
:::inner
Content
:::
::
\`\`\`

### Element Attributes

Add attributes to inline markdown elements:

\`\`\`
**bold text**{.my-class}
[styled span]{.bg-accent .px-2}
\`\`\`

---

## Available Components

### \`alert\` (block)
Colored alert box with icon. Types: info, warning, error, success.
\`\`\`
::alert{type="info"}
This is an informational message.
::
\`\`\`

### \`card\` (block)
Card with optional title and named slots for header/footer.
\`\`\`
::card{title="Card Title"}
#header
Optional header content

Main body content

#footer
Optional footer content
::
\`\`\`

### \`badge\` (inline)
Colored inline label. Colors: blue, green, red, yellow, default.
\`\`\`
Status: :badge[Active]{color="green"} or :badge[Deprecated]{color="red"}
\`\`\`

### \`callout\` (block)
Callout box with a leading emoji.
\`\`\`
::callout{emoji="💡"}
A helpful tip for the reader.
::
\`\`\`

### \`steps\` + \`step\` (block, nested)
Numbered step-by-step instructions.
\`\`\`
::steps
:::step{title="Install"}
Run \\\`pnpm add comark\\\`
:::
:::step{title="Configure"}
Add your components.
:::
::
\`\`\`

### \`tabs\` (block)
Tabbed content panel. List tab names in the \`tabs\` prop (comma-separated). Content goes in default slot and \`#tab1\`, \`#tab2\`, etc.
\`\`\`
::tabs{tabs="React,Vue,Svelte"}
React example code here (first tab = default slot)

#tab1
Vue example code here

#tab2
Svelte example code here
::
\`\`\`

### \`divider\` (block)
Horizontal divider with optional label.
\`\`\`
::divider{label="Section Break"}::
\`\`\`

---

## Built-in Features (no component needed)

### GitHub-style Alerts
\`\`\`
> [!NOTE]
> Useful information.

> [!TIP]
> Helpful advice.

> [!WARNING]
> Urgent information.

> [!CAUTION]
> Negative consequences.
\`\`\`

### Math (if math plugin enabled)
- Inline: \`$E = mc^2$\`
- Display: \`$$\\\\int_0^1 x^2 dx$$\`

### Mermaid Diagrams (if mermaid plugin enabled)
\`\`\`
\\\`\\\`\\\`mermaid
graph TD
    A --> B --> C
\\\`\\\`\\\`
\`\`\`

---

## Guidelines

- Prefer semantic components over raw HTML.
- Use \`alert\` for important callouts, not raw blockquotes.
- Use \`steps\` for tutorials and how-to guides.
- Use \`tabs\` to show alternatives (e.g., different languages or package managers).
- Use \`badge\` inline to highlight statuses, labels, or tags.
- Use \`card\` to visually group related content with a title.
- Use standard Markdown for everything else (headings, paragraphs, lists, code, links, images, tables).
- Never output raw HTML. Always use Markdown or MDC components.`

export default function LLMPromptBlock() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(LLM_SYSTEM_PROMPT).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <section id="llm-prompt" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex size-10 items-center justify-center rounded-lg border-2 border-primary bg-primary/10">
          <BotMessageSquare className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground text-balance">
            LLM System Prompt
          </h2>
          <p className="text-muted-foreground text-pretty">
            Copy this system prompt and give it to any LLM (GPT, Claude, Gemini,
            etc.) so it knows how to write content using your registered Comark
            components. It covers MDC syntax, all available components, built-in
            features, and best practices.
          </p>
        </div>
      </div>

      <div className="relative rounded-xl border-2 border-border bg-card overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b-2 border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              system-prompt.md
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {LLM_SYSTEM_PROMPT.split("\n").length} lines
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-95"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt content */}
        <div className="max-h-[32rem] overflow-y-auto">
          <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-relaxed text-foreground/90">
            {LLM_SYSTEM_PROMPT}
          </pre>
        </div>
      </div>
    </section>
  )
}
