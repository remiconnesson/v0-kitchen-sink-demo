import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Braintrust + Vercel — Evaluate and Trace AI SDK Apps',
  description:
    'Braintrust is the AI quality, tracing, and evaluation layer for apps built with the Vercel AI SDK. Evaluate, trace, compare, score, and improve AI behavior.',
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">{children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
