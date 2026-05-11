import { SiteHeader } from '@/components/braintrust/site-header'
import { HeroSection } from '@/components/braintrust/hero-section'
import { CapabilitiesGrid } from '@/components/braintrust/capabilities-grid'
import { FreeTierSection } from '@/components/braintrust/free-tier-section'
import { VercelPairingSection } from '@/components/braintrust/vercel-pairing-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />
        <CapabilitiesGrid />
        <FreeTierSection />
        <VercelPairingSection />
      </main>
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          Braintrust + Vercel Marketplace Integration
        </div>
      </footer>
    </div>
  )
}
