'use client'

import { useState } from 'react'
import { AppHeader } from '@/components/shell/app-header'
import { Headphones, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export default function ContactPage() {
  const { t } = useApp()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('driver_support')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Anti-spam bot protection check
    if (honeypot) {
      return
    }

    // Phone validation (10 digits Indian mobile)
    const cleanedPhone = phone.replace(/\D/g, '')
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setError('')
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('contactSupport') || 'Contact Support'} back />


      <div className="px-5 py-6 space-y-6 max-w-3xl">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-1">
            <Phone className="h-5 w-5 text-brand" />
            <p className="font-display text-sm font-bold text-ink">National Helpline</p>
            <p className="text-xs text-muted-ink">1800-EMPTY-MILES</p>
            <p className="text-[11px] text-success font-medium">24/7 Priority Support</p>
          </div>

          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-1">
            <Mail className="h-5 w-5 text-brand" />
            <p className="font-display text-sm font-bold text-ink">Email Support</p>
            <p className="text-xs text-muted-ink">support@emptymiles.in</p>
            <p className="text-[11px] text-muted-ink">Response in &lt; 2 hours</p>
          </div>

          <div className="rounded-2xl border border-hairline bg-card p-4 card-shadow space-y-1">
            <MapPin className="h-5 w-5 text-brand" />
            <p className="font-display text-sm font-bold text-ink">Logistics Hub</p>
            <p className="text-xs text-muted-ink">SG Highway, Ahmedabad, Gujarat 380054</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-hairline bg-card p-5 card-shadow space-y-4">
          <h3 className="font-display text-base font-bold text-ink">Send Us a Direct Message</h3>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center space-y-2 text-emerald-800">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <p className="font-display font-bold text-sm">Message Dispatched Successfully</p>
              <p className="text-xs text-emerald-700">
                Our logistics dispatch desk will call you at {phone || 'your phone number'} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-800 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Anti-spam Honeypot (Hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Your Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-hairline bg-secondary px-3.5 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Contact Mobile Number</label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-hairline bg-secondary px-3.5 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Support Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-hairline bg-secondary px-3 py-2.5 text-xs font-semibold text-ink outline-none focus:border-brand"
                >
                  <option value="driver_support">Active Trip &amp; Driver Support</option>
                  <option value="cargo_hunt">Cargo Hunt &amp; Match Inquiry</option>
                  <option value="payment_settlement">Payment Settlement &amp; Wallet</option>
                  <option value="kyc_verification">KYC &amp; Vehicle Verification</option>
                  <option value="enterprise_shipper">Enterprise Shipper Onboarding</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Message</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain your inquiry or issue..."
                  className="w-full rounded-xl border border-hairline bg-secondary p-3 text-xs text-ink outline-none focus:border-brand"
                />
              </div>

              <button
                type="submit"
                className="w-full brand-gradient py-3.5 rounded-2xl font-display font-bold text-white shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
