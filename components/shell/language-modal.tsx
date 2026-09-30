'use client'

import React, { useState } from 'react'
import { Check, Globe, Search, X } from 'lucide-react'
import { SUPPORTED_LANGUAGES, LanguageCode, LanguageMeta } from '@/lib/i18n'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export function LanguageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { language, setLanguage, t } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const filtered = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-card border border-hairline p-5 sm:p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-600 shadow-sm">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-ink">
                {t('selectLanguage') || 'Select Language / भाषा'}
              </h3>
              <p className="text-xs text-muted-ink">11 Indian Regional Languages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-xl bg-secondary hover:bg-slate-200 text-ink transition active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search filter input */}
        <div className="mt-3.5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-ink" />
          <input
            type="text"
            placeholder="Search language / भाषा खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-secondary/80 pl-9 pr-4 py-2 text-xs font-semibold text-ink placeholder:text-muted-ink outline-none focus:border-amber-600 focus:bg-card transition"
          />
        </div>

        <div className="mt-3 flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
          {filtered.map((lang: LanguageMeta) => {
            const active = language === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  onClose()
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition active:scale-[0.99]',
                  active
                    ? 'border-amber-600 bg-amber-500/10 ring-2 ring-amber-600/20'
                    : 'border-hairline bg-card hover:bg-secondary/60'
                )}
              >
                <div>
                  <p className="font-display text-sm font-bold text-ink">{lang.native}</p>
                  <p className="text-xs text-muted-ink">{lang.label}</p>
                </div>
                <div
                  className={cn(
                    'grid h-6 w-6 place-items-center rounded-full border transition',
                    active ? 'border-amber-600 bg-amber-600 text-white shadow-sm' : 'border-hairline'
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
