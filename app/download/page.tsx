'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import {
  Download,
  Globe,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  QrCode as QrCodeIcon,
} from 'lucide-react'
import { LogoMark } from '@/components/brand/logo'

export default function DownloadPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [apkUrl, setApkUrl] = useState<string>('https://emptymiles-three.vercel.app/EmptyMiles.apk')

  useEffect(() => {
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://emptymiles-three.vercel.app'
    const fullApkUrl = `${currentOrigin}/EmptyMiles.apk`
    setApkUrl(fullApkUrl)

    // Generate real, 100% scannable high-resolution QR code
    QRCode.toDataURL(fullApkUrl, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#070D18',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('QR Code generation failed', err))
  }, [])

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between selection:bg-[#F06524] selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F06524]/20 via-[#2563EB]/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#F06524]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#070D18]/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col items-center justify-center">
        
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F06524]/20 via-[#F06524]/10 to-[#2563EB]/20 border border-[#F06524]/30 text-[#FF7E3E] text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-[#F06524]/10">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F06524] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F06524]"></span>
          </span>
          Official Android App Release • v1.0.0
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Download <span className="bg-gradient-to-r from-[#FF7E3E] via-[#F06524] to-[#F59E0B] bg-clip-text text-transparent">EmptyMiles</span> for Android
          </h1>

          <p className="text-sm sm:text-base text-slate-300/90 max-w-lg mx-auto leading-relaxed">
            India&apos;s fastest return-ride cargo matching platform. Save up to 40% fuel on empty corridors.
          </p>
        </div>

        {/* Main Action + QR Card */}
        <div className="w-full max-w-3xl mt-10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Top subtle highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F06524]/60 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 2 Main Action Buttons & Info */}
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4" /> Verified &amp; Safe APK (7.3 MB)
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Choose How to Use EmptyMiles
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Install the native Android application or open the web version right in your browser.
                </p>
              </div>

              {/* ONLY 2 BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3.5">
                
                {/* 1. DOWNLOAD APK */}
                <a
                  href="/EmptyMiles.apk"
                  download="EmptyMiles.apk"
                  className="flex-1 group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#F06524] to-[#FF7E3E] hover:from-[#E05310] hover:to-[#F06524] text-white font-black text-sm sm:text-base shadow-xl shadow-[#F06524]/30 hover:shadow-[#F06524]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 shrink-0" />
                  <div className="flex flex-col items-start leading-tight">
                    <span>Download APK</span>
                    <span className="text-[11px] text-white/80 font-normal">Direct File (7.3 MB)</span>
                  </div>
                </a>

                {/* 2. VIEW ON WEB */}
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-black text-sm sm:text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-md"
                >
                  <Globe className="h-5 w-5 text-[#38BDF8] shrink-0" />
                  <div className="flex flex-col items-start leading-tight">
                    <span>View on Web</span>
                    <span className="text-[11px] text-slate-400 font-normal">Open in Browser</span>
                  </div>
                </Link>

              </div>

              {/* Verified badges */}
              <div className="pt-2 flex items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Instant OTP Login
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Android 7.0+
                </span>
              </div>

            </div>

            {/* Right Column: REAL SCANNABLE QR CODE */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-[#0B192C] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center space-y-3 w-full max-w-[240px]">
                
                {/* QR Code Container */}
                <div className="p-3 bg-white rounded-xl shadow-lg relative flex items-center justify-center">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan to download EmptyMiles APK"
                      className="w-36 h-36 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center bg-slate-100 text-slate-400 rounded-lg">
                      <QrCodeIcon className="h-10 w-10 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-[#F06524]" /> Scan with Phone
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Scan with camera to download APK directly to phone
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 3-Step Simple Installation */}
        <section className="w-full max-w-3xl mt-10 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            How to Install on Android in 3 Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4.5 space-y-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-lg bg-[#F06524]/20 border border-[#F06524]/40 text-[#F06524] font-black text-xs flex items-center justify-center">
                  1
                </span>
                <Download className="h-4 w-4 text-slate-500" />
              </div>
              <h4 className="font-bold text-xs text-white">Download APK</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Click <strong>Download APK</strong> or scan the QR code. When prompted with browser security, select <strong>&ldquo;Download anyway&rdquo;</strong>.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4.5 space-y-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-lg bg-[#F06524]/20 border border-[#F06524]/40 text-[#F06524] font-black text-xs flex items-center justify-center">
                  2
                </span>
                <Lock className="h-4 w-4 text-slate-500" />
              </div>
              <h4 className="font-bold text-xs text-white">Allow Installation</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Open the downloaded file. If prompted by Android, toggle <strong>&ldquo;Allow from this source&rdquo;</strong> in settings.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4.5 space-y-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="h-6 w-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-xs text-white">Install &amp; Log In</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tap <strong>Install</strong>, then open EmptyMiles and log in with your phone number to start matching cargo!
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070D18]/80 backdrop-blur-md py-5 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
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
