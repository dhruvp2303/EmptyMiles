'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Globe } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { LanguageModal } from '@/components/shell/language-modal'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'

export function AppHeader({
  title,
  subtitle,
  back,
  right,
  onBack,
  showLanguage = true,
}: {
  title: string
  subtitle?: string
  back?: boolean
  right?: React.ReactNode
  onBack?: () => void
  showLanguage?: boolean
}) {
  const router = useRouter()
  const { language, t } = useApp()
  const [showLangModal, setShowLangModal] = useState(false)
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language)

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline/60 bg-card/60 backdrop-blur">
        <div className="flex items-center gap-3">
          {back && (
            <button
              type="button"
              onClick={onBack ? onBack : () => router.back()}
              aria-label="Go back"
              className="grid h-9 w-9 place-items-center rounded-xl bg-secondary hover:bg-slate-200 text-ink transition active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </button>
          )}
          <div>
            <h1 className="font-display text-lg font-bold text-ink">{title}</h1>
            {subtitle && <p className="text-xs text-muted-ink">{subtitle}</p>}
          </div>
        </div>
        {right ? (
          <div>{right}</div>
        ) : showLanguage ? (
          <div>
            <button
              type="button"
              onClick={() => setShowLangModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-bold text-ink transition active:scale-95 shadow-sm"
              title={t('selectLanguage')}
            >
              <Globe className="h-3.5 w-3.5 text-amber-600" />
              <span>{currentLang?.native || 'EN'}</span>
            </button>
          </div>
        ) : null}
      </div>

      <LanguageModal isOpen={showLangModal} onClose={() => setShowLangModal(false)} />
    </>
  )
}
