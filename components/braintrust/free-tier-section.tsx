import { Check, Infinity as InfinityIcon } from 'lucide-react'

const planFeatures = [
  { label: 'Platform fee', value: '$0 / month' },
  { label: 'Processed data included', value: '1 GB' },
  { label: 'Scores included', value: '10,000' },
  { label: 'Data retention', value: '14 days' },
  { label: 'Users', value: 'Unlimited' },
  { label: 'Projects', value: 'Unlimited' },
  { label: 'Datasets', value: 'Unlimited' },
  { label: 'Playgrounds', value: 'Unlimited' },
  { label: 'Experiments', value: 'Unlimited' },
]

const freeTierFits = [
  'Chatbot eval suites during development',
  'Prompt comparison demos across models',
  'RAG answer-quality checks on test datasets',
  'Small AI support bot tracing in staging',
  'Model benchmark dashboards for team reviews',
]

const caveats = [
  '14-day retention — traces and scores are deleted after two weeks',
  'Usage-based charges apply beyond included 1 GB data and 10K scores',
  'Advanced environments, charts, security, and support require paid plans',
]

export function FreeTierSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground text-balance">
          Free tier at a glance
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          The Starter plan gives you everything you need to evaluate and trace AI apps
          at no monthly cost. Usage-based charges can apply beyond included usage.
        </p>

        {/* Pricing table */}
        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <div className="bg-secondary/50 px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">
              Starter Plan
            </h3>
          </div>
          <div className="divide-y divide-border">
            {planFeatures.map((feature) => {
              const isUnlimited = feature.value === 'Unlimited'
              return (
                <div
                  key={feature.label}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <span className="text-sm text-muted-foreground">
                    {feature.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    {isUnlimited && (
                      <InfinityIcon className="h-4 w-4 text-primary" />
                    )}
                    {feature.value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Two columns: fits + caveats */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              What fits comfortably in free
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {freeTierFits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Caveats
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {caveats.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
