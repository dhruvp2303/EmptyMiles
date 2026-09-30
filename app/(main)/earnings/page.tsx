'use client'

import { useState, useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { cn } from '@/lib/utils'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'

export default function EarningsPage() {
  const { transactions, trips, t } = useApp()
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')

  const stats = useMemo(() => {
    return {
      total: 8450,
      completedTrips: 3,
      capacityUtilization: 68,
      emptyKmReduced: 124,
      bars: [
        { day: 'Mon', value: 4200 },
        { day: 'Tue', value: 2800 },
        { day: 'Wed', value: 8450, active: true },
        { day: 'Thu', value: 3600 },
        { day: 'Fri', value: 6200 },
        { day: 'Sat', value: 1800 },
        { day: 'Sun', value: 0 },
      ],
    }
  }, [])

  const maxBar = Math.max(...stats.bars.map((b) => b.value), 1)

  const recentTransactions = [
    {
      id: 'TX-901',
      title: 'Cargo Payment',
      date: '12 Apr, 06:32 PM',
      amount: 8400,
      type: 'credit' as const,
    },
    {
      id: 'TX-902',
      title: 'Trip Settlement',
      date: '10 Apr, 08:15 AM',
      amount: 12600,
      type: 'credit' as const,
    },
    {
      id: 'TX-903',
      title: 'Platform Fee',
      date: '10 Apr, 08:15 AM',
      amount: 250,
      type: 'debit' as const,
    },
  ]

  return (
    <div className="flex flex-col bg-background pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/95 px-5 py-3.5 backdrop-blur-md border-b border-slate-100">
        <h1 className="font-sans text-base font-bold text-slate-900">Earnings</h1>
        <button
          type="button"
          aria-label="Filter range"
          className="grid h-8 w-8 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 transition"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </header>

      <div className="px-5 pt-3 space-y-4">
        {/* Period Selector Tabs */}
        <div className="flex rounded-full bg-slate-100 p-1">
          {(
            [
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'year', label: 'This Year' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              className={cn(
                'flex-1 rounded-full py-1.5 text-xs font-bold transition',
                period === key ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Large Clean Earnings Display */}
        <div className="text-center py-2">
          <p className="font-sans text-4xl font-black text-slate-900">
            {formatINR(stats.total)}
          </p>
          <p className="text-xs font-medium text-slate-400 mt-0.5">Total Earnings</p>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-sans text-base font-extrabold text-slate-900">{stats.completedTrips}</p>
            <p className="text-[10px] font-medium text-slate-400">Trips Completed</p>
          </div>
          <div>
            <p className="font-sans text-base font-extrabold text-slate-900">{stats.capacityUtilization}%</p>
            <p className="text-[10px] font-medium text-slate-400">Capacity Utilization</p>
          </div>
          <div>
            <p className="font-sans text-base font-extrabold text-slate-900">{stats.emptyKmReduced} km</p>
            <p className="text-[10px] font-medium text-slate-400">Empty km Reduced</p>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weekly Revenue Stream</h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              +18.4% vs last week
            </span>
          </div>
          <div className="flex h-36 items-end justify-between gap-2 pt-4">
            {stats.bars.map((bar) => {
              const heightPercent = bar.value > 0 ? Math.max(12, (bar.value / maxBar) * 100) : 4
              return (
                <div key={bar.day} className="flex flex-1 flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center h-28">
                    <div
                      className={cn(
                        'w-4 rounded-t-md transition-all duration-300',
                        bar.active ? 'bg-[#F06524]' : 'bg-[#0B192C]/25 hover:bg-[#0B192C]/40'
                      )}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{bar.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="space-y-2.5 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Settled Freight Payouts</h2>
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-slate-300"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700">
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{tx.title}</p>
                    <p className="text-[10px] font-medium text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'font-sans text-xs font-black',
                    tx.type === 'credit' ? 'text-emerald-700' : 'text-rose-600'
                  )}
                >
                  {tx.type === 'credit' ? `+${formatINR(tx.amount)}` : `-${formatINR(tx.amount)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
