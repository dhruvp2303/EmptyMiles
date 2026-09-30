'use client'

import { AppHeader } from '@/components/shell/app-header'
import { Wordmark } from '@/components/brand/logo'
import { Target, TrendingUp, ShieldCheck, Truck, Users, Sparkles } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function AboutPage() {
  const { t } = useApp()

  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('aboutUs') || 'About EmptyMiles'} back />

      <div className="px-5 py-6 space-y-6 max-w-3xl">
        {/* Hero Card */}
        <div className="rounded-3xl bg-ink p-6 text-white shadow-xl space-y-3">
          <Wordmark onDark />
          <h2 className="font-display text-2xl font-extrabold text-white mt-2">
            Turn unused truck capacity into revenue.
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Over 30% of commercial truck capacity on Indian highways runs empty or under-utilized. EmptyMiles solves this structural inefficiency with Cargo Hunt, our deterministic matching engine that pairs active routes and unused capacity with compatible freight.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="font-display text-sm font-bold text-ink">Corridor Capacity Match</h3>
            <p className="text-xs text-muted-ink leading-relaxed">
              We find cargo that fits the exact remaining tonnage on a truck&apos;s active transit route with minimal detour.
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-success">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h3 className="font-display text-sm font-bold text-ink">Verified B2B Escrow</h3>
            <p className="text-xs text-muted-ink leading-relaxed">
              Every booking is safeguarded by Aadhaar &amp; GSTIN verified profiles and automated digital POD settlements.
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h3 className="font-display text-sm font-bold text-ink">Zero Empty Return Leg</h3>
            <p className="text-xs text-muted-ink leading-relaxed">
              Return Ride Finder pairs trucks reaching destination cities with guaranteed reverse freight before arrival.
            </p>
          </div>
        </div>

        {/* Operating Corridors */}
        <div className="rounded-2xl border border-hairline bg-card p-5 card-shadow space-y-3">
          <h3 className="font-display text-sm font-bold text-ink">Primary Operating Corridors</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-ink">
            <div className="p-2.5 rounded-xl bg-secondary">
              <strong className="text-ink block">Gujarat Corridor</strong>
              Ahmedabad • Surat • Vadodara • Rajkot
            </div>
            <div className="p-2.5 rounded-xl bg-secondary">
              <strong className="text-ink block">Western Trunk Highway</strong>
              Mumbai • Vapi • Surat • Ahmedabad
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
