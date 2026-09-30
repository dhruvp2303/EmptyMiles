'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bell,
  Globe,
  User,
} from 'lucide-react'
import { Wordmark, LogoMark } from '@/components/brand/logo'
import { useApp } from '@/lib/app-context'
import { BottomNav } from '@/components/shell/bottom-nav'
import { LanguageModal } from '@/components/shell/language-modal'
import { CookieConsentBanner } from '@/components/shell/cookie-consent-banner'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ResponsiveShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { role, user, unreadNotifications, truck, language, t } = useApp()
  const [showLangModal, setShowLangModal] = React.useState(false)

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language)

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-start antialiased">
      {/* Mobile-first App Container */}
      <div className="w-full max-w-lg min-h-screen bg-background text-foreground flex flex-col shadow-xl relative pb-16">
        
        {/* Main Screen Content */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {children}
        </main>

        {/* Persistent Bottom Mobile Navigation */}
        <div className="fixed bottom-0 inset-x-0 max-w-lg mx-auto z-40">
          <BottomNav />
        </div>

        {/* Global Language Modal */}
        <LanguageModal isOpen={showLangModal} onClose={() => setShowLangModal(false)} />

        {/* GDPR / DPDP Compliant Cookie Consent Banner */}
        <CookieConsentBanner />
      </div>
    </div>
  )
}
