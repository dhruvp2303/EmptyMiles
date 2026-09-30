'use client'

import { useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  Landmark,
  CreditCard,
  MoreHorizontal,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { cn } from '@/lib/utils'
import { formatINR } from '@/lib/data'
import { useApp } from '@/lib/app-context'

export default function WalletPage() {
  const { walletBalance, pendingBalance, addWalletMoney, withdrawWalletMoney } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [addAmount, setAddAmount] = useState('5000')
  const [withdrawAmount, setWithdrawAmount] = useState('5000')
  const [payoutTarget, setPayoutTarget] = useState('rahul.sharma@okaxis')
  const [isProcessing, setIsProcessing] = useState(false)

  const quickMethods = [
    { label: 'UPI Payout', icon: Smartphone },
    { label: 'IMPS Bank', icon: Landmark },
    { label: 'Fastag Auto', icon: CreditCard },
    { label: 'GST Invoices', icon: MoreHorizontal },
  ]

  const recentTransactions = [
    {
      id: 'TX-901',
      title: 'Cargo Payout (CG-6001 Sanand to Surat)',
      date: 'Today, 06:32 PM',
      amount: 8400,
      type: 'credit' as const,
      status: 'Settled to Bank',
    },
    {
      id: 'TX-902',
      title: 'Return Leg Trip Settlement (CG-5002)',
      date: 'Yesterday, 08:15 AM',
      amount: 12600,
      type: 'credit' as const,
      status: 'Settled to Bank',
    },
    {
      id: 'TX-903',
      title: 'Escrow Platform Security Fee',
      date: '10 Apr, 08:15 AM',
      amount: 250,
      type: 'debit' as const,
      status: 'Completed',
    },
  ]

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(addAmount)
    if (amt > 0) {
      setIsProcessing(true)
      await addWalletMoney(amt, 'Razorpay UPI / Netbanking')
      setIsProcessing(false)
      setShowAddModal(false)
    }
  }

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(withdrawAmount)
    if (amt > 0 && amt <= walletBalance) {
      setIsProcessing(true)
      await withdrawWalletMoney(amt, payoutTarget)
      setIsProcessing(false)
      setShowWithdrawModal(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader title="Wallet &amp; Settlements" back />

      <div className="px-4 pt-3 space-y-4">
        {/* 1. Deep Navy Balance Card */}
        <div className="rounded-xl border border-slate-200 bg-[#0B192C] p-5 text-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Balance</span>
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3 w-3" /> Auto-Settlement Active
            </span>
          </div>

          <div>
            <p className="font-sans text-3xl font-black text-white">
              {formatINR(walletBalance || 24850)}
            </p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-amber-400" /> Held in Escrow: <strong>{formatINR(pendingBalance || 8400)}</strong>
            </p>
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setShowWithdrawModal(true)}
              className="btn-accent flex-1 py-2.5 text-xs justify-center font-bold"
            >
              Withdraw to Bank
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn-outline flex-1 py-2.5 text-xs justify-center font-bold text-slate-900"
            >
              Add Funds
            </button>
          </div>
        </div>

        {/* 2. Quick Payment Channels */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {quickMethods.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => alert(`Opening ${label}...`)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50 transition active:scale-95"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-[#0B192C]">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-[10px] font-bold text-slate-900 leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* 3. Recent Settlements Log */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Settlement Ledger</h2>
            <span className="text-xs font-semibold text-slate-500">Fastag &amp; UPI Linked</span>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-800">
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{tx.title}</p>
                    <p className="text-[11px] text-slate-400">{tx.date} • {tx.status}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'font-mono text-xs font-black',
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

      {/* Add Money Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-4">
            <h3 className="font-sans text-base font-bold text-slate-900">Add Money to Escrow</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-outline flex-1 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary flex-1 py-2 text-xs"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Pay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl space-y-4">
            <h3 className="font-sans text-base font-bold text-slate-900">Withdraw to Bank Account / UPI</h3>
            <form onSubmit={handleWithdrawSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">UPI ID or Bank Account</label>
                <input
                  type="text"
                  value={payoutTarget}
                  onChange={(e) => setPayoutTarget(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="btn-outline flex-1 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-accent flex-1 py-2 text-xs"
                >
                  {isProcessing ? 'Transferring...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
