import Link from 'next/link'
import { MapPin, Route, Clock, ArrowRight, ShieldCheck } from 'lucide-react'
import { MatchPill } from '@/components/ui/match-pill'
import { formatINR } from '@/lib/data'
import type { Cargo, MatchResult } from '@/lib/match'

export function CargoCard({
  cargo,
  match,
}: {
  cargo: Cargo
  match: MatchResult
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition space-y-3">
      {/* Top row: Weight & Match Tag */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-black text-slate-900">
              {cargo.weightTon.toFixed(1)} TON
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
              {cargo.cargoType}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#F06524] shrink-0" />
            <span>{cargo.origin.split('(')[0].trim()} → {cargo.destination.split('(')[0].trim()}</span>
          </p>
        </div>

        <MatchPill score={match.score} band={match.band} size="md" />
      </div>

      {/* Pricing & Detour specs */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-2.5 text-xs">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Guaranteed Rate</p>
          <p className="font-sans text-sm font-black text-emerald-700">{formatINR(cargo.price)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Route Deviation</p>
          <p className="font-sans text-xs font-bold text-slate-800">+{cargo.detourKm} km ({cargo.detourMinutes} mins)</p>
        </div>
      </div>

      {/* Pickup Window */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
        <span className="flex items-center gap-1 text-[11px]">
          <Clock className="h-3.5 w-3.5 text-slate-400" /> {cargo.pickupWindow.split('to')[0].trim()}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified Shipper
        </span>
      </div>

      {/* Action Button */}
      <Link
        href={`/hunt/${cargo.id}`}
        className="btn-primary w-full py-2.5 text-xs justify-center font-bold"
      >
        View Cargo <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
