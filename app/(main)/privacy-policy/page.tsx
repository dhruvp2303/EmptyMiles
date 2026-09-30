'use client'

import { AppHeader } from '@/components/shell/app-header'
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function PrivacyPolicyPage() {
  const { t } = useApp()
  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('privacy') || 'Privacy Policy'} back />

      <div className="px-5 py-6 space-y-6 max-w-3xl">
        <div className="rounded-2xl border border-hairline bg-card p-5 card-shadow space-y-3">
          <div className="flex items-center gap-2.5 text-brand font-bold text-xs uppercase tracking-wider">
            <Shield className="h-4 w-4" /> Data Protection &amp; Privacy Standards
          </div>
          <h2 className="font-display text-xl font-bold text-ink">EmptyMiles Privacy Policy</h2>
          <p className="text-xs text-muted-ink">Last updated: October 2026</p>
          <p className="text-sm text-ink leading-relaxed">
            EmptyMiles Logistics Technologies Private Limited (&quot;EmptyMiles&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and confidentiality of our transporters, drivers, shippers, and platform users.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">1. Information We Collect</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              <strong className="text-ink">Account &amp; KYC Data:</strong> Full name, verified mobile number, email address, commercial driving license, Aadhaar identification, GST registration details, and business address.
            </p>
            <p>
              <strong className="text-ink">Vehicle &amp; Fleet Information:</strong> Vehicle registration number (RC), gross capacity, body type, vehicle fitness certificate, national permits, and Fastag identification.
            </p>
            <p>
              <strong className="text-ink">Operational Location Data:</strong> High-precision GPS coordinates during active freight trips only to enable route matching, detour calculation, live shipper tracking, and Proof of Delivery verification.
            </p>
            <p>
              <strong className="text-ink">Payment &amp; Settlement Data:</strong> UPI ID, bank account number, IFSC code, and transaction ledger history processed through RBI-authorized payment aggregators.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">2. How Location Data is Used</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              EmptyMiles uses driver location exclusively during active assigned trips. Location telemetry is used for:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Calculating real-time ETA and route progress for shippers.</li>
              <li>Detecting geofenced arrival at pickup docks and delivery points.</li>
              <li>Digital timestamping and geotagging of Proof of Delivery (POD).</li>
            </ul>
            <p className="text-ink font-medium">
              We do not track or store background location when you are off-duty or when no active trip is underway.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">3. Data Security &amp; Retention</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              All data transmissions are encrypted using Transport Layer Security (TLS 1.3). Digital signature records and POD media are stored in encrypted object storage. We retain operational records for regulatory tax and audit compliance under Indian law.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-base font-bold text-ink">4. User Rights &amp; Grievance Officer</h3>
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow text-xs text-muted-ink space-y-2">
            <p>
              Users may request access to their telemetry logs or update their profile anytime via app settings or by contacting privacy@emptymiles.in.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
