# AGENTS.md — Comark Kitchen Sink Playbook

> This file is the single source of truth for AI agents working on this project.
> **Read it in full at the start of every conversation.**

---

## Project Overview

This is a **Next.js 16 App Router** project demonstrating **Comark** — a Markdown
parser that extends standard Markdown with component syntax (MDC) for React.

| Stack             | Details                                             |
| ----------------- | --------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack)                  |
| Comark            | `@comark/react` + `comark` (core parser)            |
| UI                | shadcn/ui (new-york style), Tailwind CSS v4          |
| Fonts             | Geist (sans), Geist Mono (mono), Source Serif 4     |
| Linting           | Biome (not ESLint)                                   |
| Package manager   | pnpm                                                |

---

## Pre-Commit Checks

Run these **three commands** before finishing any task:

```bash
pnpm run typecheck
pnpm run lint
pnpm run format
```

---

## Directory Structure

```
app/
  layout.tsx          # Root layout with fonts, metadata
  page.tsx            # Renders <KitchenSink />
  globals.css         # Tailwind + Comark prose styles

components/
  comark/
    components-map.ts # Shared component registry (no @comark/react import — safe for client)
    index.tsx         # AppComark — async Server Component wrapper via defineComarkComponent
    client.tsx        # AppComarkClient — "use client" wrapper via ComarkClient
    alert.tsx         # ::alert{type="info|warning|error|success"}
    comark-card.tsx   # ::card{title="..."} with #header, #footer slots
    comark-badge.tsx  # :badge[text]{color="blue|green|red|yellow"}
    callout.tsx       # ::callout{emoji="..."}
    steps.tsx         # ::steps wrapper
    step.tsx          # ::step{title="..."} inside ::steps
    comark-tabs.tsx   # ::tabs{tabs="A,B,C"} with slot-based tabs
    divider.tsx       # ::divider{label="..."} or ::divider::

  kitchen-sink.tsx    # Main page layout with all demo sections
  demo-section.tsx    # Reusable source/preview split component
  streaming-demo.tsx  # Interactive streaming simulation
  playground.tsx      # Live MDC editor + preview
```

---

## Comark Quick Reference (MDC Syntax)

### Block Component

```mdc
::component-name{prop="value" bool .class #id}
Markdown content (becomes `children`)
::
```

### Inline Component

```mdc
:component-name[visible text]{prop="value"}
```

### YAML Frontmatter Props

```mdc
::component
---
title: My Title
items:
  - one
  - two
---
Body content here
::
```

### Named Slots

```mdc
::card
#header
Header content (becomes `slotHeader` in React)

Default slot content (becomes `children`)

#footer
Footer content (becomes `slotFooter` in React)
::
```

### Nesting

Add extra colons for each level:

```mdc
::outer
:::inner
Content
:::
::
```

### Element Attributes

```mdc
**bold text**{.my-class}
[styled span]{.bg-accent .px-1}
[link](url){target="_blank"}
```

### Streaming

```tsx
<Comark streaming={isStreaming} caret>
  {content}
</Comark>
```

The parser's `autoClose` (on by default) handles incomplete syntax mid-stream.

---

## Critical Architecture: Server vs Client Rendering

Comark provides **three rendering components** from `@comark/react`:

| Component         | Type                 | Use In                                                    |
| ----------------- | -------------------- | --------------------------------------------------------- |
| `Comark`          | Async Server Component | Server Components only (parses + renders on server)       |
| `ComarkClient`    | Client Component       | `"use client"` files (parses on client via `useMemo`)     |
| `ComarkRenderer`  | Sync Component         | Anywhere (takes a pre-parsed `tree`, no parsing)          |

**This project wraps them as:**

- `AppComark` (in `comark/index.tsx`) — uses `defineComarkComponent`, which wraps the async `Comark`. **Server Components only.**
- `AppComarkClient` (in `comark/client.tsx`) — wraps `ComarkClient` with the same component map. **Use inside `"use client"` trees.**

**The `components-map.ts` file** holds the shared component registry. It does **not** import
from `@comark/react`, so client components can safely import it without pulling the async
`Comark` into the client bundle.

**Rule:** Never import from `comark/index.tsx` in a client component. Always import
`AppComarkClient` from `comark/client.tsx` or import individual components from
`comark/components-map.ts`.

---

## Directory Structure (continued)

```
components/
  comark/
    math-renderer.tsx        # Custom Math component (fixes className vs class issue)
    github-alert-blockquote.tsx  # Custom blockquote override for GitHub-style alerts
  theme-toggle.tsx           # Dark/light mode toggle (next-themes)
  theme-provider.tsx         # next-themes ThemeProvider wrapper
  llm-prompt-block.tsx       # Copyable LLM system prompt for writing MDC
```

---

## Plugins Reference

### Built-in (no import needed)

| Feature            | Syntax                    | Notes                                                |
| ------------------ | ------------------------- | ---------------------------------------------------- |
| GitHub-style Alerts | `> [!NOTE]`, `> [!TIP]`  | Sets `as` prop on `blockquote`. Needs blockquote override component. |

### Opt-in Plugins

| Plugin       | Import                         | Peer Deps            | React Component Needed?                    |
| ------------ | ------------------------------ | -------------------- | ------------------------------------------ |
| emoji        | `comark/plugins/emoji`         | none                 | No                                         |
| task-list    | `comark/plugins/task-list`     | none                 | No                                         |
| footnotes    | `comark/plugins/footnotes`     | none                 | No                                         |
| toc          | `comark/plugins/toc`           | none                 | No (data in `tree.meta.toc`)               |
| summary      | `comark/plugins/summary`       | none                 | No (data in `tree.meta.summary`)           |
| security     | `comark/plugins/security`      | none                 | No                                         |
| math         | `comark/plugins/math`          | `katex`              | Yes: register `math` in components map     |
| highlight    | `comark/plugins/highlight`     | `shiki`              | No (produces inline styles)                |
| mermaid      | `comark/plugins/mermaid`       | `beautiful-mermaid`  | Yes: register `mermaid` in components map  |
| json-render  | `comark/plugins/json-render`   | none                 | No (maps `type` to existing components)    |

### Passing plugins

```tsx
<ComarkClient plugins={[emoji(), math(), highlight({ ... })]} components={comarkComponents}>
  {content}
</ComarkClient>
```

**Important:** `ComarkClient` caches the parse in `useMemo([content])`. Plugins and options
are only read on the first parse for a given content string. Always define plugin arrays
outside the component or wrap in `useMemo` so they are stable references.

---

## Gotchas & Hard-Won Lessons

### 1. `class` vs `className` in element override components

The Comark renderer converts `class` attributes to `className` before passing to React
components. However, the **built-in** `Math` component from `@comark/react/plugins/math`
destructures `{ class: className }` — which doesn't match the `className` prop the renderer
actually passes. This causes inline math to always render as `<div>` (block) instead of
`<span>` (inline), breaking `<p>` nesting and triggering hydration errors.

**Fix:** Use the custom `components/comark/math-renderer.tsx` which reads `className` correctly.

### 2. GitHub alerts are built-in — don't import the plugin

The `> [!NOTE]` / `> [!TIP]` syntax is processed by comark's core parser, not a plugin.
Do NOT `import alert from "comark/plugins/alert"`. The parser sets `as="note"` etc. on
`<blockquote>` elements. Register a custom `blockquote` component override
(`github-alert-blockquote.tsx`) to render them with icons and colors.

### 3. Highlight plugin default languages

Shiki's default bundle in the highlight plugin only includes:
`vue, tsx, svelte, typescript, javascript, bash, json, yaml, astro`.

For **any other language** (Python, Rust, Go, etc.), you must import and pass it explicitly:

```tsx
import python from "shiki/dist/langs/python.mjs"
highlight({ themes: { light: githubLight, dark: githubDark }, languages: [python] })
```

### 4. Shiki dark mode requires CSS variable swapping

Shiki dual-theme generates inline `style` attributes for the light theme and `--shiki-dark-*`
CSS variables for the dark theme. You MUST add this CSS rule for dark mode to work:

```css
.dark .shiki,
.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

### 5. json-render blocks are independent

Each ` ```json-render ` or ` ```yaml-render ` code block is processed independently.
Element IDs in `children` arrays cannot reference elements defined in a different code block.
Use a single block with `root` + `elements` for multi-element specs, or inline text as children.

### 6. Element overrides share the `components` prop

Custom MDC components (like `alert`, `card`) and HTML element overrides (like `math`,
`blockquote`, `mermaid`) all go in the same `components` map. There is no separate
`elements` prop. The renderer matches the tag name from the parsed tree against the
`components` keys.

### 7. `.comark-output` CSS class is required for prose styles

The global CSS styles for headings, lists, tables, blockquotes, code blocks, etc. are scoped
under `.comark-output`. Any container rendering Comark output MUST include this class,
otherwise markdown elements render unstyled.

### 8. Dark mode: avoid hardcoded light-only Tailwind colors

Never use `bg-blue-50 text-blue-900` without a corresponding `dark:bg-blue-950 dark:text-blue-200`.
Prefer semantic tokens (`bg-card`, `text-foreground`, `bg-muted`) which auto-adapt.
When explicit colors are needed (alert variants), always pair light and dark variants.

### 9. KaTeX CSS must be imported globally

The math plugin requires `import 'katex/dist/katex.min.css'` in `layout.tsx` (or equivalent).
Without it, math renders as unstyled HTML with broken layout.

---

## Playbooks

### Playbook 1: Add a New Custom Component

1. Create `components/comark/my-component.tsx`:

```tsx
import type { ReactNode } from "react"

interface MyComponentProps {
  variant?: string
  children?: ReactNode
  slotFooter?: ReactNode   // if you need #footer slot
}

export default function MyComponent({ variant = "default", children, slotFooter }: MyComponentProps) {
  return (
    <div className="...">
      {children}
      {slotFooter && <footer>{slotFooter}</footer>}
    </div>
  )
}
```

2. Register it in `components/comark/components-map.ts`:

```tsx
import MyComponent from "./my-component"

export const comarkComponents: Record<string, ComponentType<any>> = {
  // ... existing entries
  "my-component": MyComponent,
}
```

Both `AppComark` (server) and `AppComarkClient` (client) read from this
shared map, so the component is available everywhere automatically.

3. Use it in MDC:

```mdc
::my-component{variant="special"}
Content here
#footer
Footer slot
::
```

### Playbook 2: Add a Demo Section to the Kitchen Sink

1. Define the MDC source string in `components/kitchen-sink.tsx`:

```tsx
const MY_DEMO = `::my-component{variant="cool"}
Hello from the demo!
::
`
```

2. Add a `<DemoSection>` in the main content area:

```tsx
<DemoSection
  id="my-component"
  title="My Component"
  description="Explain what this demonstrates."
  source={MY_DEMO}
/>
```

3. Add a TOC entry at the top of the file:

```tsx
const TOC = [
  // ...existing entries
  { id: "my-component", label: "My Component", icon: Box },
]
```

### Playbook 3: Use Comark in a New Page

1. Install (if not already): `pnpm add @comark/react comark`

2a. **Server Component** (recommended — zero client JS):

```tsx
// app/docs/page.tsx (no "use client" directive)
import { AppComark } from "@/components/comark"

export default function DocsPage() {
  const content = `# Hello\n\n::alert{type="info"}\nIt works!\n::`
  return <AppComark>{content}</AppComark>
}
```

2b. **Client Component** (for interactive use — playground, streaming, etc.):

```tsx
"use client"
import AppComarkClient from "@/components/comark/client"

export default function MyPage() {
  const content = `# Hello\n\n::alert{type="info"}\nIt works!\n::`
  return <AppComarkClient>{content}</AppComarkClient>
}
```

All registered components (alert, card, badge, callout, etc.) are available
in both wrappers automatically.

### Playbook 4: Use Comark with Streaming (AI Chat)

```tsx
"use client"
import { useState } from "react"
import { ComarkClient } from "@comark/react"
import { comarkComponents } from "@/components/comark/components-map"

export default function Chat() {
  const [content, setContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)

  async function send(prompt: string) {
    setContent("")
    setIsStreaming(true)
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    })
    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let acc = ""
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      acc += decoder.decode(value, { stream: true })
      setContent(acc)
    }
    setIsStreaming(false)
  }

  return (
    <ComarkClient streaming={isStreaming} caret components={comarkComponents}>
      {content}
    </ComarkClient>
  )
}
```

Key points:
- Use `ComarkClient` (not `Comark`) inside `"use client"` components
- `streaming={true}` tells the renderer content is still arriving
- `caret` shows a blinking cursor at the insertion point
- `autoClose` is on by default — partial `**bold` renders correctly mid-stream
- Import components from `components-map.ts` (not `index.tsx`) to avoid bundling the async server component

### Playbook 5: Server-Side Parsing with ComarkRenderer

For zero-JS rendering, parse on the server and send the tree to a lightweight renderer:

```tsx
// app/api/parse/route.ts
import { parse } from "comark"

export async function POST(req: Request) {
  const { content } = await req.json()
  const tree = await parse(content)
  return Response.json(tree)
}
```

```tsx
// app/docs/[slug]/page.tsx
import { ComarkRenderer } from "@comark/react"
import ComarkAlert from "@/components/comark/alert"

export default async function DocPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.API_URL}/api/parse`, {
    method: "POST",
    body: JSON.stringify({ content: await getDoc(params.slug) }),
  })
  const tree = await res.json()
  return <ComarkRenderer tree={tree} components={{ alert: ComarkAlert }} />
}
```

### Playbook 6: Override Native HTML Elements

Map standard HTML tags to custom React components:

```tsx
import { Comark } from "@comark/react"

function CustomHeading({ __node, id, children }) {
  const Tag = __node?.[0] || "h2"
  return (
    <Tag id={id} className="group relative">
      {id && <a href={`#${id}`} className="anchor">#</a>}
      {children}
    </Tag>
  )
}

<Comark components={{ h1: CustomHeading, h2: CustomHeading, h3: CustomHeading }}>
  {content}
</Comark>
```

### Playbook 7: defineComarkComponent with Inheritance

Create specialized Comark configurations that extend a base:

```tsx
import { defineComarkComponent } from "@comark/react"

const BaseComark = defineComarkComponent({
  name: "BaseComark",
  components: { alert: ComarkAlert, card: ComarkCard },
})

// Extends Base, adds extra components
export const DocsComark = defineComarkComponent({
  name: "DocsComark",
  extends: BaseComark,
  components: { callout: Callout, steps: Steps },
})
```

### Playbook 8: Add a Plugin to a Comark Instance

1. Install peer deps if needed: `pnpm add katex` (math), `pnpm add shiki` (highlight),
   `pnpm add beautiful-mermaid` (mermaid).

2. Import the plugin in your component:

```tsx
import math from "comark/plugins/math"
import highlight from "comark/plugins/highlight"
import python from "shiki/dist/langs/python.mjs" // extra languages
```

3. Pass plugins via the `plugins` prop:

```tsx
<AppComarkClient plugins={[math(), highlight({ themes: { light, dark }, languages: [python] })]}>
  {content}
</AppComarkClient>
```

4. If the plugin produces custom elements (math, mermaid), register the component in
   `components-map.ts`:

```tsx
import MathRenderer from "./math-renderer"
// Add to comarkComponents:
math: MathRenderer,
```

5. If the plugin needs global CSS (KaTeX), add the import to `layout.tsx`:

```tsx
import 'katex/dist/katex.min.css'
```

### Playbook 9: Dark Mode Setup

1. Wrap `<body>` children in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>` in `layout.tsx`.
2. Add `suppressHydrationWarning` to `<html>`.
3. Use `ThemeToggle` component from `components/theme-toggle.tsx` for the toggle UI.
4. **Color rules:**
   - Prefer semantic tokens: `bg-card`, `text-foreground`, `bg-muted`, `border-border`.
   - When explicit colors are needed, always pair: `bg-blue-50 dark:bg-blue-950`.
   - For Shiki highlighting, the CSS variable swap rule in `globals.css` handles it automatically.

---

## Comark Component API Cheatsheet

### Custom MDC Components

| Component         | MDC Syntax                                      | React Props                                   |
| ----------------- | ----------------------------------------------- | --------------------------------------------- |
| Alert             | `::alert{type="info"}`                          | `type`, `children`                            |
| Card              | `::card{title="..."}` + `#header` `#footer`     | `title`, `children`, `slotHeader`, `slotFooter` |
| Badge (inline)    | `:badge[text]{color="blue"}`                    | `color`, `children`                           |
| Callout           | `::callout{emoji="..."}`                        | `emoji`, `children`                           |
| Steps             | `::steps`                                       | `children`                                    |
| Step              | `::step{title="..."}`                           | `title`, `children`                           |
| Tabs              | `::tabs{tabs="A,B"}` + default/`#tab1`/`#tab2`  | `tabs`, `children`, `slotTab1`, `slotTab2`    |
| Divider           | `::divider{label="..."}` or `::divider::`       | `label`                                       |

### Element Overrides (registered in same `components` map)

| Key               | Source                          | Purpose                                       |
| ----------------- | ------------------------------- | --------------------------------------------- |
| `math`            | `math-renderer.tsx`             | Renders KaTeX from `content` prop             |
| `blockquote`      | `github-alert-blockquote.tsx`   | Styled GitHub alerts when `as` prop is set    |
| `mermaid`         | `@comark/react/plugins/mermaid` | Renders Mermaid diagrams from `content` prop  |

---

## Key Dependencies

```json
{
  "@comark/react": "^0.3.1",
  "comark": "^0.3.2"
}
```

Install: `pnpm add @comark/react comark`

Docs: https://comark.dev
