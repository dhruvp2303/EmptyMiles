'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { List, Map as MapIcon, SlidersHorizontal, Truck as TruckIcon, X, ChevronRight, Package, ArrowRight } from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { CargoCard } from '@/components/hunt/cargo-card'
import { MatchPill } from '@/components/ui/match-pill'
import { GoogleMapView } from '@/components/maps/google-map-view'
import { cn } from '@/lib/utils'
import { cargoCategories, formatINR } from '@/lib/data'
import { rankCargo } from '@/lib/match'
import { useApp } from '@/lib/app-context'

import { CargoSearchBar } from '@/components/ui/cargo-search-bar'

type View = 'list' | 'map'

export default function HuntPage() {
  const { truck, cargosList } = useApp()
  const [view, setView] = useState<View>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [type, setType] = useState<string>('All')
  const [minMatch, setMinMatch] = useState(0)
  const [selected, setSelected] = useState(0)

  const ranked = useMemo(() => rankCargo(truck, cargosList), [truck, cargosList])
  const filtered = useMemo(
    () =>
      ranked.filter(({ cargo, match }) => {
        const matchesType = type === 'All' || cargo.cargoType === type
        const matchesScore = match.score >= minMatch
        const matchesSearch =
          !searchQuery.trim() ||
          cargo.cargoType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cargo.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cargo.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cargo.shipperName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesType && matchesScore && matchesSearch
      }),
    [ranked, type, minMatch, searchQuery]
  )

  const active = filtered[Math.min(selected, Math.max(0, filtered.length - 1))]

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader
        title="Cargo Hunt"
        back
        right={
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            aria-label="Filters"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        }
      />

      <div className="px-4 pt-2 space-y-3">
        {/* Logo Search Bar */}
        <CargoSearchBar
          placeholder="Search cargo, corridor, city, or shipper..."
          value={searchQuery}
          onChange={setSearchQuery}
          showFilterButton
          onFilterClick={() => setShowFilters(true)}
        />

        {/* Active Truck Capacity Bar */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-[#0B192C]">
              <TruckIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-sans text-xs font-black text-slate-900">
                {truck.availableTon}T Available Space
              </p>
              <p className="text-[11px] text-slate-500">
                {truck.origin} → {truck.destination} ({filtered.length} matches)
              </p>
            </div>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            Active Radar
          </span>
        </div>

        {/* View Switcher (List vs Map) */}
        <div className="flex rounded-lg bg-slate-200 p-0.5">
          <button
            type="button"
            onClick={() => setView('list')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-bold transition',
              view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            )}
          >
            <List className="h-3.5 w-3.5" /> List View ({filtered.length})
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-bold transition',
              view === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            )}
          >
            <MapIcon className="h-3.5 w-3.5" /> Corridor Map
          </button>
        </div>
      </div>

      {/* List View */}
      {view === 'list' ? (
        <div className="flex flex-col gap-3 px-4 pt-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-500 space-y-3 logistics-card">
              <Package className="h-8 w-8 text-slate-300 mx-auto" />
              <div>
                <p className="font-bold text-slate-800 text-sm">No compatible cargo matches</p>
                <p className="text-slate-500 mt-0.5">
                  No compatible cargo is available for this trip right now.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setType('All')
                  setMinMatch(0)
                }}
                className="btn-outline mx-auto py-2 text-xs"
              >
                Reset Filters or Check Again
              </button>
            </div>
          ) : (
            filtered.map(({ cargo, match }) => (
              <CargoCard key={cargo.id} cargo={cargo} match={match} />
            ))
          )}
        </div>
      ) : (
        /* Map-First View */
        <div className="relative mt-3 flex-1 min-h-[480px] overflow-hidden">
          <div className="absolute inset-0">
            <GoogleMapView
              origin={truck.origin}
              destination={truck.destination}
              originLabel={truck.origin}
              destinationLabel={truck.destination}
              cargos={filtered.map(({ cargo, match }) => ({
                id: cargo.id,
                title: `${cargo.weightTon}T ${cargo.cargoType}`,
                location: cargo.origin,
                weightTon: cargo.weightTon,
                price: cargo.price,
                matchScore: match.score,
                shipper: cargo.shipperName,
              }))}
              selectedCargoId={active?.cargo.id}
              onSelectCargo={(c) => {
                const idx = filtered.findIndex((f) => f.cargo.id === c.id)
                if (idx !== -1) setSelected(idx)
              }}
              truckProgress={0.5}
              showTraffic={false}
              showControls={true}
              defaultTheme="dark"
            />
          </div>

          {active && (
            <div className="absolute inset-x-4 bottom-4 z-20">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-base font-black text-slate-900">
                      {active.cargo.weightTon.toFixed(1)} TON • {active.cargo.cargoType}
                    </span>
                    <p className="text-xs font-semibold text-slate-600">
                      {active.cargo.origin} → {active.cargo.destination}
                    </p>
                  </div>
                  <MatchPill score={active.match.score} band={active.match.band} size="sm" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="font-sans font-black text-emerald-700">
                    {formatINR(active.cargo.price)} (+{active.cargo.detourKm} km detour)
                  </span>
                  <Link
                    href={`/hunt/${active.cargo.id}`}
                    className="btn-primary py-1.5 px-3 text-xs"
                  >
                    View Cargo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0">
          <div className="w-full max-w-lg rounded-t-2xl bg-white p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-sans text-base font-bold text-slate-900">Filter Cargo Loads</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-slate-700 mb-2">Cargo Category</p>
              <div className="flex flex-wrap gap-2">
                {['All', ...cargoCategories].map((itemType) => (
                  <button
                    key={itemType}
                    type="button"
                    onClick={() => setType(itemType)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-semibold transition',
                      type === itemType
                        ? 'border-[#0B192C] bg-[#0B192C] text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {itemType}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Minimum Match Score</span>
                <span className="text-[#F06524]">{minMatch}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={minMatch}
                onChange={(e) => setMinMatch(parseInt(e.target.value))}
                className="w-full accent-[#F06524]"
              />
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="btn-primary w-full py-3"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
