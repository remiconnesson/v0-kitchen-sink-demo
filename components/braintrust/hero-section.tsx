import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Vercel Marketplace Integration
          </div>

          <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Evaluate and trace AI SDK apps with Braintrust
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The AI SDK generates and streams responses. Braintrust traces, evaluates,
            scores, and compares them. Together they give you the full picture of your
            AI app&apos;s quality.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore the demo
            </Link>
            <a
              href="https://vercel.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Install from Marketplace
            </a>
          </div>

          {/* Mini product preview */}
          <div className="mt-20 w-full overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="h-3 w-3 rounded-full bg-chart-3/60" />
              <span className="ml-4 text-xs text-muted-foreground font-mono">
                braintrust.dev / acme-corp / support-bot
              </span>
            </div>
            <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Traces (24h)
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  2,847
                </p>
                <p className="mt-1 text-xs text-chart-3">
                  {'+12% vs. yesterday'}
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Avg. Score
                </p>
                <p className="mt-2 text-3xl font-bold text-primary">
                  0.87
                </p>
                <p className="mt-1 text-xs text-chart-3">
                  {'+0.03 from last eval'}
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Experiments
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  14
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  3 running now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
