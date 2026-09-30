'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  TrendingUp,
  Truck,
  Package,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'

export default function AdminPage() {
  const { pendingBalance, walletBalance, t } = useApp()
  const [activeTab, setActiveTab] = useState<'kpis' | 'kyc' | 'disputes' | 'settlements'>('kpis')
  const [kycList, setKycList] = useState([
    {
      id: 'KYC-801',
      name: 'Ramesh Transport Corp',
      type: 'Fleet Operator (12 Trucks)',
      docs: 'GSTIN + National Permits + Fastag Active',
      time: '10m ago',
      status: 'pending',
    },
    {
      id: 'KYC-802',
      name: 'Patel Agro Trading Co.',
      type: 'Enterprise Shipper',
      docs: 'PAN + APMC License + Aadhaar',
      time: '35m ago',
      status: 'pending',
    },
    {
      id: 'KYC-803',
      name: 'Jagdish Gurjar (Commercial Driver)',
      type: 'Commercial Driver',
      docs: 'Heavy Transport DL + Background Check',
      time: '1h ago',
      status: 'pending',
    },
  ])

  const [disputesList, setDisputesList] = useState([
    {
      id: 'DSP-401',
      tripId: 'TR-8710',
      parties: 'Sun Pharma ↔ Shiv Freight',
      issue: '2 hour unloading dock delay at Vadodara warehouse',
      amount: 1400,
      status: 'Under Review',
    },
    {
      id: 'DSP-402',
      tripId: 'TR-8692',
      parties: 'Balaji Wafers ↔ Royal Logistics',
      issue: 'Detour route calculation discrepancy (+3 km)',
      amount: 450,
      status: 'Resolved',
    },
  ])

  const kpis = [
    { label: t('totalRevenue'), value: '₹1.84 Cr', change: '+18.4%' },
    { label: t('activeVehicles'), value: '1,420', change: '+8.2%' },
    { label: t('myShipments'), value: '3,890', change: '+24.1%' },
    { label: t('emptyKmReduced'), value: '184,200 km', change: '+32.0%' },
    { label: t('smartMatch'), value: '92.4%', change: '+4.5%' },
    { label: t('instantPayout'), value: '< 2 mins', change: 'Instant' },
  ]

  const handleApproveKyc = (id: string) => {
    setKycList((prev) => prev.filter((k) => k.id !== id))
    alert(`KYC approval recorded for ${id}. Profile marked verified.`)
  }

  const handleResolveDispute = (id: string) => {
    setDisputesList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d))
    )
    alert(`Dispute ${id} resolved with mutual settlement.`)
  }

  return (
    <div className="flex min-h-full flex-col bg-background pb-24">
      <AppHeader title={t('admin') || 'Operations Admin Hub'} back />

      <div className="px-5 pt-3 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
          {[
            { id: 'kpis', label: 'Operations KPI' },
            { id: 'kyc', label: `Fleet KYC (${kycList.length})` },
            { id: 'disputes', label: 'Disputes (2)' },
            { id: 'settlements', label: 'Escrow Settlement' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 rounded-md py-1.5 transition text-center ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Live KPIs */}
        {activeTab === 'kpis' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase font-bold text-slate-500">{k.label}</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {k.change}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-lg font-black text-slate-900">{k.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#0B192C] p-5 text-white shadow-sm border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live Corridor Telemetry Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">99.98% Uptime</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1,420 active heavy commercial vehicles transmitting GPS, Fastag, and payload telemetry along Western Freight Corridors (NH 48, NH 65).
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: KYC Approvals */}
        {activeTab === 'kyc' && (
          <div className="space-y-3">
            {kycList.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#F06524]">{item.id}</span>
                    <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      Pending Review
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.time}</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-600">{item.type}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono bg-slate-50 p-1.5 rounded border border-slate-100">{item.docs}</p>
                </div>
                <div className="flex gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => handleApproveKyc(item.id)}
                    className="btn-primary flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Approve Credentials
                  </button>
                  <button
                    onClick={() => setKycList((prev) => prev.filter((k) => k.id !== item.id))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Disputes */}
        {activeTab === 'disputes' && (
          <div className="space-y-3">
            {disputesList.map((dsp) => (
              <div
                key={dsp.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#F06524]">{dsp.id}</span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${
                      dsp.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {dsp.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900">{dsp.parties}</p>
                <p className="text-xs text-slate-600">{dsp.issue}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="font-sans text-sm font-black text-slate-900">{formatINR(dsp.amount)}</span>
                  {dsp.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveDispute(dsp.id)}
                      className="btn-accent px-3 py-1.5 text-xs font-bold"
                    >
                      Resolve &amp; Release
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Settlements */}
        {activeTab === 'settlements' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Trip Escrow Reserve Pool</span>
              <p className="font-sans text-2xl font-black text-slate-900">{formatINR(pendingBalance || 184500)}</p>
              <p className="text-xs text-slate-600 leading-relaxed">Held in automated ICICI escrow node awaiting geofenced GPS POD sign-off.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
