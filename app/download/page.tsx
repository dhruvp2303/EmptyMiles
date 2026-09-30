'use client'

import React from 'react'
import Link from 'next/link'
import {
  Download,
  Globe,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { LogoMark, Wordmark } from '@/components/brand/logo'

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <LogoMark variant="color" className="h-9 w-9 transition-transform group-hover:scale-105" />
            <Wordmark className="h-6 w-auto" />
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
          >
            <Globe className="h-4 w-4 text-brand" />
            <span>Open Web App</span>
          </Link>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        <div className="max-w-2xl w-full mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Official Android App Release
          </div>

          {/* App Info Box */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-2xl shadow-brand/10">
                <LogoMark variant="color" className="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-lg" badge />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              EmptyMiles <span className="text-brand">Android App</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
              India&apos;s Fastest Intercity Return-Ride &amp; Cargo Logistics Platform. Save up to 40% fuel on empty corridors.
            </p>

            {/* Spec pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-medium text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Version 1.0.0</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Android 7.0+</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified &amp; Safe
              </span>
            </div>
          </div>

          {/* EXACTLY 2 MAIN ACTION BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-md mx-auto">
            {/* Button 1: Download APK */}
            <a
              href="/EmptyMiles.apk"
              download="EmptyMiles.apk"
              className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand to-amber-500 hover:from-brand/90 hover:to-amber-500/90 text-white font-bold text-base shadow-xl shadow-brand/25 active:scale-[0.98] transition-all"
            >
              <Download className="h-5 w-5" />
              <span>Download APK</span>
            </a>

            {/* Button 2: View on Web */}
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-white font-bold text-base shadow-lg active:scale-[0.98] transition-all"
            >
              <Globe className="h-5 w-5 text-slate-300" />
              <span>View on Web</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>

          {/* Quick Install Guide Card */}
          <div className="pt-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-brand" />
                Quick Installation on Android
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-brand/20 text-brand font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Tap <strong>Download APK</strong> above. If prompted with a browser warning, tap <strong>&ldquo;Download anyway&rdquo;</strong>.</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-brand/20 text-brand font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Open the downloaded file and enable <strong>&ldquo;Allow from this source&rdquo;</strong> if prompted.</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Tap <strong>Install</strong> and start booking live cargo loads!</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} EmptyMiles Logistics Pvt. Ltd. All rights reserved.</p>
      </footer>
    </div>
  )
}
