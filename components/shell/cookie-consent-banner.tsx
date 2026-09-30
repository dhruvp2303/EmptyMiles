'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheck, Cookie, X } from 'lucide-react'
import { CargoTruckIcon } from '@/components/brand/logo'

export function CookieConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('emptymiles_cookie_consent')
      if (!consent) {
        // Show after a brief delay for smooth entrance
        const timer = setTimeout(() => setShow(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // Ignore in SSR
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('emptymiles_cookie_consent', 'accepted')
    } catch {}
    setShow(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem('emptymiles_cookie_consent', 'essential_only')
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-20 inset-x-4 sm:bottom-6 sm:right-6 sm:left-auto max-w-md z-50 animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-md p-4 text-white shadow-2xl space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#0B192C] to-[#1E3E62] border border-white/10 p-1 shrink-0">
              <CargoTruckIcon className="h-full w-full" variant="color" />
            </div>
            <div>
              <p className="font-sans text-xs font-black text-white flex items-center gap-1.5">
                Privacy &amp; Highway Analytics <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              </p>
              <p className="text-[11px] text-slate-300">
                We use cookies to optimize freight corridor matching and secure UPI payments.
              </p>
            </div>
          </div>
          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
          <Link
            href="/privacy-policy"
            className="text-[10px] font-semibold text-slate-400 hover:text-white underline"
          >
            Privacy Policy
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-lg bg-[#F06524] hover:bg-[#E05310] text-[11px] font-bold text-white transition shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
