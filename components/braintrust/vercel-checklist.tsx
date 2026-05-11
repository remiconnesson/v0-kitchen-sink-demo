'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Install Braintrust from Marketplace',
    description: 'Go to your Vercel dashboard, open Marketplace, find Braintrust, and click Install. This provisions your Braintrust project and injects env vars.',
  },
  {
    id: 2,
    title: 'Confirm environment variables',
    description: 'Verify that BRAINTRUST_API_KEY and BRAINTRUST_PROJECT_ID are set in your Vercel project settings under Environment Variables.',
  },
  {
    id: 3,
    title: 'Redeploy your app',
    description: 'Trigger a new deployment so the injected env vars are available at runtime. Push a commit or click Redeploy in the dashboard.',
  },
  {
    id: 4,
    title: 'Run a chat',
    description: 'Open your deployed app and send a message through the AI chat. The wrapped AI SDK model will automatically log a trace to Braintrust.',
  },
  {
    id: 5,
    title: 'Run the eval script',
    description: 'Execute npx braintrust eval evals/support-bot.eval.ts to run your evaluation suite against the dataset and generate scores.',
  },
  {
    id: 6,
    title: 'Inspect traces and scores',
    description: 'Open the Braintrust dashboard to view traces, scores, experiment comparisons, and drill into individual requests.',
  },
]

export function VercelChecklist() {
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  function toggle(id: number) {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className="border-t border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Getting started
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground text-balance">
          Vercel integration checklist
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Six steps from install to inspecting your first trace. Check them off as you go.
        </p>

        <div className="mt-12 flex flex-col gap-3">
          {steps.map((step) => {
            const done = completed.has(step.id)
            return (
              <button
                key={step.id}
                onClick={() => toggle(step.id)}
                className={cn(
                  'flex items-start gap-4 rounded-xl border border-border p-5 text-left transition-colors',
                  done ? 'bg-primary/5 border-primary/30' : 'bg-card hover:bg-secondary/30',
                )}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    done
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{step.id}</span>
                  )}
                </div>
                <div>
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      done ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
