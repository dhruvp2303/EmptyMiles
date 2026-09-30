'use client'

import { AppHeader } from '@/components/shell/app-header'
import { XCircle, Clock, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function CancellationPolicyPage() {
  const { t } = useApp()
  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('cancellationPolicy') || 'Cancellation Policy'} back />

      <div className="px-5 py-6 space-y-6 max-w-3xl">
        <div className="rounded-2xl border border-hairline bg-card p-5 card-shadow space-y-3">
          <div className="flex items-center gap-2.5 text-brand font-bold text-xs uppercase tracking-wider">
            <XCircle className="h-4 w-4" /> Trip Cancellation Guidelines
          </div>
          <h2 className="font-display text-xl font-bold text-ink">EmptyMiles Cancellation Policy</h2>
          <p className="text-xs text-muted-ink">Last updated: October 2026</p>
          <p className="text-sm text-ink leading-relaxed">
            EmptyMiles aims to maintain maximum reliability for freight movements across Indian transport corridors. Clear rules govern booking cancellations.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">1. Shipper Cancellation Windows</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              <strong className="text-ink">Before Driver Dispatch:</strong> Free cancellation with zero penalty up to 2 hours before scheduled pickup time.
            </p>
            <p>
              <strong className="text-ink">After Driver En Route:</strong> If driver has departed for pickup, a nominal fuel &amp; detour compensation applies based on distance travelled.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">2. Transporter Cancellation Rules</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Transporters may cancel without penalty in genuine breakdown cases with photographic verification. Repeated unexcused cancellations impact the transporter&apos;s Cargo Hunt priority match score.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
