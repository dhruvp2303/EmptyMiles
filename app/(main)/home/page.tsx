'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell,
  Radar,
  Truck as TruckIcon,
  Wallet,
  ArrowRight,
  PlusCircle,
  Package,
  Layers,
  MapPin,
  CheckCircle2,
  Navigation,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { CargoCard } from '@/components/hunt/cargo-card'
import { CargoSearchBar } from '@/components/ui/cargo-search-bar'
import { GoogleMapView } from '@/components/maps/google-map-view'
import { formatINR } from '@/lib/data'
import { rankCargo } from '@/lib/match'
import { useApp } from '@/lib/app-context'
import { LanguageModal } from '@/components/shell/language-modal'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'

export default function HomePage() {
  const router = useRouter()
  const {
    role,
    setRole,
    truck: currentTruck,
    cargosList,
    shipperPosts,
    user,
    unreadNotifications,
    activeTrip,
    t,
    language,
  } = useApp()
  const [showLangModal, setShowLangModal] = useState(false)
  const ranked = rankCargo(currentTruck, cargosList)
  const topMatches = ranked.slice(0, 3)
  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language)

  // ==========================================
  // 1. SHIPPER HOME DASHBOARD
  // ==========================================
  if (role === 'shipper') {
    return (
      <div className="flex flex-col gap-4 px-4 py-3 pb-28">
        {/* Top Header */}
        <header className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Shipper Portal</span>
            <h1 className="font-sans text-xl font-black text-slate-900">Hello, {user.firstName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole('truck_owner')}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              Switch to Driver
            </button>
            <Link
              href="/notifications"
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <Bell className="h-4 w-4 text-slate-700" />
              {unreadNotifications > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F06524]" />
              )}
            </Link>
          </div>
        </header>

        {/* Search Bar with Brand Logo */}
        <CargoSearchBar
          placeholder="Search freight corridors, return trucks, or routes..."
          onSearch={(q) => router.push(`/find-trucks?q=${encodeURIComponent(q)}`)}
        />

        {/* Primary Action Card: Post Cargo */}
        <div className="rounded-xl border border-slate-200 bg-[#0B192C] p-5 text-white shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded bg-[#F06524] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Discounted Part-Loads
              </span>
              <h2 className="font-sans text-lg font-black text-white mt-1.5">Post Cargo Shipment</h2>
              <p className="text-xs text-slate-300">Book return trucks with unused space on your corridor.</p>
            </div>
            <Package className="h-8 w-8 text-[#F06524] shrink-0" />
          </div>

          <Link href="/post-cargo" className="btn-accent w-full justify-center">
            <PlusCircle className="h-4 w-4" /> Post New Cargo
          </Link>
        </div>

        {/* Active Cargo Shipment Tracking */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Active Shipment (CG-6001)
            </span>
            <span className="text-xs font-bold text-emerald-600">In Transit</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-500 text-[11px]">Route</p>
              <p className="font-bold text-slate-900">Ahmedabad → Surat</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[11px]">Live ETA</p>
              <p className="font-bold text-[#F06524]">2h 15m (82 km remaining)</p>
            </div>
          </div>

          <Link href="/trip" className="btn-primary w-full py-2.5 text-xs justify-center">
            <Navigation className="h-3.5 w-3.5" /> Track Live on Map
          </Link>
        </div>

        {/* Shipper Quick Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/find-trucks" className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:bg-slate-50 transition">
            <Radar className="h-5 w-5 text-[#0B192C] mb-1.5" />
            <p className="font-sans text-xs font-bold text-slate-900">Find Trucks</p>
            <p className="text-[11px] text-slate-500">Search passing capacity</p>
          </Link>
          <Link href="/trips" className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:bg-slate-50 transition">
            <TruckIcon className="h-5 w-5 text-[#F06524] mb-1.5" />
            <p className="font-sans text-xs font-bold text-slate-900">Shipment History</p>
            <p className="text-[11px] text-slate-500">Past dispatches &amp; PODs</p>
          </Link>
        </div>
      </div>
    )
  }

  // ==========================================
  // 2. TRUCK OWNER / DRIVER HOME (MAIN PRODUCT)
  // ==========================================
  return (
    <div className="flex flex-col gap-4 px-4 py-3 pb-28">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {currentTruck.registration} • {currentTruck.model}
          </span>
          <h1 className="font-sans text-xl font-black text-slate-900">Namaste, {user.firstName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLangModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm"
          >
            <Globe className="h-3.5 w-3.5 text-[#F06524]" />
            <span>{currentLangMeta?.native || 'EN'}</span>
          </button>
          <Link
            href="/notifications"
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <Bell className="h-4 w-4 text-slate-700" />
            {unreadNotifications > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F06524]" />
            )}
          </Link>
        </div>
      </header>

      <LanguageModal isOpen={showLangModal} onClose={() => setShowLangModal(false)} />

      {/* Cargo Search Bar with Brand Logo */}
      <CargoSearchBar
        placeholder="Quick search cargo loads, destinations, or commodities..."
        onSearch={(q) => router.push(`/hunt`)}
      />

      {/* 1. AVAILABLE CAPACITY CARD */}
      <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-900">
              <TruckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Payload Capacity</p>
              <p className="font-sans text-sm font-black text-slate-900">
                {currentTruck.totalCapacityTon}T Total Capacity
              </p>
            </div>
          </div>
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-200">
            {currentTruck.availableTon}T Space Available
          </span>
        </div>

        {/* Capacity visual progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600">Loaded: {currentTruck.loadedTon} Ton</span>
            <span className="text-emerald-600">Empty: {currentTruck.availableTon} Ton</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
            <div
              className="h-full bg-slate-800"
              style={{ width: `${(currentTruck.loadedTon / currentTruck.totalCapacityTon) * 100}%` }}
            />
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${(currentTruck.availableTon / currentTruck.totalCapacityTon) * 100}%` }}
            />
          </div>
        </div>

        {/* PRIMARY ACTION: CARGO HUNT */}
        <Link href="/hunt" className="btn-accent w-full py-3.5 justify-center mt-2 font-black text-base">
          <Radar className="h-5 w-5" /> Cargo Hunt ({ranked.length} Loads Available)
        </Link>
      </div>

      {/* 2. CURRENT ACTIVE ROUTE ON CORRIDOR */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <MapPin className="h-4 w-4 text-[#F06524]" />
            <span>Active Corridor: {currentTruck.origin} → {currentTruck.destination}</span>
          </div>
          <Link href="/trip" className="text-xs font-bold text-[#F06524] hover:underline flex items-center gap-0.5">
            Live GPS <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Map Preview of Highway Corridor */}
        <div className="h-36 w-full overflow-hidden rounded-lg border border-slate-200">
          <GoogleMapView
            origin={currentTruck.origin}
            destination={currentTruck.destination}
            originLabel={currentTruck.origin}
            destinationLabel={currentTruck.destination}
            truckProgress={0.5}
            height="144px"
            showControls={false}
            showTelemetryOverlay={false}
            defaultTheme="silver"
          />
        </div>
      </div>

      {/* 3. FOUR FAST ACTIONS (CARGO HUNT, MY TRIPS, WALLET, VEHICLES) */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Quick Navigation</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: '/hunt', label: 'Cargo Hunt', icon: Radar },
            { href: '/trips', label: 'My Trips', icon: TruckIcon },
            { href: '/wallet', label: 'Wallet', icon: Wallet },
            { href: '/vehicles', label: 'Vehicles', icon: Layers },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm hover:bg-slate-50 transition active:scale-95"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-[#0B192C]">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. TOP MATCHING CARGO LOADS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-sm font-black text-slate-900">
            Top Compatible Loads on Corridor
          </h2>
          <Link href="/hunt" className="text-xs font-bold text-[#F06524] hover:underline">
            View All ({ranked.length})
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {topMatches.map(({ cargo, match }) => (
            <CargoCard key={cargo.id} cargo={cargo} match={match} />
          ))}
        </div>
      </div>
    </div>
  )
}
