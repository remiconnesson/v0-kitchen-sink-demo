'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/braintrust/code-block'

const envVarsSnippet = `# .env.local
BRAINTRUST_API_KEY=sk-bt-...
BRAINTRUST_PROJECT_ID=proj_abc123
OPENAI_API_KEY=sk-...
# or GROQ_API_KEY=gsk_...`

const installSnippet = `npm install ai @ai-sdk/openai braintrust autoevals zod`

const routeHandlerSnippet = `// app/api/chat/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { wrapAISDKModel } from "braintrust";

// Wrap the model to automatically trace every call
const model = wrapAISDKModel(openai("gpt-4o"));

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: "You are a helpful support assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}`

const braintrustLibSnippet = `// lib/braintrust.ts
import { Braintrust } from "braintrust";

export const bt = new Braintrust({
  apiKey: process.env.BRAINTRUST_API_KEY,
  projectId: process.env.BRAINTRUST_PROJECT_ID,
});

export function logTrace({
  input,
  output,
  model,
  latencyMs,
  promptVersion,
  scores,
}: {
  input: string;
  output: string;
  model: string;
  latencyMs: number;
  promptVersion: string;
  scores: Record<string, number>;
}) {
  bt.log({
    input,
    output,
    metadata: { model, latencyMs, promptVersion },
    scores,
  });
}`

const evalScriptSnippet = `// evals/support-bot.eval.ts
import { Eval } from "braintrust";
import { Factuality } from "autoevals";

Eval("support-bot", {
  data: () => [
    {
      input: "How do I reset my password?",
      expected: "Go to Settings > Security > Change Password...",
    },
    {
      input: "Cancel my subscription",
      expected: "Navigate to Billing > Plans > Cancel...",
    },
    {
      input: "Is there a free trial?",
      expected: "Yes, we offer a 14-day free trial...",
    },
  ],
  task: async (input) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
      }),
    });
    return res.text();
  },
  scores: [Factuality],
});`

const datasetSnippet = `// Example dataset with prompt, expected answer, and scorer
const dataset = [
  {
    input: "How do I reset my password?",
    expected: "Go to Settings > Security > Change Password.",
    scorer: "Factuality",
  },
  {
    input: "Cancel my subscription",
    expected: "Navigate to Billing > Plans > Cancel.",
    scorer: "Relevance",
  },
  {
    input: "What payment methods do you accept?",
    expected: "We accept Visa, Mastercard, Amex, and PayPal.",
    scorer: "Factuality",
  },
];`

const evalDashboardSnippet = `// components/eval-dashboard.tsx
"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function EvalDashboard() {
  const { data } = useSWR("/api/eval-results", fetcher, {
    refreshInterval: 5000,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <ScoreCard label="Factuality" score={data?.factuality ?? 0} />
      <ScoreCard label="Relevance" score={data?.relevance ?? 0} />
      <ScoreCard label="Helpfulness" score={data?.helpfulness ?? 0} />
    </div>
  );
}`

const serverLoggingSnippet = `// Server-side logging of latency, model, prompt version, and score
import { logTrace } from "@/lib/braintrust";

const start = performance.now();
const result = await streamText({ model, messages, system });
const latencyMs = performance.now() - start;

logTrace({
  input: messages.at(-1)?.content ?? "",
  output: await result.text,
  model: "gpt-4o",
  latencyMs,
  promptVersion: "v2-detailed",
  scores: { factuality: 0.92, relevance: 0.88 },
});`

type Tab = {
  id: string
  filename: string
  language: string
  code: string
}

const tabs: Tab[] = [
  { id: 'env', filename: '.env.local', language: 'shell', code: envVarsSnippet },
  { id: 'install', filename: 'terminal', language: 'shell', code: installSnippet },
  { id: 'route', filename: 'app/api/chat/route.ts', language: 'typescript', code: routeHandlerSnippet },
  { id: 'lib', filename: 'lib/braintrust.ts', language: 'typescript', code: braintrustLibSnippet },
  { id: 'eval', filename: 'evals/support-bot.eval.ts', language: 'typescript', code: evalScriptSnippet },
  { id: 'dataset', filename: 'dataset-example.ts', language: 'typescript', code: datasetSnippet },
  { id: 'dashboard', filename: 'components/eval-dashboard.tsx', language: 'tsx', code: evalDashboardSnippet },
  { id: 'logging', filename: 'server-logging.ts', language: 'typescript', code: serverLoggingSnippet },
]

export function CodeSnippetsSection() {
  const [activeTab, setActiveTab] = useState('route')
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Code
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground text-balance">
          Integration snippets
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Copyable code for every step of the integration: env vars, AI SDK route handler,
          Braintrust tracing, evaluation scripts, and a live dashboard component.
        </p>

        <div className="mt-12">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition-colors font-mono',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                {tab.filename}
              </button>
            ))}
          </div>

          <CodeBlock filename={current.filename} language={current.language}>
            {current.code}
          </CodeBlock>
        </div>
      </div>
    </section>
  )
}
