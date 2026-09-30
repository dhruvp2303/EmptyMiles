'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import {
  ChevronLeft,
  Clock,
  CalendarClock,
  TrendingUp,
  Route as RouteIcon,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Package,
  MapPin,
  Truck,
} from 'lucide-react'
import { MatchPill } from '@/components/ui/match-pill'
import { GoogleMapView } from '@/components/maps/google-map-view'
import { formatINR } from '@/lib/data'
import { scoreMatch } from '@/lib/match'
import { useApp } from '@/lib/app-context'

export default function CargoDetailsPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { truck, cargosList, createBookingFromCargo } = useApp()

  const cargo = cargosList.find((c) => c.id === params.id)
  const [showNegotiate, setShowNegotiate] = useState(false)
  const [offer, setOffer] = useState('')
  const [status, setStatus] = useState<'idle' | 'booking'>('idle')

  const match = useMemo(() => (cargo ? scoreMatch(truck, cargo) : null), [truck, cargo])

  if (!cargo || !match) return notFound()

  const handleAcceptMatch = () => {
    setStatus('booking')
    setTimeout(() => {
      createBookingFromCargo(cargo.id)
      router.push('/trip')
    }, 600)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 border-b border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-50 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-sans text-sm font-bold text-slate-900">Cargo Load Details</h1>
        <MatchPill score={match.score} band={match.band} size="sm" />
      </header>

      {/* Corridor Map Preview (Real GIS Route) */}
      <div className="h-48 w-full border-b border-slate-200">
        <GoogleMapView
          origin={cargo.origin}
          destination={cargo.destination}
          originLabel={cargo.origin}
          destinationLabel={cargo.destination}
          truckProgress={0.4}
          height="192px"
          showControls={false}
          showTelemetryOverlay={false}
          defaultTheme="silver"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4 pt-4">
        {/* Title & Route Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-black text-slate-900">
              {cargo.weightTon.toFixed(1)} TON
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
              {cargo.cargoType}
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Pickup: {cargo.origin}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="h-4 w-4 text-[#F06524] shrink-0" />
              <span>Delivery: {cargo.destination}</span>
            </div>
          </div>
        </div>

        {/* Load Specifications Table */}
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-sm text-xs">
          <div className="flex items-center justify-between p-3.5">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> Guaranteed Freight Payout
            </span>
            <span className="font-sans text-base font-black text-emerald-700">
              {formatINR(cargo.price)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <RouteIcon className="h-4 w-4 text-[#0B192C]" /> Route Deviation (Detour)
            </span>
            <span className="font-bold text-slate-900">
              +{cargo.detourKm} km ({cargo.detourMinutes} mins added)
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" /> Pickup Window
            </span>
            <span className="font-bold text-slate-900">{cargo.pickupWindow}</span>
          </div>

          <div className="flex items-center justify-between p-3.5">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4 text-slate-400" /> Delivery Deadline
            </span>
            <span className="font-bold text-slate-900">{cargo.deliveryWindow}</span>
          </div>

          <div className="flex items-center justify-between p-3.5">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-slate-400" /> Body Requirement
            </span>
            <span className="font-bold text-slate-900">{cargo.requiredBodyType}</span>
          </div>
        </div>

        {/* Shipper Profile & Notes */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Shipper Company</p>
              <p className="font-sans text-xs font-bold text-slate-900">{cargo.shipperName}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> GST &amp; KYC Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">{cargo.notes}</p>
        </div>
      </div>

      {/* Sticky Bottom Actions (Accept Load / Negotiate) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto border-t border-slate-200 bg-white p-3.5 z-30 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowNegotiate(true)}
            className="btn-outline flex-1 py-3"
          >
            Counter Offer
          </button>
          <button
            type="button"
            onClick={handleAcceptMatch}
            disabled={status === 'booking'}
            className="btn-accent flex-[2] py-3 text-sm justify-center"
          >
            {status === 'booking' ? 'Booking Space...' : 'Accept Load (Book Space)'}
          </button>
        </div>
      </div>

      {/* Counter Offer Modal */}
      {showNegotiate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-4">
            <h3 className="font-sans text-base font-bold text-slate-900">Counter Freight Rate</h3>
            <p className="text-xs text-slate-500">
              Current Shipper Offer: <strong className="text-slate-900">{formatINR(cargo.price)}</strong>
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Your Price (₹)</label>
              <input
                type="number"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 9000"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-bold text-slate-900 outline-none focus:border-[#0B192C]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowNegotiate(false)}
                className="btn-outline flex-1 py-2 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Counter offer of ₹${offer || cargo.price} submitted to ${cargo.shipperName}!`)
                  setShowNegotiate(false)
                }}
                className="btn-primary flex-1 py-2 text-xs"
              >
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
