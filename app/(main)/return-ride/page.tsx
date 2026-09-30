'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeftRight,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { GoogleMapView } from '@/components/maps/google-map-view'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'

export default function ReturnRidePage() {
  const router = useRouter()
  const { createBookingFromCargo, t } = useApp()
  const [isBooking, setIsBooking] = useState(false)
  const [showMap, setShowMap] = useState(true)

  const returnOpportunities = [
    {
      id: 'RET-101',
      origin: 'Surat (Textile Market GIDC)',
      destination: 'Ahmedabad (Narol Textile Hub)',
      cargoType: 'Textiles & Garments',
      weightTon: 7.2,
      price: 11200,
      detourKm: 1.5,
      matchScore: 98,
      shipper: 'Surat Weaving Mills Ltd.',
      pickupWindow: 'Tomorrow, 9:00 AM to 1:00 PM',
      deliveryWindow: 'Tomorrow, 6:00 PM',
      verified: true,
    },
    {
      id: 'RET-102',
      origin: 'Ankleshwar Chemical Estate',
      destination: 'Ahmedabad (Vatva GIDC)',
      cargoType: 'Packaged Dyes & Specialty Products',
      weightTon: 5.5,
      price: 8900,
      detourKm: 3.0,
      matchScore: 91,
      shipper: 'Gujarat Specialty Chemicals',
      pickupWindow: 'Tomorrow, 11:00 AM',
      deliveryWindow: 'Tomorrow, 8:00 PM',
      verified: true,
    },
    {
      id: 'RET-103',
      origin: 'Bharuch Industrial Park',
      destination: 'Ahmedabad (Sanand)',
      cargoType: 'Auto Spare Components',
      weightTon: 6.0,
      price: 9400,
      detourKm: 4.5,
      matchScore: 86,
      shipper: 'Maruti Tier-1 Supplier Co.',
      pickupWindow: 'Tomorrow, 2:00 PM',
      deliveryWindow: 'Day After, 8:00 AM',
      verified: true,
    },
  ]

  const handleAcceptReturn = (cargoId: string) => {
    setIsBooking(true)
    setTimeout(() => {
      createBookingFromCargo(cargoId)
      setIsBooking(false)
      router.push('/trip')
    }, 700)
  }

  return (
    <div className="flex min-h-full flex-col bg-background pb-24">
      <AppHeader title={t('returnRideFinder') || 'Return Ride Finder'} back />

      <div className="px-5 pt-3 space-y-4">
        {/* Core Hero Banner */}
        <div className="rounded-xl bg-[#0B192C] p-5 text-white shadow-sm border border-slate-800">
          <div className="flex items-center gap-2 text-[#F06524] font-bold text-xs tracking-wider uppercase">
            <ArrowLeftRight className="h-4 w-4" /> 0% Empty Miles Guarantee
          </div>
          <h2 className="font-sans text-lg font-black text-white mt-1.5">
            Surat → Ahmedabad Return Corridor
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Your truck is scheduled to complete delivery in Surat. Lock in pre-matched reverse freight heading back to your home terminal.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
            <span className="text-xs text-slate-300">Expected Reverse Leg Revenue:</span>
            <span className="font-sans text-base font-black text-emerald-400">+₹11,200</span>
          </div>
        </div>

        {/* Corridor Route Map */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#F06524]" /> Return Leg Telemetry Map
            </span>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="text-[11px] font-bold text-[#F06524] hover:underline"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
          {showMap && (
            <div className="h-48 w-full">
              <GoogleMapView
                origin="Surat, Gujarat"
                destination="Ahmedabad, Gujarat"
                originLabel="Surat (Pickup)"
                destinationLabel="Ahmedabad (Unload)"
                waypoints={['Ankleshwar Chemical Estate', 'Bharuch Industrial Park']}
                intermediateLabel="Ankleshwar Waypoint"
                truckProgress={0.1}
                height="192px"
                showControls={false}
                showTelemetryOverlay={false}
              />
            </div>
          )}
        </div>

        {/* Matches list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">3 Return Freight Loads Available</h3>
            <span className="text-xs font-bold text-[#F06524]">Live Radar</span>
          </div>

          {returnOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3 transition hover:border-slate-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-sm font-bold text-slate-900">
                      {opp.weightTon}T • {opp.cargoType}
                    </span>
                    {opp.verified && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{opp.shipper}</p>
                </div>
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs font-black text-emerald-700">
                  {opp.matchScore}% Match
                </span>
              </div>

              {/* Route */}
              <div className="rounded-lg bg-slate-50 p-3 text-xs space-y-1 text-slate-700 border border-slate-100">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#F06524]" /> {opp.origin}
                  </span>
                  <span>→</span>
                  <span>{opp.destination}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200">
                  <span>Pickup: {opp.pickupWindow}</span>
                  <span className="font-bold text-[#F06524]">+{opp.detourKm} km detour</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-semibold">Guaranteed Freight</p>
                  <p className="font-sans text-lg font-black text-emerald-700">{formatINR(opp.price)}</p>
                </div>

                <button
                  disabled={isBooking}
                  onClick={() => handleAcceptReturn(opp.id)}
                  className="btn-accent px-4 py-2 text-xs font-bold disabled:opacity-50"
                >
                  {isBooking ? 'Securing Load...' : 'Accept Return Load'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
