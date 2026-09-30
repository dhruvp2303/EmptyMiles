'use client'

import { useState } from 'react'
import {
  Truck,
  Plus,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export default function VehiclesPage() {
  const { vehicles, addVehicle, deleteVehicle, setActiveVehicle, truck, t } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State
  const [model, setModel] = useState('')
  const [registration, setRegistration] = useState('')
  const [totalCapacityTon, setTotalCapacityTon] = useState('20')
  const [bodyType, setBodyType] = useState('Closed Container')
  const [driverName, setDriverName] = useState('Rahul Sharma')
  const [driverPhone, setDriverPhone] = useState('+91 98765 43210')

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!model || !registration) return

    addVehicle({
      model,
      registration: registration.toUpperCase(),
      totalCapacityTon: parseFloat(totalCapacityTon) || 16,
      bodyType,
      driverName: driverName || 'Self',
      driverPhone: driverPhone || '+91 98765 43210',
      status: 'active',
      insuranceValidUntil: '31 Dec 2026',
      fitnessValidUntil: '30 Nov 2026',
    })

    setShowAddModal(false)
    setModel('')
    setRegistration('')
  }

  return (
    <div className="flex min-h-full flex-col bg-background pb-24">
      <AppHeader
        title={t('myVehicles') || 'Fleet & Vehicles'}
        back
        right={

          <button
            onClick={() => setShowAddModal(true)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-md active:scale-95 transition"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <div className="px-5 pt-3 space-y-4">
        {/* Top Summary */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-500">Fleet Management</p>
            <p className="font-sans text-lg font-black text-slate-900">{vehicles.length} Trucks Verified</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-accent flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold"
          >
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        </div>

        {/* Vehicles list */}
        <div className="space-y-3">
          {vehicles.map((v) => {
            const isActive = truck.registration === v.registration
            return (
              <div
                key={v.id}
                className={cn(
                  'rounded-xl border bg-white p-4 shadow-sm space-y-3 transition',
                  isActive ? 'border-[#0B192C] ring-2 ring-[#0B192C]/10' : 'border-slate-200',
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white">
                      <Truck className="h-5 w-5 text-[#F06524]" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-sans text-sm font-bold text-slate-900">{v.model}</p>
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-xs font-mono font-bold text-slate-600">{v.registration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 text-xs font-bold border',
                        v.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200',
                      )}
                    >
                      {v.status === 'active' ? 'Active' : 'In Transit'}
                    </span>
                    {vehicles.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove vehicle ${v.registration}?`)) {
                            deleteVehicle(v.id)
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete vehicle"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Specs & Driver */}
                <div className="rounded-lg bg-slate-50 p-3 text-xs space-y-1.5 text-slate-600 border border-slate-100">
                  <div className="flex items-center justify-between text-slate-900 font-bold">
                    <span>Gross Capacity: {v.totalCapacityTon} Tons</span>
                    <span>Body: {v.bodyType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assigned Driver: {v.driverName}</span>
                    <span className="font-mono text-slate-700">{v.driverPhone}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                    <span>Fitness: Valid till {v.fitnessValidUntil}</span>
                    <span className="text-emerald-700 font-bold">National Permit: Active ✓</span>
                  </div>
                </div>

                {/* Set as Active Truck Button */}
                <div className="flex justify-end pt-1">
                  {isActive ? (
                    <span className="text-xs font-bold text-[#F06524] flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Primary Active Truck
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveVehicle(v.id)}
                      className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Set as Primary Active Truck
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F06524]">Vahan &amp; Sarathi Sync</span>
                <h3 className="font-sans text-base font-bold text-slate-900">Register Commercial Truck</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Vehicle Model / Maker</label>
                <input
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Tata 407 / Ashok Leyland Ecomet"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Registration Certificate (RC Number)</label>
                <input
                  required
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                  placeholder="e.g. GJ 01 CD 5678"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 uppercase font-mono outline-none focus:border-[#0B192C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Gross Capacity (Tons)</label>
                  <input
                    required
                    type="number"
                    value={totalCapacityTon}
                    onChange={(e) => setTotalCapacityTon(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Body Type</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#0B192C]"
                  >
                    <option value="Closed Container">Closed Container</option>
                    <option value="Open Tarpaulin">Open Tarpaulin</option>
                    <option value="High Side Deck">High Side Deck</option>
                    <option value="Flatbed">Flatbed Trailer</option>
                    <option value="Reefer Container">Reefer Container</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Assigned Commercial Driver</label>
                <input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="Driver full name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-outline flex-1 py-2.5 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5 text-xs font-bold"
                >
                  Register &amp; Verify Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
