import {
  Activity,
  BarChart3,
  Database,
  FlaskConical,
  GitCompare,
  LayoutGrid,
  MessageSquare,
  Eye,
  Shield,
  Bug,
  Search,
  Users,
} from 'lucide-react'

const capabilities = [
  {
    icon: Activity,
    title: 'AI Traces',
    description: 'Capture every LLM call with inputs, outputs, latency, tokens, and metadata in a structured timeline.',
  },
  {
    icon: FlaskConical,
    title: 'Evaluations',
    description: 'Run automated eval suites against datasets to measure quality, accuracy, and regressions.',
  },
  {
    icon: Database,
    title: 'Datasets',
    description: 'Version and manage golden test sets with expected outputs for repeatable benchmarking.',
  },
  {
    icon: GitCompare,
    title: 'Experiments',
    description: 'Compare prompt versions, models, and parameters side-by-side with statistical rigor.',
  },
  {
    icon: LayoutGrid,
    title: 'Playgrounds',
    description: 'Iterate on prompts interactively with instant model responses and scoring feedback.',
  },
  {
    icon: BarChart3,
    title: 'Scoring',
    description: 'Apply built-in and custom scorers to grade responses on factuality, relevance, tone, and more.',
  },
  {
    icon: Search,
    title: 'Prompt & Model Comparison',
    description: 'Diff outputs across prompt variants and model providers to find the best combination.',
  },
  {
    icon: Users,
    title: 'Human Review',
    description: 'Route traces to human reviewers for labeling, grading, and quality assurance workflows.',
  },
  {
    icon: Eye,
    title: 'Observability',
    description: 'Monitor production AI quality with dashboards, alerts, and real-time score distributions.',
  },
  {
    icon: Shield,
    title: 'Regression Testing',
    description: 'Catch quality regressions before deployment by running evals in CI/CD pipelines.',
  },
  {
    icon: Bug,
    title: 'Debugging',
    description: 'Drill into individual traces to pinpoint failures, hallucinations, and unexpected behavior.',
  },
  {
    icon: MessageSquare,
    title: 'AI Quality Issues',
    description: 'Surface and triage recurring patterns in low-scoring responses for systematic improvement.',
  },
]

export function CapabilitiesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Capabilities
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground text-balance">
          Everything you need to ship AI that actually works
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Braintrust provides the full evaluation and observability toolkit so you can
          measure, compare, and improve every AI interaction in your Vercel-deployed app.
        </p>
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col gap-3 bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <cap.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {cap.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
