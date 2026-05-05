"use client"

import DemoSection from "@/components/demo-section"
import StreamingDemo from "@/components/streaming-demo"
import Playground from "@/components/playground"
import { BookOpen, Layers, Zap, Code2, Hash, Type, Box, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Table-of-contents nav items                                       */
/* ------------------------------------------------------------------ */
const TOC = [
  { id: "basic-markdown", label: "Basic Markdown", icon: Type },
  { id: "block-components", label: "Block Components", icon: Box },
  { id: "inline-components", label: "Inline Components", icon: ArrowRight },
  { id: "component-props", label: "Component Props", icon: Code2 },
  { id: "yaml-props", label: "YAML Props", icon: Hash },
  { id: "named-slots", label: "Named Slots", icon: Layers },
  { id: "nested-components", label: "Nested Components", icon: Layers },
  { id: "attributes", label: "Element Attributes", icon: Hash },
  { id: "streaming", label: "Streaming", icon: Zap },
  { id: "playground", label: "Playground", icon: BookOpen },
]

/* ------------------------------------------------------------------ */
/*  Demo source strings (MDC)                                         */
/* ------------------------------------------------------------------ */

const BASIC_MARKDOWN = `# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

> This is a blockquote with **nested formatting**.

- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2

---

| Name   | Role       | Status  |
|--------|------------|---------|
| Alice  | Engineer   | Active  |
| Bob    | Designer   | Active  |
| Carol  | PM         | Away    |

Here is a [link](https://comark.dev) to the Comark docs.
`

const BLOCK_COMPONENTS = `::alert{type="info"}
This is an **info** alert. Block components use the \`::component-name\` syntax.
::

::alert{type="warning"}
This is a **warning** alert with a different type prop.
::

::alert{type="error"}
This is an **error** alert. Props are passed via \`{key="value"}\` syntax.
::

::alert{type="success"}
This is a **success** alert. Components receive children as React children.
::
`

const INLINE_COMPONENTS = `Inline components use a single colon \`:component-name\` and flow within text.

The status is :badge[Active]{color="green"} and priority is :badge[High]{color="red"}.

You can combine :badge[Multiple]{color="blue"} inline :badge[Badges]{color="yellow"} in one paragraph.
`

const COMPONENT_PROPS = `Components support several attribute syntaxes within \`{...}\`:

::alert{type="warning"}
This alert uses \`type="warning"\` as a key-value prop.
::

::card{title="Prop Syntax Cheatsheet"}
- \`key="value"\` - String prop
- \`bool\` - Boolean (true)
- \`#my-id\` - ID attribute
- \`.my-class\` - CSS class
- Multiple: \`{type="info" .highlighted #special}\`
::
`

const YAML_PROPS = `For components with many properties, use YAML frontmatter:

::card
---
title: Configuration-Heavy Component
---
YAML props go between \`---\` delimiters right after the opening \`::\` tag. They support all YAML types: strings, numbers, booleans, arrays, and objects.
::

::alert{type="info"}
YAML props and inline attributes can be **combined**. Inline attributes take precedence when both specify the same key.
::
`

const NAMED_SLOTS = `::card{title="Card with Named Slots"}
#header
## Custom Header
*This goes into the \`slotHeader\` prop*

This is the **default slot** content (becomes \`children\`).

#footer
Footer content goes into the \`slotFooter\` prop.
::

Named slots use \`#slot-name\` syntax inside block components. In React:
- Default slot becomes \`children\`
- Named slots become \`slot{PascalName}\` props (e.g. \`#footer\` becomes \`slotFooter\`)
`

const NESTED_COMPONENTS = `::card{title="Outer Card"}
This card contains a **nested** alert component inside it:

:::alert{type="success"}
I am nested inside a card! Use extra colons (\`:::\`) for each nesting level.
:::

And regular markdown continues after the nested component.
::
`

const ATTRIBUTES = `Comark lets you add **attributes to native Markdown elements**:

**Bold with a class**{.text-primary}

*Italic with an ID*{#my-italic}

[Styled link](https://comark.dev){target="_blank"}

Span syntax wraps inline text: [highlighted text]{.bg-accent/20 .px-1 .rounded} in a \`<span>\`.

[Status: Online]{.text-secondary .font-bold} - uses multiple classes.
`

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function KitchenSink() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl border-2 border-primary bg-primary/10">
              <BookOpen className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Comark Kitchen Sink
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground text-pretty">
                A comprehensive demo of every Comark feature: components in
                Markdown for React. Each section shows the MDC source alongside
                its rendered output.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sticky sidebar TOC */}
          <nav className="hidden lg:block lg:w-56 shrink-0">
            <div className="sticky top-8">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                On this page
              </h3>
              <ul className="flex flex-col gap-1">
                {TOC.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1 min-w-0 flex flex-col gap-14">
            <DemoSection
              id="basic-markdown"
              title="Basic Markdown"
              description="Comark supports full GitHub Flavored Markdown: headings, bold, italic, strikethrough, inline code, blockquotes, lists, tables, links, and horizontal rules."
              source={BASIC_MARKDOWN}
            />

            <DemoSection
              id="block-components"
              title="Block Components"
              description="Block components use ::component-name{props} syntax and occupy their own line. They receive children as React children and props from the {key=&quot;value&quot;} syntax."
              source={BLOCK_COMPONENTS}
            />

            <DemoSection
              id="inline-components"
              title="Inline Components"
              description="Inline components use :component-name[content]{props} syntax and flow within paragraph text. Content in brackets becomes the component's children."
              source={INLINE_COMPONENTS}
            />

            <DemoSection
              id="component-props"
              title="Component Props"
              description="Components accept props via {key=&quot;value&quot;} for strings, {bool} for booleans, {#id} for IDs, and {.class} for CSS classes. All are passed to your React component."
              source={COMPONENT_PROPS}
            />

            <DemoSection
              id="yaml-props"
              title="YAML Frontmatter Props"
              description="For components with many or complex properties (arrays, objects, nested config), use YAML frontmatter between --- delimiters right after the opening :: tag."
              source={YAML_PROPS}
            />

            <DemoSection
              id="named-slots"
              title="Named Slots"
              description="Block components support named slots with #slot-name syntax. In React, the default slot maps to children and named slots become slotPascalName props."
              source={NAMED_SLOTS}
            />

            <DemoSection
              id="nested-components"
              title="Nested Components"
              description="Components can be nested inside each other by adding extra colons for each nesting level. The parser matches opening and closing tags automatically."
              source={NESTED_COMPONENTS}
            />

            <DemoSection
              id="attributes"
              title="Element Attributes"
              description="Add custom classes, IDs, styles, and data attributes to native Markdown elements like bold, italic, links, and images using {.class #id key=&quot;value&quot;} after the element."
              source={ATTRIBUTES}
            />

            <StreamingDemo />

            <Playground />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t-2 border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          Built with{" "}
          <a
            href="https://comark.dev"
            className="font-medium text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Comark
          </a>{" "}
          and{" "}
          <a
            href="https://nextjs.org"
            className="font-medium text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          . View the AGENTS.md playbook for replication instructions.
        </div>
      </footer>
    </div>
  )
}
