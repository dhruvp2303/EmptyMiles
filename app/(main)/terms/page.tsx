'use client'

import { AppHeader } from '@/components/shell/app-header'
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function TermsPage() {
  const { t } = useApp()
  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('terms') || 'Terms & Conditions'} back />

      <div className="px-5 py-6 space-y-6 max-w-3xl">
        <div className="rounded-2xl border border-hairline bg-card p-5 card-shadow space-y-3">
          <div className="flex items-center gap-2.5 text-brand font-bold text-xs uppercase tracking-wider">
            <FileText className="h-4 w-4" /> B2B Marketplace Terms of Service
          </div>
          <h2 className="font-display text-xl font-bold text-ink">EmptyMiles Terms &amp; Conditions</h2>
          <p className="text-xs text-muted-ink">Effective Date: October 2026</p>
          <p className="text-sm text-ink leading-relaxed">
            Welcome to EmptyMiles. By creating an account, posting cargo, or accepting truck capacity matches through our platform, you agree to comply with these terms.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">1. Marketplace Intermediary Role</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              EmptyMiles acts as a technology marketplace connecting shippers with commercial truck owners and fleet operators. Transporters are independent contractors responsible for operating vehicles in compliance with the Motor Vehicles Act and state transport guidelines.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">2. Cargo Verification &amp; Prohibited Goods</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Shippers represent that all cargo weights, dimensions, and descriptions are accurate. Prohibited items include hazardous materials without mandatory PESO permits, contraband, and illegal substances. EmptyMiles reserves the right to suspend accounts violating safety regulations.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">3. Payments, Escrow &amp; Settlements</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Shippers deposit freight charges into an escrow account upon booking confirmation. Upon verified delivery and digital POD submission by the consignee, transporter earnings are automatically settled to their EmptyMiles wallet or bank account minus platform convenience fees.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">4. Proof of Delivery (POD) &amp; Dispute Resolution</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Digital POD submitted through the EmptyMiles driver app with GPS geotag and recipient signature serves as conclusive proof of delivery. Any freight discrepancies must be reported within 24 hours of delivery.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
