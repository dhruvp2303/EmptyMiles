'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Truck,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Navigation,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { CargoSearchBar } from '@/components/ui/cargo-search-bar'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export default function FindTrucksPage() {
  const router = useRouter()
  const { shipperPosts, createBookingFromCargo, t } = useApp()
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'west' | 'north' | 'south' | 'east'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [showBookingSuccess, setShowBookingSuccess] = useState(false)

  // Pan-India passing truck capacity opportunities matching active freight corridors
  const allTrucks = [
    {
      id: 'TRK-9001',
      region: 'west',
      transporter: 'Sharma Logistics (Rahul Sharma)',
      vehicleModel: 'Tata 407 (Closed Container)',
      regNumber: 'MH 12 AB 1234',
      rating: 4.9,
      totalTrips: 148,
      verified: true,
      currentRoute: 'Ahmedabad → Surat',
      corridor: 'NH 48 (Gujarat)',
      totalCapacityTon: 20,
      availableCapacityTon: 8.0,
      matchScore: 96,
      etaPickup: '2:30 PM',
      detourKm: 2,
      price: 8400,
      driverPhoto: 'R',
    },
    {
      id: 'TRK-9002',
      region: 'west',
      transporter: 'Gujarat Freight Express (Vikram P.)',
      vehicleModel: 'Ashok Leyland 1616',
      regNumber: 'GJ 01 CD 5678',
      rating: 4.8,
      totalTrips: 92,
      verified: true,
      currentRoute: 'Ahmedabad → Mumbai (via Surat)',
      corridor: 'NH 48 (DMIC Corridor)',
      totalCapacityTon: 16,
      availableCapacityTon: 7.5,
      matchScore: 92,
      etaPickup: '4:00 PM',
      detourKm: 4,
      price: 8100,
      driverPhoto: 'V',
    },
    {
      id: 'TRK-9003',
      region: 'north',
      transporter: 'Sardar Transport Co. (Gurdeep Singh)',
      vehicleModel: 'Eicher Pro 3019',
      regNumber: 'PB 10 GH 3421',
      rating: 4.7,
      totalTrips: 210,
      verified: true,
      currentRoute: 'Ludhiana → Delhi NCR',
      corridor: 'NH 44 (North Corridor)',
      totalCapacityTon: 19,
      availableCapacityTon: 9.0,
      matchScore: 94,
      etaPickup: '3:15 PM',
      detourKm: 3,
      price: 11400,
      driverPhoto: 'G',
    },
    {
      id: 'TRK-9004',
      region: 'south',
      transporter: 'Deccan Cargo Movers (Murugan S.)',
      vehicleModel: 'BharatBenz 2823R (10-Wheeler)',
      regNumber: 'KA 05 MN 9012',
      rating: 4.9,
      totalTrips: 184,
      verified: true,
      currentRoute: 'Bengaluru → Chennai (via Hosur)',
      corridor: 'NH 48 (South Expressway)',
      totalCapacityTon: 20,
      availableCapacityTon: 8.5,
      matchScore: 95,
      etaPickup: '2:45 PM',
      detourKm: 2,
      price: 14800,
      driverPhoto: 'M',
    },
    {
      id: 'TRK-9005',
      region: 'east',
      transporter: 'Bengal Roadlines (Debashis Roy)',
      vehicleModel: 'Tata Signa 2823',
      regNumber: 'WB 24 XY 6789',
      rating: 4.8,
      totalTrips: 130,
      verified: true,
      currentRoute: 'Kolkata (Dankuni) → Patna',
      corridor: 'NH 19 (Eastern Corridor)',
      totalCapacityTon: 22,
      availableCapacityTon: 10.0,
      matchScore: 91,
      etaPickup: '5:00 PM',
      detourKm: 4,
      price: 21500,
      driverPhoto: 'D',
    },
  ]

  const matchedTrucks = allTrucks.filter((t) => {
    const matchesRegion = selectedRegion === 'all' || t.region === selectedRegion
    const matchesSearch =
      !searchQuery.trim() ||
      t.transporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.currentRoute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.corridor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const handleInstantBook = (truckId: string) => {
    setIsBooking(true)
    setTimeout(() => {
      createBookingFromCargo('CG-6001')
      setIsBooking(false)
      setShowBookingSuccess(true)
    }, 800)
  }

  return (
    <div className="flex min-h-full flex-col bg-background pb-24">
      <AppHeader title={t('findSpaceTitle') || 'Find Available Capacity'} back />

      <div className="px-5 pt-3 space-y-4">
        {/* Cargo Search Bar with Logo */}
        <CargoSearchBar
          placeholder="Search trucks, corridors (e.g. NH 48), or routes..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Search summary card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-semibold text-slate-700">Active Freight Request</span>
            <span className="font-bold text-[#F06524]">6.0 Tons • Industrial Freight</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <p className="text-xs font-bold text-slate-900">Ahmedabad (Sanand GIDC) → Surat</p>
            </div>
            <Link href="/post-cargo" className="text-xs font-bold text-[#F06524] hover:underline">
              Edit Route
            </Link>
          </div>
        </div>

        {/* Pan-India National Freight Corridor Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          {[
            { id: 'all', label: 'All India (National)' },
            { id: 'west', label: 'West (NH 48 / DMIC)' },
            { id: 'north', label: 'North (NH 44 / NH 19)' },
            { id: 'south', label: 'South (NH 48 / NH 65)' },
            { id: 'east', label: 'East (NH 19 / NH 16)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRegion(tab.id as any)}
              className={cn(
                'shrink-0 rounded-lg px-3 py-1.5 transition border',
                selectedRegion === tab.id
                  ? 'bg-[#0B192C] text-white border-[#0B192C] font-bold shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            {matchedTrucks.length} Compatible Running Trucks
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Live Capacity Radar
          </span>
        </div>

        {/* Matched Trucks List */}
        <div className="space-y-3">
          {matchedTrucks.map((trk) => (
            <div
              key={trk.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3 transition hover:border-slate-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white font-sans font-black text-sm">
                    {trk.driverPhoto}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-sans text-sm font-bold text-slate-900">{trk.transporter}</p>
                      {trk.verified && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                    </div>
                    <p className="text-xs text-slate-500">
                      {trk.vehicleModel} • <span className="font-mono font-bold text-slate-700 text-[11px]">{trk.regNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs font-black text-emerald-700">
                    {trk.matchScore}% Match
                  </span>
                </div>
              </div>

              {/* Capacity & Route Details */}
              <div className="rounded-lg bg-slate-50 p-3 space-y-1.5 text-xs text-slate-600 border border-slate-100">
                <div className="flex items-center justify-between text-slate-900 font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {trk.availableCapacityTon}T Available Payload
                  </span>
                  <span>+{trk.detourKm} km Detour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pickup ETA: <strong className="text-slate-900">{trk.etaPickup}</strong></span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="h-3 w-3 fill-current" /> {trk.rating} ({trk.totalTrips} Trips)
                  </span>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Instant Escrow Rate</p>
                  <p className="font-sans text-lg font-black text-emerald-700">{formatINR(trk.price)}</p>
                </div>

                <button
                  disabled={isBooking}
                  onClick={() => handleInstantBook(trk.id)}
                  className="btn-accent px-4 py-2 text-xs font-bold disabled:opacity-50"
                >
                  {isBooking ? 'Securing Load...' : 'Book Capacity'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl border border-slate-200 space-y-4">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-slate-900">Capacity Booked &amp; Dispatched</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Rahul Sharma (Tata 407 • MH 12 AB 1234) • {formatINR(8400)} held in secure escrow.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-xs text-left space-y-1 border border-slate-100">
              <p className="font-bold text-slate-900">Driver Contact: +91 98765 43210</p>
              <p className="text-slate-500">Status: <strong className="text-emerald-700">En Route to Pickup</strong></p>
            </div>
            <button
              onClick={() => {
                setShowBookingSuccess(false)
                router.push('/trip')
              }}
              className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Navigation className="h-4 w-4 text-[#F06524]" /> Track Live Shipment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
