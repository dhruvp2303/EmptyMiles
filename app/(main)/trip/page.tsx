'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Navigation,
  Phone,
  Circle,
  MapPin,
  Package,
  ShieldCheck,
  CheckCircle2,
  FileSignature,
  Clock,
  Gauge,
  MessageSquare,
} from 'lucide-react'
import { GoogleMapView } from '@/components/maps/google-map-view'
import { LiveNavigationTracker } from '@/components/maps/live-navigation-tracker'
import { PodModal } from '@/components/pod/pod-modal'
import { InAppChatModal } from '@/components/chat/in-app-chat-modal'
import { useApp } from '@/lib/app-context'
import { formatINR, TripStatus } from '@/lib/data'

export default function LiveTripPage() {
  const { activeTrip, updateTripStatus, truck, t } = useApp()
  const [showPodModal, setShowPodModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showTurnByTurn, setShowTurnByTurn] = useState(false)
  const [detourAlert, setDetourAlert] = useState<{ title: string; extraMinutes: number; rewardINR: number } | null>({
    title: 'Ankleshwar GIDC: 2.2T Auto Parts Pickup (2.1 km Detour)',
    extraMinutes: 20,
    rewardINR: 3400,
  })

  const trip = activeTrip || {
    id: 'TR-9001',
    cargoId: 'CG-6001',
    cargoTitle: '6.0T General Goods (Textiles)',
    origin: 'Ahmedabad',
    destination: 'Surat',
    originAddress: 'Sanand Industrial Estate, Gate 2, Ahmedabad',
    destinationAddress: 'Surat Textile Market Hub, Ring Road, Surat',
    weightTon: 6.0,
    cargoType: 'General Goods',
    vehicleModel: 'Tata 407',
    vehicleReg: 'MH 12 AB 1234',
    driverName: 'Rahul Sharma',
    driverPhone: '+91 98765 43210',
    shipperName: 'Anand Textiles Limited',
    shipperPhone: '+91 98250 12345',
    fare: 8400,
    detourKm: 2,
    status: 'in_transit' as TripStatus,
    currentKm: 198,
    totalKm: 280,
    etaMinutes: 85,
    currentLocationName: 'NH 48 near Bharuch Bypass',
    gpsCoordinates: { lat: 21.7051, lng: 72.9959 },
    createdAt: 'Today',
  }

  const getStatusBadge = () => {
    switch (trip.status) {
      case 'en_route_pickup':
        return { label: 'En Route to Pickup', color: 'bg-amber-600' }
      case 'pickup_arrived':
        return { label: 'Loading at Dock', color: 'bg-blue-600' }
      case 'in_transit':
        return { label: 'In Transit on NH 48', color: 'bg-emerald-600' }
      case 'delivery_arrived':
        return { label: 'Arrived at Delivery Hub', color: 'bg-indigo-600' }
      case 'pod_submitted':
      case 'settled':
      case 'completed':
        return { label: 'Delivered & Settled', color: 'bg-emerald-700' }
      default:
        return { label: 'Trip Confirmed', color: 'bg-[#0B192C]' }
    }
  }

  const badge = getStatusBadge()

  const handleSimulateNextStep = () => {
    const flow: TripStatus[] = ['en_route_pickup', 'pickup_arrived', 'in_transit', 'delivery_arrived', 'pod_submitted']
    const currentIndex = flow.indexOf(trip.status)
    const nextStatus = flow[(currentIndex + 1) % flow.length]
    updateTripStatus(nextStatus)
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0B192C] pb-24">
      {/* 1. FULLSCREEN MAP CANVAS */}
      <div className="absolute inset-0">
        <GoogleMapView
          origin={trip.originAddress || trip.origin}
          destination={trip.destinationAddress || trip.destination}
          originLabel={trip.origin}
          destinationLabel={trip.destination}
          waypoints={['Bharuch Industrial Corridor, Gujarat']}
          intermediateLabel="Bharuch Detour Dock"
          truckProgress={
            trip.status === 'delivery_arrived' || trip.status === 'pod_submitted' || trip.status === 'completed'
              ? 0.98
              : trip.status === 'in_transit'
              ? 0.65
              : 0.15
          }
          truckSpeedKmh={58}
          showTraffic={false}
          showControls={true}
          defaultTheme="dark"
        />
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-20 flex items-center justify-between p-4">
        <Link
          href="/home"
          aria-label="Go back"
          className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-900 shadow-md active:scale-95 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <span className={`inline-flex items-center gap-1.5 rounded-lg ${badge.color} px-3 py-1.5 text-xs font-bold text-white shadow-md`}>
          <Circle className="h-2 w-2 fill-current animate-pulse" />
          {badge.label}
        </span>

        <button
          onClick={handleSimulateNextStep}
          className="rounded-lg bg-[#0B192C]/80 hover:bg-[#0B192C] px-3 py-1.5 text-xs font-bold text-white border border-white/20 backdrop-blur shadow-sm active:scale-95 transition"
        >
          Step Status
        </button>
      </div>

      {/* Optional Turn-by-Turn HUD */}
      {showTurnByTurn && (
        <div className="relative z-20 mx-4 mt-2">
          <LiveNavigationTracker
            speedKmh={58}
            detourAlert={detourAlert}
            onAcceptDetour={() => {
              alert('Detour load added to route itinerary via Ankleshwar!')
              setDetourAlert(null)
            }}
          />
        </div>
      )}

      {/* 2. USEFUL BOTTOM MOBILITY PANEL */}
      <div className="relative mt-auto rounded-t-2xl border-t border-slate-200 bg-white p-5 shadow-2xl z-20 space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar">
        {/* Metric summary */}
        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Live ETA</p>
            <p className="font-sans text-lg font-black text-slate-900">
              {trip.status === 'delivery_arrived'
                ? 'Arrived'
                : trip.status === 'pod_submitted' || trip.status === 'completed'
                ? 'Completed'
                : '1h 25m'}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Distance Remaining</p>
            <p className="font-sans text-lg font-black text-slate-900">
              {trip.status === 'delivery_arrived' || trip.status === 'pod_submitted' || trip.status === 'completed'
                ? '0 km'
                : '82 km'}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Freight Payout</p>
            <p className="font-sans text-lg font-black text-emerald-700">
              {formatINR(trip.fare)}
            </p>
          </div>
        </div>

        {/* Origin & Destination Stops */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-slate-900">Pickup: {trip.origin}</p>
              <p className="text-[11px] text-slate-500">{trip.originAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 h-3 w-3 rounded-full bg-[#F06524] ring-2 ring-orange-100 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-slate-900">Delivery: {trip.destination}</p>
              <p className="text-[11px] text-slate-500">{trip.destinationAddress}</p>
            </div>
          </div>
        </div>

        {/* Primary Actions: Navigate / Call / Complete Delivery POD */}
        <div className="space-y-2 pt-1">
          {trip.status !== 'pod_submitted' && trip.status !== 'settled' && trip.status !== 'completed' ? (
            <button
              onClick={() => setShowPodModal(true)}
              className="btn-accent w-full py-3.5 text-sm justify-center"
            >
              <FileSignature className="h-4 w-4" /> Submit Consignee Digital POD
            </button>
          ) : (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Trip delivered &amp; {formatINR(trip.fare)} settled to wallet balance.</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setShowTurnByTurn(!showTurnByTurn)}
              className="btn-primary py-3 text-xs justify-center"
            >
              <Navigation className="h-4 w-4" /> {showTurnByTurn ? 'Map View' : 'Guidance'}
            </button>
            <button
              onClick={() => setShowChatModal(true)}
              className="btn-outline py-3 text-xs justify-center"
            >
              <MessageSquare className="h-4 w-4 text-[#F06524]" /> Chat
            </button>
            <a
              href={`tel:${trip.shipperPhone}`}
              className="btn-outline py-3 text-xs justify-center"
            >
              <Phone className="h-4 w-4 text-emerald-600" /> Call
            </a>
          </div>
        </div>
      </div>

      {/* In-App Chat Modal */}
      {showChatModal && (
        <InAppChatModal
          tripId={trip.id}
          partnerName={trip.shipperName}
          partnerPhone={trip.shipperPhone}
          partnerRole="Shipper Contact"
          onClose={() => setShowChatModal(false)}
        />
      )}

      {/* Digital POD Modal */}
      {showPodModal && (
        <PodModal
          tripId={trip.id}
          settledAmount={trip.fare}
          onClose={() => setShowPodModal(false)}
          onSuccess={() => {
            setShowPodModal(false)
          }}
        />
      )}
    </div>
  )
}
