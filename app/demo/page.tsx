import type { Metadata } from 'next'
import { SiteHeader } from '@/components/braintrust/site-header'
import { EvalStudio } from '@/components/braintrust/eval-studio'
import { CodeSnippetsSection } from '@/components/braintrust/code-snippets-section'
import { VercelChecklist } from '@/components/braintrust/vercel-checklist'

export const metadata: Metadata = {
  title: 'Demo — Braintrust + Vercel AI SDK Integration',
  description:
    'Interactive AI Eval Studio demo with code snippets for integrating Braintrust tracing and evaluation with the Vercel AI SDK.',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Demo hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Interactive Demo
            </p>
            <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              AI Eval Studio
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Explore a realistic mock of the Braintrust evaluation workflow. Chat with an AI,
              switch prompt variants and models, inspect traces, review scores, and browse a
              golden dataset — all powered by the Vercel AI SDK under the hood.
            </p>

            <div className="mt-12">
              <EvalStudio />
            </div>
          </div>
        </section>

        <CodeSnippetsSection />
        <VercelChecklist />
      </main>
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          Braintrust + Vercel Marketplace Integration
        </div>
      </footer>
    </div>
  )
}
