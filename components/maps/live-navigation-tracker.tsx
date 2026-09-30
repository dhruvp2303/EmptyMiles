'use client'

import { useState, useEffect } from 'react'
import {
  Navigation,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
  Clock,
  Gauge,
  MapPin,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'

interface LiveNavigationTrackerProps {
  currentStepIndex?: number
  speedKmh?: number
  detourAlert?: { title: string; extraMinutes: number; rewardINR: number } | null
  onAcceptDetour?: () => void
  className?: string
}

export function LiveNavigationTracker({
  currentStepIndex = 2,
  speedKmh = 64,
  detourAlert,
  onAcceptDetour,
  className = '',
}: LiveNavigationTrackerProps) {
  const [isMuted, setIsMuted] = useState(false)

  const steps = [
    { instruction: 'Merge onto National Highway 48 southbound toward Surat', distance: '1.2 km', road: 'NH 48 Expressway' },
    { instruction: 'Pass through Kheda Toll Plaza (Fastag Lane 04)', distance: '18 km', road: 'NH 48 Tollway' },
    { instruction: 'In 3.5 km, take Exit 14 for Bharuch Chemical Complex Cargo Dock', distance: '3.5 km', road: 'Bharuch Link Road' },
    { instruction: 'Arrive at Loading Dock: Surat Textile Market Hub', distance: '78 km', road: 'Ring Road Logistics' },
  ]

  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)]

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Detour Opportunity Live Alert */}
      {detourAlert && (
        <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-950/60 p-3.5 backdrop-blur-md text-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Cargo Hunt Detour Match
            </div>
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              +{detourAlert.extraMinutes} mins
            </span>
          </div>

          <p className="mt-1 text-xs font-bold text-white">{detourAlert.title}</p>

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-amber-500/20">
            <span className="text-xs text-amber-200 font-semibold">+₹{detourAlert.rewardINR.toLocaleString()} Payout</span>
            <button
              type="button"
              onClick={onAcceptDetour}
              className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition active:scale-95"
            >
              Add Cargo Stop
            </button>
          </div>
        </div>
      )}

      {/* Turn-by-Turn Maneuver Card */}
      <div className="rounded-2xl border border-white/15 bg-slate-900/90 p-4 text-white shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl brand-gradient text-white shadow-lg">
            <ArrowUpRight className="h-7 w-7" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-extrabold text-brand">
                {currentStep.distance}
              </span>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white transition"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs font-bold text-white leading-tight mt-0.5">
              {currentStep.instruction}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand" /> {currentStep.road}
            </p>
          </div>
        </div>

        {/* HUD Telemetry Strip */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Gauge className="h-4 w-4 text-emerald-400" />
            <span>Speed: <strong className="text-white">{speedKmh} km/h</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>ETA: <strong className="text-white">1h 25m</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Navigation className="h-4 w-4 text-blue-400" />
            <span>Rem: <strong className="text-white">82 km</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
