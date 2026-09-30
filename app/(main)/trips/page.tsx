'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Truck as TruckIcon, CheckCircle2, Circle, ArrowRight, MapPin, Package } from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { cn } from '@/lib/utils'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'

export default function TripsPage() {
  const { trips } = useApp()
  const [tab, setTab] = useState<'ongoing' | 'completed' | 'cancelled'>('ongoing')

  const tabs = [
    { key: 'ongoing' as const, label: 'Ongoing & Active' },
    { key: 'completed' as const, label: 'Completed' },
    { key: 'cancelled' as const, label: 'Cancelled' },
  ]

  const mockTrips = [
    {
      id: 'TR-9001',
      origin: 'Ahmedabad (Sanand GIDC)',
      destination: 'Surat (Ring Road Textile Hub)',
      timeAgo: 'Today',
      cargoTitle: '6.0T General Goods (Textiles)',
      loadedTon: 12,
      totalTon: 20,
      unusedTon: 8,
      fare: 8400,
      status: 'ongoing',
      isHuntActive: true,
    },
    {
      id: 'TR-8002',
      origin: 'Rajkot Industrial Zone',
      destination: 'Vadodara (Makarpura GIDC)',
      timeAgo: 'Yesterday',
      cargoTitle: '5.0T Auto Ancillary Spares',
      loadedTon: 10,
      totalTon: 15,
      unusedTon: 5,
      fare: 7200,
      status: 'completed',
      isHuntActive: false,
    },
  ]

  const filtered = mockTrips.filter((t) => t.status === tab)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader title="Trips &amp; Dispatches" />

      {/* Tabs */}
      <div className="px-4 pt-3">
        <div className="flex rounded-lg bg-slate-200 p-0.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'flex-1 rounded-md py-1.5 text-xs font-bold transition',
                tab === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Trips list */}
      <div className="flex flex-col gap-3 px-4 pt-3.5">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400 space-y-2 logistics-card">
            <TruckIcon className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No {tab} trips logged</p>
            <p className="text-slate-500">Your dispatched trips will appear here.</p>
          </div>
        ) : (
          filtered.map((trip) => (
            <div
              key={trip.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-sans text-sm font-black text-slate-900">
                    <MapPin className="h-4 w-4 text-[#F06524]" />
                    <span>{trip.origin} → {trip.destination}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {trip.cargoTitle}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{trip.timeAgo}</span>
              </div>

              {/* Payload info pill */}
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 text-xs">
                <span className="text-slate-700 font-semibold">
                  Payload: <strong>{trip.loadedTon}T / {trip.totalTon}T</strong>
                </span>
                <span className="font-bold text-emerald-700">
                  {formatINR(trip.fare)} Freight Payout
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                {trip.isHuntActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                    <Circle className="h-2 w-2 fill-current animate-pulse" />
                    In Transit • Cargo Radar Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Completed &amp; Settled
                  </span>
                )}

                <Link
                  href="/trip"
                  className="btn-primary py-2 px-4 text-xs font-bold"
                >
                  Track Live <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
