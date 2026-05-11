'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            Braintrust
            <span className="ml-1.5 text-muted-foreground font-normal">
              {'+ Vercel'}
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Overview
          </Link>
          <Link
            href="/demo"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/demo'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}
