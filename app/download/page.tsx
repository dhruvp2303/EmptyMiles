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
  Truck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Lock,
  ExternalLink,
  Zap,
} from 'lucide-react'
import { LogoMark, Wordmark } from '@/components/brand/logo'

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between selection:bg-[#F06524] selection:text-white relative overflow-hidden font-sans">
      {/* Dynamic Background Ambient Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F06524]/20 via-[#2563EB]/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#F06524]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#070D18]/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <LogoMark variant="color" className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-white">
                Empty<span className="text-[#F06524]">Miles</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Logistics Network
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 hover:text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95"
          >
            <Globe className="h-4 w-4 text-[#F06524]" />
            <span>Open Web App</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col items-center justify-center">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F06524]/20 via-[#F06524]/10 to-[#2563EB]/20 border border-[#F06524]/30 text-[#FF7E3E] text-xs font-bold uppercase tracking-wider mb-8 shadow-lg shadow-[#F06524]/10 animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F06524] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F06524]"></span>
          </span>
          Official Android Release • Version 1.0.0
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Never Drive Empty. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF7E3E] via-[#F06524] to-[#F59E0B] bg-clip-text text-transparent">
              Zero Empty Miles.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed">
            India&apos;s fastest return-ride &amp; commercial cargo network. Match available truck payload in real-time and eliminate empty return trips.
          </p>
        </div>

        {/* Action Showcase Card */}
        <div className="w-full max-w-4xl mt-12 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F06524]/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: ONLY 2 ACTION BUTTONS */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4" /> 100% Virus-Free &amp; Verified APK
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Get EmptyMiles for Android
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Direct installation file (7.3 MB) • Compatible with Android 7.0 and newer.
                </p>
              </div>

              {/* THE 2 BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-4">
                
                {/* 1. DOWNLOAD APK BUTTON */}
                <a
                  href="/EmptyMiles.apk"
                  download="EmptyMiles.apk"
                  className="flex-1 group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-[#F06524] to-[#FF7E3E] hover:from-[#E05310] hover:to-[#F06524] text-white font-extrabold text-base shadow-xl shadow-[#F06524]/30 hover:shadow-[#F06524]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-base font-black">Download APK</span>
                    <span className="text-[11px] text-white/80 font-medium">Direct File (7.3 MB)</span>
                  </div>
                </a>

                {/* 2. VIEW ON WEB BUTTON */}
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-extrabold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-md"
                >
                  <Globe className="h-5 w-5 text-[#38BDF8]" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-base font-black">View on Web</span>
                    <span className="text-[11px] text-slate-400 font-medium">Open in Browser</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 ml-auto hidden sm:inline" />
                </Link>

              </div>

              {/* Verified Features Row */}
              <div className="pt-3 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs font-bold text-white">Instant OTP</div>
                  <div className="text-[10px] text-slate-400">Zero Password Login</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs font-bold text-white">Live Tracking</div>
                  <div className="text-[10px] text-slate-400">GPS Corridor Match</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs font-bold text-white">Fast Escrow</div>
                  <div className="text-[10px] text-slate-400">Digital POD Payout</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive App Preview Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-[#0B192C]/90 border border-[#2563EB]/25 rounded-2xl p-5 shadow-2xl space-y-4 relative">
                
                {/* Live Corridor Simulation */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">Active Match Found</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#F06524] font-bold">₹42,500</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#F06524]" /> Delhi ➔ Mumbai
                    </span>
                    <span className="font-semibold text-white">1,420 km</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Available Payload:</span>
                    <span className="font-semibold text-emerald-400">4.5 Ton Part Load</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Fuel Saved:</span>
                    <span className="font-semibold text-white">~38% (Zero Deadhead)</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="p-2 bg-white rounded-xl shrink-0 shadow-md">
                    {/* SVG QR code pointing directly to APK */}
                    <svg viewBox="0 0 100 100" className="w-16 h-16 text-slate-950" fill="currentColor">
                      <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                      <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                      <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                      <rect x="35" y="5" width="6" height="6" fill="currentColor" />
                      <rect x="45" y="10" width="6" height="10" fill="currentColor" />
                      <rect x="55" y="5" width="8" height="6" fill="currentColor" />
                      <rect x="38" y="25" width="10" height="6" fill="currentColor" />
                      <rect x="40" y="40" width="20" height="20" fill="#F06524" />
                      <rect x="70" y="38" width="8" height="8" fill="currentColor" />
                      <rect x="38" y="70" width="8" height="12" fill="currentColor" />
                      <rect x="50" y="68" width="12" height="6" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5 text-[#F06524]" /> Scan with Phone
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Point phone camera to download APK directly to your device.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 3-Step Simple Android Installation */}
        <section className="w-full max-w-4xl mt-12 space-y-5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">
            How to Install on Android in 3 Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-xl bg-[#F06524]/20 border border-[#F06524]/40 text-[#F06524] font-black text-xs flex items-center justify-center">
                  1
                </span>
                <Download className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Download APK</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Click <strong>Download APK</strong>. If Android shows <em>&ldquo;File might be harmful&rdquo;</em>, select <strong>&ldquo;Download anyway&rdquo;</strong>.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-xl bg-[#F06524]/20 border border-[#F06524]/40 text-[#F06524] font-black text-xs flex items-center justify-center">
                  2
                </span>
                <Lock className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Allow Installation</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Open the downloaded file. When prompted, toggle <strong>&ldquo;Allow from this source&rdquo;</strong> in your browser settings.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Install &amp; Log In</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Tap <strong>Install</strong>, then open EmptyMiles and log in with your phone number to start matching cargo!
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070D18]/80 backdrop-blur-md py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} EmptyMiles Logistics Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
