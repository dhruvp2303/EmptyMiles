'use client'

import React, { useState, useEffect } from 'react'
import {
  Download,
  Share2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Truck,
  FileCheck,
  Lock,
  ExternalLink,
  QrCode
} from 'lucide-react'
import { LogoMark, CargoTruckIcon } from '@/components/brand/logo'
import { AppHeader } from '@/components/shell/app-header'

export default function DownloadPage() {
  const [copied, setCopied] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
      setDownloadUrl(`${window.location.origin}/EmptyMiles.apk`)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl || `${origin}/EmptyMiles.apk`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Download EmptyMiles Android App',
      text: 'Download the official EmptyMiles APK for live cargo loads, return ride matching, and zero empty kilometers:',
      url: downloadUrl || `${origin}/EmptyMiles.apk`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // Fallback to copy or WhatsApp
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`
      window.open(whatsappUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand selection:text-white">
      <AppHeader title="Download EmptyMiles App" subtitle="Official Android APK (Direct Download)" back />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold tracking-wide uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Latest Official Release
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <LogoMark variant="color" className="h-16 w-16 shadow-xl" badge={true} />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                    EmptyMiles <span className="text-brand">Android</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">
                    India&apos;s Fastest Intercity Return-Ride & Cargo Logistics
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] text-slate-300 font-semibold">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">Version 1.0.0</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">Android 7.0+</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified & Safe APK
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="/EmptyMiles.apk"
                  download="EmptyMiles.apk"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand to-amber-500 text-white font-bold text-sm shadow-lg shadow-brand/25 hover:opacity-95 active:scale-[0.98] transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Download APK (Direct)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm active:scale-[0.98] transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-300" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-sm active:scale-[0.98] transition"
                  title="Share download link"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sm:hidden">Share with Drivers</span>
                </button>
              </div>
            </div>

            {/* Right QR Box */}
            <div className="flex flex-col items-center bg-slate-950/80 border border-slate-800 p-5 rounded-2xl shadow-inner text-center shrink-0">
              <div className="p-3 bg-white rounded-xl shadow-md">
                {/* Clean inline SVG QR code pointing directly to APK or Download page */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-32 h-32 text-slate-950"
                  fill="currentColor"
                  shapeRendering="crispEdges"
                >
                  {/* Outer Frame */}
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                  {/* QR Pattern Blocks */}
                  <rect x="35" y="5" width="6" height="6" fill="currentColor" />
                  <rect x="45" y="10" width="6" height="10" fill="currentColor" />
                  <rect x="55" y="5" width="8" height="6" fill="currentColor" />
                  <rect x="38" y="25" width="10" height="6" fill="currentColor" />
                  <rect x="55" y="20" width="6" height="12" fill="currentColor" />

                  <rect x="10" y="40" width="8" height="6" fill="currentColor" />
                  <rect x="25" y="38" width="6" height="14" fill="currentColor" />
                  <rect x="40" y="40" width="20" height="20" fill="#F06524" />
                  <rect x="70" y="38" width="8" height="8" fill="currentColor" />
                  <rect x="85" y="42" width="10" height="6" fill="currentColor" />

                  <rect x="10" y="55" width="12" height="6" fill="currentColor" />
                  <rect x="70" y="55" width="10" height="8" fill="currentColor" />
                  <rect x="85" y="55" width="10" height="10" fill="currentColor" />

                  <rect x="38" y="70" width="8" height="12" fill="currentColor" />
                  <rect x="50" y="68" width="12" height="6" fill="currentColor" />
                  <rect x="68" y="72" width="6" height="18" fill="currentColor" />
                  <rect x="80" y="75" width="15" height="6" fill="currentColor" />
                  <rect x="42" y="86" width="18" height="8" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-slate-300 mt-2.5 flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-brand" /> Scan to Download on Phone
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Use Phone Camera or QR Scanner</span>
            </div>
          </div>
        </section>

        {/* Direct Link Share Banner */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
              <Share2 className="h-5 w-5 text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-300">Shareable Direct Download Link:</div>
              <div className="text-xs font-mono text-brand truncate max-w-md">
                {downloadUrl || `${origin}/EmptyMiles.apk`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand/90 active:scale-95 transition"
            >
              {copied ? 'Copied to Clipboard!' : 'Copy Link'}
            </button>
          </div>
        </section>

        {/* Step-by-Step Installation Guide */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-brand" />
            How to Install the APK on Android
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <Download className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Download APK</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Tap the <strong>Download APK</strong> button. When the browser asks <em>&quot;File might be harmful&quot;</em>, select <strong>&quot;Download anyway&quot;</strong>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Allow Unknown Sources</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Open the downloaded file. If prompted with security settings, toggle <strong>&quot;Allow from this source&quot;</strong> for your browser.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Install &amp; Log In</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Tap <strong>&quot;Install&quot;</strong>, then open EmptyMiles. Log in with your mobile number to start booking &amp; posting cargo loads!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why EmptyMiles App Features */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Why Use the EmptyMiles Android App?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Truck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Zero Empty Kilometers</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Find return trips automatically &amp; save up to 40% on fuel.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Zap className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Instant Load Matching</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Live corridors with verified shippers across major routes.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <FileCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Digital POD &amp; Fast Pay</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Instant proof of delivery upload with direct wallet escrow.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">100% GST &amp; KYC Verified</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Safe, verified logistics network for fleet owners &amp; transporters.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
