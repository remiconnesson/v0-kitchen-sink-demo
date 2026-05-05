"use client"

import DemoSection from "@/components/demo-section"
import StreamingDemo from "@/components/streaming-demo"
import Playground from "@/components/playground"
import { BookOpen, Layers, Zap, Code2, Hash, Type, Box, ArrowRight, Puzzle, Smile, ListChecks, Heading, ShieldCheck, Scissors, Sigma, Footprints, Palette, Lock, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import emoji from "comark/plugins/emoji"
import taskList from "comark/plugins/task-list"
import toc from "comark/plugins/toc"
import summary from "comark/plugins/summary"
import math from "comark/plugins/math"
import footnotes from "comark/plugins/footnotes"
import highlight from "comark/plugins/highlight"
import security from "comark/plugins/security"
import mermaid from "comark/plugins/mermaid"
import githubLight from "@shikijs/themes/github-light"
import githubDark from "@shikijs/themes/github-dark"

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
  { id: "plugins-intro", label: "Plugins", icon: Puzzle },
  { id: "plugin-alert", label: "Alerts (built-in)", icon: ShieldCheck },
  { id: "plugin-emoji", label: "Emoji Plugin", icon: Smile },
  { id: "plugin-task-list", label: "Task List Plugin", icon: ListChecks },
  { id: "plugin-footnotes", label: "Footnotes Plugin", icon: Footprints },
  { id: "plugin-math", label: "Math Plugin", icon: Sigma },
  { id: "plugin-highlight", label: "Highlight Plugin", icon: Palette },
  { id: "plugin-mermaid", label: "Mermaid Plugin", icon: GitBranch },
  { id: "plugin-security", label: "Security Plugin", icon: Lock },
  { id: "plugin-toc", label: "TOC Plugin", icon: Heading },
  { id: "plugin-excerpt", label: "Excerpt Plugin", icon: Scissors },
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
/*  Plugin demo source strings                                        */
/* ------------------------------------------------------------------ */

const PLUGIN_EMOJI = `Emoji shortcodes are converted to real emoji characters:

I :heart: Comark! It's :rocket: fast and :sparkles: beautiful.

:wave: Hello! How are you :smile: today?

Combine with markdown: **:fire: Hot take** — Comark is _:100: percent_ awesome :tada:

Some more: :thumbsup: :thumbsdown: :eyes: :warning: :bulb: :memo:
`

const PLUGIN_ALERT = `GitHub-style alerts are **built-in** — no plugin import needed:

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
`

const PLUGIN_TASK_LIST = `Interactive task lists from standard markdown syntax:

- [x] Install Comark
- [x] Add the task-list plugin
- [ ] Build something awesome
- [ ] Ship to production

Nested task lists also work:

- [x] Phase 1
  - [x] Research
  - [x] Prototype
- [ ] Phase 2
  - [ ] Implementation
  - [ ] Testing
`

const PLUGIN_TOC = `The TOC plugin extracts a table of contents from headings:

# Introduction

Welcome to the docs.

## Getting Started

Install the package.

### Prerequisites

Make sure you have Node.js installed.

## API Reference

Full API documentation.

### Core Functions

The main parsing functions.

### Plugins

Extend with plugins.
`

const PLUGIN_MATH = `Inline math uses single dollar signs: $E = mc^2$ is Einstein's famous equation.

The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.

Display math uses double dollar signs for block equations:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

$$
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$

Mix with markdown: the **Pythagorean theorem** states that $a^2 + b^2 = c^2$.
`

const PLUGIN_FOOTNOTES = `Comark supports footnotes[^1] with automatic back-references[^2].

References are rendered as superscript links, and definitions are collected
into a numbered list at the end of the output.

The standard model[^sm] describes three of the four fundamental forces.
Gravity is described by general relativity[^gr].

[^1]: Footnotes are rendered as a list at the end of the document.
[^2]: Each footnote includes a back-reference link to return to the text.
[^sm]: The Standard Model of particle physics classifies all known elementary particles.
[^gr]: Einstein's general theory of relativity, published in 1915.
`

const PLUGIN_HIGHLIGHT = `Syntax highlighting uses Shiki under the hood:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

function greet(user: User): string {
  return \\\`Hello, \\\${user.name}!\\\`
}
\`\`\`

\`\`\`python
def fibonacci(n: int) -> list[int]:
    """Generate a Fibonacci sequence."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result
\`\`\`
`

const PLUGIN_MERMAID = `Mermaid diagrams render from \\\`\\\`\\\`mermaid code blocks:

\`\`\`mermaid
graph TD
    A[Parse MDC] --> B{Has components?}
    B -->|Yes| C[Resolve components]
    B -->|No| D[Render markdown]
    C --> D
    D --> E[React output]
\`\`\`
`

const PLUGIN_SECURITY = `The security plugin sanitizes the AST to prevent XSS:

**Before** (dangerous input):
- \`<script>alert('XSS')</script>\` is stripped
- \`<a href="javascript:alert('XSS')">Click</a>\` has href removed
- \`<img onerror="alert('XSS')" src="x">\` has event handler stripped
- \`<iframe src="evil.com"></iframe>\` is removed (with blockedTags)

**After** (safe output):
The text remains but dangerous elements are neutralized.

Configure with options:

\`\`\`typescript
security({
  blockedTags: ['script', 'iframe', 'object', 'embed'],
  allowedProtocols: ['https', 'mailto'],
  allowDataImages: false,
})
\`\`\`
`

const PLUGIN_EXCERPT = `This is the excerpt content that appears before the delimiter. It's typically used for blog post previews, summaries, or meta descriptions.

<!--more-->

This is the rest of the content that comes after the excerpt delimiter. In a blog, this would only be visible on the full post page, not in the listing.

The \`summary\` plugin splits content at the \`<!--more-->\` delimiter and exposes the excerpt via the parsed tree's data.
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

            {/* ---- Plugins section divider ---- */}
            <section id="plugins-intro" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-10 items-center justify-center rounded-lg border-2 border-primary bg-primary/10">
                  <Puzzle className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground text-balance">
                    Plugins
                  </h2>
                  <p className="text-muted-foreground text-pretty">
                    Comark ships with built-in plugins that extend markdown with
                    emoji, syntax highlighting, math, alerts, task lists, and
                    more. Pass them via the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">plugins</code> prop.
                  </p>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-xl border-2 border-border bg-muted/20 p-5 font-mono text-sm leading-relaxed text-foreground">
{`import emoji     from "comark/plugins/emoji"
import footnotes from "comark/plugins/footnotes"
import math      from "comark/plugins/math"
import highlight from "comark/plugins/highlight"
import mermaid   from "comark/plugins/mermaid"
import security  from "comark/plugins/security"

// Alerts (> [!NOTE]) are built-in — no import needed!

<ComarkClient plugins={[emoji(), math(), footnotes(), highlight(), mermaid()]}>
  {content}
</ComarkClient>`}
              </pre>
            </section>

            <DemoSection
              id="plugin-alert"
              title="Alerts (built-in)"
              description="GitHub-style alert blockquotes are built into Comark -- no plugin import needed. Uses > [!TYPE] syntax for NOTE, TIP, IMPORTANT, WARNING, and CAUTION. Register a custom blockquote component to add icons and colors."
              source={PLUGIN_ALERT}
            />

            <DemoSection
              id="plugin-emoji"
              title="Emoji Plugin"
              description="Converts emoji shortcodes like :smile: and :rocket: into real Unicode emoji characters. Import from comark/plugins/emoji. No configuration needed."
              source={PLUGIN_EMOJI}
              plugins={[emoji()]}
            />

            <DemoSection
              id="plugin-task-list"
              title="Task List Plugin"
              description="Renders interactive checkboxes from standard [ ] and [x] list syntax. Supports nesting. Import from comark/plugins/task-list."
              source={PLUGIN_TASK_LIST}
              plugins={[taskList()]}
            />

            <DemoSection
              id="plugin-footnotes"
              title="Footnotes Plugin"
              description="Adds footnote references [^label] and definitions [^label]: content. References become superscript links; definitions collect into a numbered list at the end. Import from comark/plugins/footnotes."
              source={PLUGIN_FOOTNOTES}
              plugins={[footnotes()]}
            />

            <DemoSection
              id="plugin-math"
              title="Math Plugin (KaTeX)"
              description="Renders LaTeX math with KaTeX. Inline: $E = mc^2$. Display: $$...$$. Requires katex peer dep. Register the Math component for rendering. Import from comark/plugins/math."
              source={PLUGIN_MATH}
              plugins={[math()]}
            />

            <DemoSection
              id="plugin-highlight"
              title="Syntax Highlighting (Shiki)"
              description="Shiki-powered syntax highlighting with dual-theme support. Languages are loaded on demand. Requires shiki peer dep. Import from comark/plugins/highlight."
              source={PLUGIN_HIGHLIGHT}
              plugins={[highlight({ themes: { light: githubLight, dark: githubDark } })]}
            />

            <DemoSection
              id="plugin-mermaid"
              title="Mermaid Diagrams"
              description="Renders Mermaid diagrams from ```mermaid code blocks. Requires beautiful-mermaid peer dep. Register the Mermaid component for rendering. Import from comark/plugins/mermaid."
              source={PLUGIN_MERMAID}
              plugins={[mermaid()]}
            />

            <DemoSection
              id="plugin-security"
              title="Security Sanitization"
              description="Sanitizes the parsed AST by removing dangerous elements (script, iframe), blocking malicious protocols (javascript:, vbscript:), and stripping event handlers (onclick, onerror). Import from comark/plugins/security."
              source={PLUGIN_SECURITY}
              plugins={[security({ blockedTags: ["script", "iframe", "object", "embed"] })]}
            />

            <DemoSection
              id="plugin-toc"
              title="TOC Plugin"
              description="Generates a hierarchical table of contents from headings and stores it in tree.meta.toc. Heading IDs are auto-generated for anchor linking. Import from comark/plugins/toc."
              source={PLUGIN_TOC}
              plugins={[toc({ depth: 3 })]}
            />

            <DemoSection
              id="plugin-excerpt"
              title="Excerpt / Summary Plugin"
              description="Splits content at the <!--more--> delimiter to extract excerpts for blog post previews or meta descriptions. The excerpt is exposed via tree.meta.summary. Import from comark/plugins/summary."
              source={PLUGIN_EXCERPT}
              plugins={[summary()]}
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
