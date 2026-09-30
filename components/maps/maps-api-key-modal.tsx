'use client'

import { useState, useEffect } from 'react'
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  X,
  Layers,
  Sparkles,
  MapPin,
  Navigation,
} from 'lucide-react'
import {
  getActiveGoogleMapsApiKey,
  setStoredGoogleMapsApiKey,
  testGoogleMapsApiKey,
  getMapsAuthStatus,
  MapsAuthStatus,
} from '@/lib/maps/google-maps-loader'

interface MapsApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MapsApiKeyModal({ isOpen, onClose }: MapsApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [status, setStatus] = useState<MapsAuthStatus>('demo_mode')
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; services?: string[] } | null>(null)

  useEffect(() => {
    if (isOpen) {
      const active = getActiveGoogleMapsApiKey()
      setApiKey(active)
      setStatus(getMapsAuthStatus())
      setTestResult(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSaveAndTest = async () => {
    setIsTesting(true)
    setTestResult(null)

    const trimmed = apiKey.trim()
    setStoredGoogleMapsApiKey(trimmed)

    if (!trimmed) {
      setStatus('demo_mode')
      setTestResult({
        success: true,
        message: 'EmptyMiles switched to Simulated GIS & Offline Corridor Engine.',
      })
      setIsTesting(false)
      return
    }

    const res = await testGoogleMapsApiKey(trimmed)
    setTestResult(res)
    setStatus(res.success ? 'authenticated' : 'invalid_key')
    setIsTesting(false)
  }

  const handleResetToDemo = () => {
    setStoredGoogleMapsApiKey('')
    setApiKey('')
    setStatus('demo_mode')
    setTestResult({
      success: true,
      message: 'Reset to EmptyMiles High-Precision Corridor Engine (Offline/Demo Mode).',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-ink p-6 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl brand-gradient text-white shadow-lg">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Google Maps Platform Suite</h2>
            <p className="text-xs text-slate-300">API Authentication, Geocoding & Routing Services</p>
          </div>
        </div>

        {/* Current Auth Status Indicator */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Authentication Status:</span>
            {status === 'authenticated' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" /> Authenticated (Live Google)
              </span>
            )}
            {status === 'demo_mode' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                <Sparkles className="h-3.5 w-3.5" /> High-Tech Corridor Simulator
              </span>
            )}
            {status === 'invalid_key' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
                <AlertCircle className="h-3.5 w-3.5" /> Invalid Key / Restricted
              </span>
            )}
            {status === 'loading' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Verifying...
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            EmptyMiles seamlessly supports live Google Maps Platform APIs (Places Autocomplete, Directions, Live Traffic, Geocoding) as well as offline Indian logistics corridor fallbacks.
          </p>
        </div>

        {/* API Key Input */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5 text-brand" /> Google Maps API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full rounded-xl border border-white/20 bg-slate-900/90 px-4 py-3 text-xs font-mono text-white placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
          />
          <p className="text-[11px] text-slate-400">
            Stored locally in your browser session and used for live routing requests.
          </p>
        </div>

        {/* Test Result Feedback */}
        {testResult && (
          <div
            className={`mt-4 rounded-xl border p-3 text-xs ${
              testResult.success
                ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
                : 'border-rose-500/30 bg-rose-950/40 text-rose-300'
            }`}
          >
            <div className="flex items-start gap-2">
              {testResult.success ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{testResult.message}</p>
                {testResult.services && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {testResult.services.map((s) => (
                      <span key={s} className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Google Cloud Services Checklist */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-2">
            <Layers className="h-3.5 w-3.5 text-brand" /> Enabled Platform Services
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Maps JavaScript API
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Places API (New)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Directions API
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Geocoding API
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDemo}
            className="rounded-xl border border-white/15 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
          >
            Reset to Demo
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleSaveAndTest}
              disabled={isTesting}
              className="inline-flex items-center gap-2 rounded-xl brand-gradient px-5 py-2.5 text-xs font-bold text-white shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              {isTesting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Save &amp; Authenticate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
