'use client'

import Link from 'next/link'
import { Truck, ArrowLeft, Home } from 'lucide-react'
import { Wordmark } from '@/components/brand/logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 text-center">
      <div className="max-w-md space-y-5">
        <Wordmark className="justify-center" />
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-secondary text-brand shadow-sm">
          <Truck className="h-10 w-10" />
        </div>
        <div>
          <span className="font-mono text-xs font-bold text-brand uppercase tracking-wider">Error 404</span>
          <h1 className="font-display text-2xl font-bold text-ink mt-1">Route Not Found</h1>
          <p className="text-xs text-muted-ink mt-2 leading-relaxed">
            The requested page or dispatch corridor is not available. Please return to your active workspace dashboard.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href="/home"
            className="flex-1 brand-gradient text-white py-3.5 rounded-2xl font-display text-xs font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <Home className="h-4 w-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
