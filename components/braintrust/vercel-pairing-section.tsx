import { ArrowRight } from 'lucide-react'

const steps = [
  {
    label: 'AI SDK',
    description: 'Generates and streams responses using any model provider through a unified API.',
    color: 'bg-foreground text-background',
  },
  {
    label: 'Braintrust',
    description: 'Traces, evaluates, scores, and compares those responses to catch quality issues.',
    color: 'bg-primary text-primary-foreground',
  },
  {
    label: 'Marketplace',
    description: 'Handles setup, env var injection, and billing — one click to connect Braintrust to your Vercel project.',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    label: 'Vercel',
    description: 'Deploys your app to the edge with preview environments and production infrastructure.',
    color: 'bg-foreground text-background',
  },
]

export function VercelPairingSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Integration
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground text-balance">
          Why this pairs with Vercel
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          The AI SDK handles model calls and streaming UX. Braintrust handles everything
          after the response: tracing, evaluation, scoring, and debugging. The Marketplace
          connects them in one click. Vercel deploys it all.
        </p>

        <div className="mt-16 flex flex-col items-center gap-4 lg:flex-row lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 lg:flex-1">
              <div className="flex flex-col gap-3 lg:w-full">
                <div
                  className={`inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold ${step.color}`}
                >
                  {step.label}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground/50 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
