'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle2, ShieldCheck, CheckCheck } from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/app-context'

export default function NotificationsPage() {
  const { markAllNotificationsRead } = useApp()
  const [tab, setTab] = useState<'all' | 'cargo' | 'trips' | 'system'>('all')

  const tabs = [
    { key: 'all' as const, label: 'All' },
    { key: 'cargo' as const, label: 'Cargo' },
    { key: 'trips' as const, label: 'Trips' },
    { key: 'system' as const, label: 'System' },
  ]

  const mockNotifications = [
    {
      id: 'NOT-01',
      title: 'New Cargo Load Matched',
      category: 'cargo',
      subtitle: '6.0T General Goods available in Sanand. ₹8,400 with 2 km route detour.',
      timeAgo: '10 min ago',
      icon: Package,
      iconColor: 'bg-orange-50 text-[#F06524]',
    },
    {
      id: 'NOT-02',
      title: 'Trip Dispatched on NH 48',
      category: 'trips',
      subtitle: 'Vehicle MH 12 AB 1234 en route to Bharuch Toll Plaza.',
      timeAgo: '1 hour ago',
      icon: Truck,
      iconColor: 'bg-blue-50 text-[#2563EB]',
    },
    {
      id: 'NOT-03',
      title: 'Escrow Payment Released',
      category: 'system',
      subtitle: '₹8,400 credited to wallet balance after consignee e-POD confirmation.',
      timeAgo: '2 hours ago',
      icon: CheckCircle2,
      iconColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'NOT-04',
      title: 'Vehicle Document Approved',
      category: 'system',
      subtitle: 'Tata 407 (MH 12 AB 1234) Fitness & RC verification completed.',
      timeAgo: '1 day ago',
      icon: ShieldCheck,
      iconColor: 'bg-slate-100 text-slate-800',
    },
  ]

  const filtered = mockNotifications.filter((n) => tab === 'all' || n.category === tab)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader
        title="Notifications"
        back
        right={
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="px-4 pt-3">
        <div className="flex rounded-lg bg-slate-200 p-0.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'flex-1 rounded-md py-1.5 text-xs font-bold transition',
                tab === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2.5 px-4 pt-3.5">
        {filtered.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
            >
              <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${item.iconColor}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs font-black text-slate-900">{item.title}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{item.timeAgo}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
