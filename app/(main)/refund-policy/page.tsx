'use client'

import { AppHeader } from '@/components/shell/app-header'
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function RefundPolicyPage() {
  const { t } = useApp()
  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('refundPolicy') || 'Refund Policy'} back />

      <div className="px-5 py-6 space-y-6 max-w-3xl">
        <div className="rounded-2xl border border-hairline bg-card p-5 card-shadow space-y-3">
          <div className="flex items-center gap-2.5 text-brand font-bold text-xs uppercase tracking-wider">
            <RotateCcw className="h-4 w-4" /> Escrow &amp; Payout Protection
          </div>
          <h2 className="font-display text-xl font-bold text-ink">EmptyMiles Refund Policy</h2>
          <p className="text-xs text-muted-ink">Last updated: October 2026</p>
          <p className="text-sm text-ink leading-relaxed">
            All freight bookings on EmptyMiles are backed by automated escrow protection to ensure fair transactions for both shippers and transporters.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">1. Shipper Refund Scenarios</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              <strong className="text-ink">Driver Non-Arrival:</strong> If an assigned transporter fails to arrive at the designated pickup location within the agreed window and cannot be contacted, 100% of the held escrow is refunded immediately.
            </p>
            <p>
              <strong className="text-ink">Vehicle Incompatibility:</strong> If the arriving vehicle is not capable of safely carrying the confirmed cargo weight or body type, the booking is cancelled with a full refund.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">2. Transporter Compensation (Dry Run Protection)</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              If a driver arrives at the pickup point and the shipper cancels without prior notice or fails to make cargo ready within 2 hours, a dry-run fee is credited to the transporter wallet from the shipper deposit.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">3. Refund Processing Timeline</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Wallet refunds are instantaneous. Bank account or UPI refunds initiated through payment gateways are settled within 2 to 4 business banking days depending on the user&apos;s bank.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
