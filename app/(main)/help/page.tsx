'use client'

import { useState } from 'react'
import { AppHeader } from '@/components/shell/app-header'
import {
  HelpCircle,
  ChevronDown,
  Search,
  AlertTriangle,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Headphones,
} from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export default function HelpCenterPage() {
  const { t, user } = useApp()
  const [activeTab, setActiveTab] = useState<'faq' | 'raise_ticket' | 'my_tickets'>('faq')
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Ticket Form State
  const [ticketCategory, setTicketCategory] = useState<'dispute' | 'payment' | 'trip' | 'kyc' | 'other'>('dispute')
  const [bookingRef, setBookingRef] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState('')

  const [myTickets, setMyTickets] = useState([
    {
      id: 'TKT-1081',
      bookingId: 'TR-8800',
      category: 'Payment / Settlement',
      subject: 'Escrow settlement verification timing',
      status: 'Resolved',
      time: 'Yesterday',
      resolution: 'Funds credited directly to your EmptyMiles wallet upon POD verification.',
    },
    {
      id: 'TKT-1094',
      bookingId: 'TR-9001',
      category: 'Detour Route Query',
      subject: 'Ankleshwar GIDC bridge diversion',
      status: 'Under Investigation',
      time: '2 hours ago',
      resolution: 'Operations monitoring NH 48 corridor traffic update.',
    },
  ])

  const faqs = [
    {
      q: 'How does Cargo Hunt calculate compatibility?',
      a: 'Cargo Hunt evaluates 7 key factors: Route alignment (30%), Available capacity fit (20%), Pickup timing window (15%), Delivery deadline (10%), Vehicle body suitability (10%), Rate fairness (10%), and Detour impact (5%). Hard constraints filter out overweight or excessive detour loads before scoring.',
    },
    {
      q: 'How do I receive payment after delivering cargo?',
      a: 'Once the cargo is unloaded at the destination, the consignee signs the digital Proof of Delivery (POD) inside the EmptyMiles driver app. Upon verification with GPS geotag, held escrow funds are immediately settled to your EmptyMiles wallet, withdrawable to UPI or bank accounts with zero fees.',
    },
    {
      q: 'What is Return Ride Finder?',
      a: 'Return Ride Finder is designed to eliminate empty return trips. When your truck is scheduled to complete a delivery in a destination city, Cargo Hunt automatically searches and reserves reverse freight heading back to your home city.',
    },
    {
      q: 'What documents are required to register a commercial vehicle?',
      a: 'Commercial transporters need to provide: Vehicle Registration Certificate (RC), commercial Driving License (DL), National or State transport permits, active Insurance cover, and Fitness Certificate. Verification is typically completed within 2 hours.',
    },
    {
      q: 'What happens if a shipper cancels after I depart for pickup?',
      a: 'Under our dry-run protection policy, if a shipper cancels after driver dispatch or fails to load cargo within 2 hours of arrival, fuel and detour compensation is credited directly from the shipper deposit to your wallet.',
    },
    {
      q: 'How do I raise a dispute regarding freight damage or delay?',
      a: 'Go to the "Raise Ticket / Dispute" tab on this page. Provide your Trip ID (e.g. TR-9001), describe the issue and upload photos. Our 24/7 Operations and Escrow Resolution team investigates and arbitrates within 15 minutes.',
    },
  ]

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  )

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !description) return

    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId: bookingRef || 'TR-GENERAL',
      category: ticketCategory.toUpperCase(),
      subject,
      status: 'Open / Assigned to Operations',
      time: 'Just now',
      resolution: 'Ticket received. EmptyMiles support officer assigned.',
    }

    setMyTickets((prev) => [newTicket, ...prev])
    setSubmittedMessage(`Dispute Ticket ${newTicket.id} created successfully! Our operations desk will call you shortly.`)
    setSubject('')
    setDescription('')
    setBookingRef('')
    setActiveTab('my_tickets')
  }

  return (
    <div className="flex flex-col bg-background pb-20">
      <AppHeader title={t('helpCenter') || 'Support & Dispute Center'} back />

      <div className="px-5 py-4 space-y-5 max-w-3xl">
        {/* Navigation Tabs */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('faq')}
            className={cn(
              'flex-1 py-2 text-center rounded-md transition',
              activeTab === 'faq' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
            )}
          >
            FAQ &amp; Guides
          </button>
          <button
            onClick={() => setActiveTab('raise_ticket')}
            className={cn(
              'flex-1 py-2 text-center rounded-md transition',
              activeTab === 'raise_ticket' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
            )}
          >
            Raise Dispute / Ticket
          </button>
          <button
            onClick={() => setActiveTab('my_tickets')}
            className={cn(
              'flex-1 py-2 text-center rounded-md transition relative',
              activeTab === 'my_tickets' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
            )}
          >
            My Tickets ({myTickets.length})
          </button>
        </div>

        {submittedMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{submittedMessage}</span>
            </div>
            <button onClick={() => setSubmittedMessage('')} className="text-emerald-900 font-bold ml-2">
              ×
            </button>
          </div>
        )}

        {/* TAB 1: FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {/* Search header */}
            <div className="rounded-xl bg-[#0B192C] p-5 text-white shadow-sm border border-slate-800 space-y-3">
              <h2 className="font-sans text-base font-black text-white">How can we assist your logistics operations?</h2>
              <div className="relative flex items-center bg-white/10 rounded-lg border border-white/20 px-3.5 py-2">
                <Search className="h-4 w-4 text-slate-300 mr-2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search topics: Cargo Hunt matching, POD sign-off, instant wallet..."
                  className="w-full bg-transparent text-xs text-white placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+9118002008899"
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:border-slate-300 transition"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700">
                  <HelpCircle className="h-4 w-4 text-[#F06524]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">24/7 Helpline</p>
                  <p className="text-[10px] text-slate-500">1800-200-8899</p>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:border-slate-300 transition"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <span className="text-xs font-black">WA</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">WhatsApp Support</p>
                  <p className="text-[10px] text-slate-500">Instant Driver Desk</p>
                </div>
              </a>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-3">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">Frequently Asked Questions</h3>

              <div className="space-y-2">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div
                      key={faq.q}
                      className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-3"
                      >
                        <span className="font-sans text-xs font-bold text-slate-900">{faq.q}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-slate-400 shrink-0 transition-transform',
                            isOpen && 'rotate-180 text-[#F06524]'
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RAISE DISPUTE / TICKET */}
        {activeTab === 'raise_ticket' && (
          <form onSubmit={handleTicketSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h3 className="font-sans text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-[#F06524]" /> Raise Dispute or Support Request
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                EmptyMiles provides Escrow Protection and 24/7 incident arbitration for transporters &amp; shippers.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Issue Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#F06524] focus:bg-white"
              >
                <option value="dispute">Trip Dispute (Dock Delay / Cancellation)</option>
                <option value="payment">Payment &amp; Wallet Settlement Query</option>
                <option value="trip">Route Detour &amp; Toll Calculation</option>
                <option value="kyc">Vehicle / Driver KYC Verification</option>
                <option value="other">General Technical Support</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Trip / Booking Reference ID (Optional)</label>
              <input
                type="text"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="e.g. TR-9001 or CG-6001"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#F06524] focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your query or issue"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#F06524] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what happened, timestamps, locations, and what resolution you expect..."
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#F06524] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="btn-accent w-full py-3 text-xs justify-center font-bold"
            >
              <Send className="h-4 w-4" /> Submit Support Ticket
            </button>
          </form>
        )}

        {/* TAB 3: MY TICKETS */}
        {activeTab === 'my_tickets' && (
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">Recent Support &amp; Dispute Cases</h3>

            {myTickets.map((tkt) => (
              <div
                key={tkt.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-900">{tkt.id}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {tkt.bookingId}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-bold',
                      tkt.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    )}
                  >
                    {tkt.status}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-900">{tkt.subject}</p>
                <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700">Resolution Update:</span> {tkt.resolution}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>Submitted {tkt.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
