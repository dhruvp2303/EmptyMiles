'use client'

import Link from 'next/link'
import { ShieldCheck, Lock, Headphones, MapPin } from 'lucide-react'
import { Wordmark } from '@/components/brand/logo'
import { useApp } from '@/lib/app-context'

export function TrustFooter({ className }: { className?: string }) {
  const { t } = useApp()

  return (
    <footer className="w-full border-t border-hairline bg-slate-900 text-slate-300 py-10 px-5 md:px-10 mt-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top brand & trust badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <Wordmark onDark />
            <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
              {t('platformTagline')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{t('kycGstVerified')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand shrink-0" />
              <span>{t('escrowPayouts')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-blue-400 shrink-0" />
              <span>{t('logisticsSupport247')}</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">{t('footerPlatform')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hunt" className="hover:text-white transition">
                  {t('cargoHunt')}
                </Link>
              </li>
              <li>
                <Link href="/post-cargo" className="hover:text-white transition">
                  {t('postCargo')}
                </Link>
              </li>
              <li>
                <Link href="/find-trucks" className="hover:text-white transition">
                  {t('findSpaceTitle')}
                </Link>
              </li>
              <li>
                <Link href="/return-ride" className="hover:text-white transition">
                  {t('returnRideFinder')}
                </Link>
              </li>
              <li>
                <Link href="/trip" className="hover:text-white transition">
                  {t('footerLiveTracking')}
                </Link>
              </li>
              <li>
                <Link href="/download" className="inline-flex items-center gap-1.5 text-brand font-bold hover:text-amber-400 transition">
                  <span>📱 Download App (APK)</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">{t('footerManagement')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/vehicles" className="hover:text-white transition">
                  {t('footerVehicleManagement')}
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-white transition">
                  {t('footerWalletSettlements')}
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="hover:text-white transition">
                  {t('footerEarningsAnalytics')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  {t('footerOpsAdmin')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">{t('footerTrustLegal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition">
                  {t('refundPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-white transition">
                  {t('cancellationPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">{t('footerCompany')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {t('footerContact')}
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition">
                  {t('footerFaqs')}
                </Link>
              </li>
              <li className="text-slate-400 pt-1">
                {t('footerHelpline')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} EmptyMiles Logistics Technologies Pvt. Ltd. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <span>Server: IN-MUM-1</span>
            <span>Security: TLS 1.3</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
