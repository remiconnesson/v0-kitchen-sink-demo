'use client'

import { useState } from 'react'
import {
  Send,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ----- Mock data ----- */
const models = ['gpt-4o', 'gpt-4o-mini', 'claude-sonnet-4', 'llama-3.1-70b']

const promptVariants = [
  { id: 'v1', label: 'v1 — Concise', active: false },
  { id: 'v2', label: 'v2 — Detailed', active: true },
  { id: 'v3', label: 'v3 — Friendly', active: false },
]

const mockMessages = [
  { role: 'user' as const, text: 'How do I reset my password?' },
  {
    role: 'assistant' as const,
    text: 'To reset your password, go to Settings > Security > Change Password. You\'ll receive a verification email. Click the link and enter your new password. Make sure it\'s at least 12 characters with a mix of letters, numbers, and symbols.',
  },
  { role: 'user' as const, text: 'What if I don\'t receive the email?' },
  {
    role: 'assistant' as const,
    text: 'Check your spam folder first. If it\'s not there, try requesting a new reset link after 2 minutes. You can also reach out to support@acme.com and we\'ll manually verify your identity and reset it for you.',
  },
]

const traceTimeline = [
  { id: 't1', name: 'streamText', duration: '1,240ms', status: 'success' as const, model: 'gpt-4o', tokens: 312 },
  { id: 't2', name: 'Factuality scorer', duration: '89ms', status: 'success' as const, score: 0.92 },
  { id: 't3', name: 'Relevance scorer', duration: '67ms', status: 'success' as const, score: 0.88 },
  { id: 't4', name: 'Tone scorer', duration: '54ms', status: 'warning' as const, score: 0.71 },
  { id: 't5', name: 'Log to Braintrust', duration: '23ms', status: 'success' as const },
]

const scoreCards = [
  { label: 'Factuality', score: 0.92, color: 'text-chart-3' },
  { label: 'Relevance', score: 0.88, color: 'text-chart-3' },
  { label: 'Helpfulness', score: 0.95, color: 'text-chart-3' },
  { label: 'Tone', score: 0.71, color: 'text-primary' },
]

const datasetRows = [
  { prompt: 'How do I reset my password?', expected: 'Go to Settings > Security...', scorer: 'Factuality', score: 0.92 },
  { prompt: 'Cancel my subscription', expected: 'Navigate to Billing > Plans...', scorer: 'Relevance', score: 0.85 },
  { prompt: 'Is there a free trial?', expected: 'Yes, 14-day free trial...', scorer: 'Factuality', score: 0.97 },
  { prompt: 'How do I contact support?', expected: 'Email support@acme.com...', scorer: 'Helpfulness', score: 0.90 },
  { prompt: 'What payment methods?', expected: 'We accept Visa, MC, Amex...', scorer: 'Factuality', score: 0.88 },
]

/* ----- Component ----- */
export function EvalStudio() {
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [activeVariant, setActiveVariant] = useState('v2')
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Studio toolbar */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border bg-secondary/30 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          AI Eval Studio
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          {/* Prompt variant pills */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            {promptVariants.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVariant(v.id)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  activeVariant === v.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
          {/* Model selector */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {/* Left: Chat panel */}
        <div className="flex flex-col">
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 360 }}>
            <div className="flex flex-col gap-4">
              {mockMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'ml-auto bg-primary/15 text-foreground'
                      : 'bg-secondary text-secondary-foreground',
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <input
                type="text"
                placeholder="Send a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
              />
              <button className="rounded-md bg-primary p-1.5 text-primary-foreground transition-colors hover:bg-primary/90">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Trace timeline + score cards */}
        <div className="flex flex-col">
          {/* Score cards */}
          <div className="grid grid-cols-2 gap-px border-b border-border bg-border sm:grid-cols-4">
            {scoreCards.map((sc) => (
              <div key={sc.label} className="bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">{sc.label}</p>
                <p className={cn('mt-1 text-xl font-bold', sc.color)}>
                  {sc.score.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Trace timeline */}
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 280 }}>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trace Timeline
            </p>
            <div className="flex flex-col gap-2">
              {traceTimeline.map((trace) => (
                <div
                  key={trace.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
                >
                  {trace.status === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-chart-3" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-primary" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {trace.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {trace.duration}
                      </span>
                      {trace.model && (
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {trace.model}
                        </span>
                      )}
                      {trace.tokens && <span>{trace.tokens} tokens</span>}
                      {trace.score !== undefined && (
                        <span className="font-medium text-foreground">
                          {trace.score.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset table */}
      <div className="border-t border-border">
        <div className="px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Dataset: support-bot-golden-set
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border bg-secondary/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Prompt
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Expected Answer
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Scorer
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {datasetRows.map((row, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-2.5 text-foreground max-w-[200px] truncate">
                    {row.prompt}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground max-w-[200px] truncate">
                    {row.expected}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.scorer}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-medium text-foreground">
                    {row.score.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
