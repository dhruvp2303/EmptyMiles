'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  User,
  ShieldCheck,
  Truck,
  Package,
  Globe,
  Wallet,
  FileText,
  CreditCard,
  Headphones,
  Info,
  LogOut,
  ChevronRight,
  Star,
  CheckCircle2,
  Building,
  ArrowLeftRight,
  TrendingUp,
  Layers,
  Sparkles,
  Mail,
  Lock,
  MapPin,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { LanguageModal } from '@/components/shell/language-modal'
import { MapsApiKeyModal } from '@/components/maps/maps-api-key-modal'
import { useApp, UserRole } from '@/lib/app-context'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'
import { formatINR } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const {
    role,
    setRole,
    language,
    walletBalance,
    vehicles,
    user,
    verifyEmail,
    logout,
  } = useApp()

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showLangModal, setShowLangModal] = useState(false)
  const [showKycModal, setShowKycModal] = useState(false)
  const [showBankModal, setShowBankModal] = useState(false)
  const [showMapsModal, setShowMapsModal] = useState(false)
  const [showSavedPlacesModal, setShowSavedPlacesModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [upiId, setUpiId] = useState('rahul.sharma@okaxis')
  const [bankAccount, setBankAccount] = useState('HDFC Bank •••• 4921')

  const roleOptions: { id: UserRole; title: string; subtitle: string; icon: any }[] = [
    {
      id: 'truck_owner',
      title: 'Truck Owner / Transporter',
      subtitle: 'Find matching cargo to fill empty payload and return legs',
      icon: Truck,
    },
    {
      id: 'shipper',
      title: 'Cargo Shipper / Business',
      subtitle: 'Post full and part load freight requests on highways',
      icon: Package,
    },
    {
      id: 'fleet',
      title: 'Fleet Manager',
      subtitle: 'Manage multiple commercial vehicles, drivers, and trips',
      icon: Layers,
    },
    {
      id: 'admin',
      title: 'Operations Admin',
      subtitle: 'Corridor analytics, KYC verification, and escrow audits',
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader title="Account &amp; Settings" />

      <div className="px-4 space-y-4 pt-3">
        {/* 1. Practical Transporter / User Profile Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0B192C] text-white font-sans text-lg font-black shadow-sm">
                {user.firstName[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-sans text-sm font-black text-slate-900">{user.name}</h2>
                  <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-2.5 w-2.5" /> KYC Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{user.phone}</p>
                <p className="text-[11px] text-slate-400 font-medium">{user.businessName || 'Sharma Freight Express'}</p>
              </div>
            </div>
          </div>

          {/* Mode Switcher Banner */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Role</span>
              <p className="font-bold text-slate-900 capitalize">
                {role === 'truck_owner' ? 'Truck Owner / Driver' : role === 'shipper' ? 'Shipper' : role === 'fleet' ? 'Fleet Manager' : 'Admin'}
              </p>
            </div>
            <button
              onClick={() => setShowRoleModal(true)}
              className="btn-outline py-1 px-3 text-xs"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" /> Switch Role
            </button>
          </div>
        </div>

        {/* 2. Operations & Fleet Shortcuts */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm divide-y divide-slate-100">
          <Link
            href="/vehicles"
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[#0B192C]">
                <Truck className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold text-slate-900">My Vehicles</p>
                <p className="text-[11px] text-slate-400">{vehicles.length} Registered &amp; Insured</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>

          <button
            onClick={() => setShowKycModal(true)}
            className="flex w-full items-center justify-between p-3.5 hover:bg-slate-50 transition text-xs text-left"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-emerald-700">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold text-slate-900">KYC &amp; Documents</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Aadhaar, Commercial Driving License, GSTIN Verified</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowBankModal(true)}
            className="flex w-full items-center justify-between p-3.5 hover:bg-slate-50 transition text-xs text-left"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                <CreditCard className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold text-slate-900">Bank &amp; UPI Settlement</p>
                <p className="text-[11px] text-slate-400">{upiId}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowLangModal(true)}
            className="flex w-full items-center justify-between p-3.5 hover:bg-slate-50 transition text-xs text-left"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                <Globe className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold text-slate-900">App Language / भाषा</p>
                <p className="text-[11px] text-slate-400">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.native} ({SUPPORTED_LANGUAGES.find((l) => l.code === language)?.label})
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowMapsModal(true)}
            className="flex w-full items-center justify-between p-3.5 hover:bg-slate-50 transition text-xs text-left"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[#F06524]">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold text-slate-900">Google Maps Platform Suite</p>
                <p className="text-[11px] text-[#F06524] font-semibold">Live GPS, Places &amp; Geocoding Diagnostics</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => setShowSavedPlacesModal(true)}
            className="flex w-full items-center justify-between p-3.5 hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                <MapPin className="h-4 w-4 text-emerald-600" />
              </span>
              <div>
                <p className="font-bold text-slate-900">Saved Corridors &amp; Frequent Docks</p>
                <p className="text-[11px] text-slate-500">Ahmedabad ↔ Surat • Sanand Hub • Bhiwandi</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* 3. Support & Policies */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm divide-y divide-slate-100 text-xs">
          <Link
            href="/help"
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                <Headphones className="h-4 w-4" />
              </span>
              <span className="font-bold text-slate-900">24x7 Transporter Support &amp; Disputes</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>

          <Link
            href="/privacy-policy"
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="font-bold text-slate-900">Privacy, Geolocation &amp; Escrow Policy</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to log out of EmptyMiles?')) {
                logout()
              }
            }}
            className="flex w-full items-center gap-3 p-3.5 text-left text-slate-700 hover:bg-slate-50 transition font-bold"
          >
            <LogOut className="h-4 w-4 text-slate-500" />
            <span>Log Out</span>
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex w-full items-center gap-3 p-3.5 text-left text-rose-600 hover:bg-rose-50 transition font-bold"
          >
            <Lock className="h-4 w-4" />
            <span>Delete / Deactivate Transporter Account</span>
          </button>
        </div>
      </div>

      {/* Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0">
          <div className="w-full max-w-lg rounded-t-2xl bg-white p-5 space-y-4 shadow-2xl">
            <h3 className="font-sans text-base font-bold text-slate-900">Switch Workspace Role</h3>
            <div className="space-y-2">
              {roleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setRole(opt.id)
                    setShowRoleModal(false)
                  }}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition',
                    role === opt.id ? 'border-[#0B192C] bg-slate-50' : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <opt.icon className="h-5 w-5 text-[#0B192C] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-slate-900">{opt.title}</p>
                    <p className="text-[11px] text-slate-500">{opt.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowRoleModal(false)}
              className="btn-outline w-full py-2.5 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* KYC Modal */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900">KYC Verification Details</h3>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 space-y-1">
              <p className="font-bold">✓ Government GST &amp; Aadhaar Verified</p>
              <p>GSTIN: 24AAAAA0000A1Z5</p>
              <p>Driving License: DL-0420180012345</p>
            </div>
            <button
              onClick={() => setShowKycModal(false)}
              className="btn-primary w-full py-2.5 text-xs justify-center"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Bank Settlement Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-900">Bank &amp; UPI Settlement Settings</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Primary UPI ID (VPA)</label>
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bank Account &amp; IFSC</label>
              <input
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 font-bold"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowBankModal(false)} className="btn-outline flex-1 py-2 text-xs">
                Cancel
              </button>
              <button onClick={() => setShowBankModal(false)} className="btn-primary flex-1 py-2 text-xs">
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Corridors & Frequent Docks Modal */}
      {showSavedPlacesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-sans text-base font-bold text-slate-900">Saved Corridors &amp; Hubs</h3>
              <button onClick={() => setShowSavedPlacesModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Primary Highway Route</p>
                <p className="text-slate-600">Ahmedabad (Sanand GIDC) ↔ Surat (Textile Market)</p>
                <p className="text-[10px] text-emerald-700 font-semibold mt-1">✓ Active Cargo Hunt corridor</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Frequent Loading Bay</p>
                <p className="text-slate-600">Vadodara Makarpura GIDC, Gate 3</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Warehouse Hub</p>
                <p className="text-slate-600">Bhiwandi Logistics Park, Maharashtra</p>
              </div>
            </div>
            <button
              onClick={() => {
                alert('New frequent dock corridor saved to your transporter preferences!')
                setShowSavedPlacesModal(false)
              }}
              className="btn-accent w-full py-2.5 text-xs justify-center font-bold"
            >
              + Save Current Route as Quick Corridor
            </button>
          </div>
        </div>
      )}

      {/* Account Deletion / Deactivation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Lock className="h-5 w-5" />
              <h3 className="font-sans text-base font-bold text-slate-900">Deactivate / Delete Account</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before deleting your EmptyMiles account, please confirm that you have zero pending freight deliveries and all wallet balances ({formatINR(walletBalance)}) have been withdrawn to your bank account.
            </p>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-800">
              <p className="font-bold">Compliance &amp; GST Notice:</p>
              <p>Completed trip invoices and GST tax records will remain archived for regulatory statutory audit compliance.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowDeleteModal(false)} className="btn-outline flex-1 py-2 text-xs">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Account deactivation request submitted. Our team will verify settlement balance and complete deactivation within 24 hours.')
                  setShowDeleteModal(false)
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex-1 py-2 text-xs transition"
              >
                Confirm Deactivation
              </button>
            </div>
          </div>
        </div>
      )}

      <LanguageModal isOpen={showLangModal} onClose={() => setShowLangModal(false)} />
      <MapsApiKeyModal isOpen={showMapsModal} onClose={() => setShowMapsModal(false)} />
    </div>
  )
}
