import { NextResponse } from 'next/server'
import { initialTransactions, TransactionRecord } from '@/lib/data'

let walletLedger: TransactionRecord[] = [...initialTransactions]
let currentBalance = 24800
let currentPendingBalance = 8400

export async function GET() {
  return NextResponse.json({
    success: true,
    wallet: {
      availableBalance: currentBalance,
      pendingBalance: currentPendingBalance,
      totalEarned: 84600,
      currency: 'INR',
    },
    transactions: walletLedger,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, amount, upiId, bankAccount, ifsc, referenceId, method } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 })
    }

    const numAmount = parseFloat(amount)

    // 1. Topup / Add Money
    if (action === 'add_money') {
      currentBalance += numAmount
      const newTx: TransactionRecord = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        referenceId: referenceId || `TOPUP-${Date.now()}`,
        title: 'Wallet Top-up',
        subtitle: `Added via ${method || 'UPI / NetBanking'}`,
        amount: numAmount,
        kind: 'credit',
        type: 'wallet_topup',
        timestamp: 'Just now',
        status: 'completed',
        paymentMethod: method || 'UPI Direct',
      }
      walletLedger.unshift(newTx)

      return NextResponse.json({
        success: true,
        message: `INR ${numAmount.toLocaleString('en-IN')} added to wallet successfully.`,
        availableBalance: currentBalance,
        transaction: newTx,
      })
    }

    // 2. Instant Withdrawal
    if (action === 'withdraw') {
      if (numAmount > currentBalance) {
        return NextResponse.json(
          { error: `Insufficient balance. Available: INR ${currentBalance.toLocaleString('en-IN')}` },
          { status: 400 }
        )
      }

      currentBalance -= numAmount
      const destination = upiId || (bankAccount ? `A/C: •••• ${bankAccount.slice(-4)} (${ifsc})` : 'Linked UPI Handle')
      const newTx: TransactionRecord = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        referenceId: `WD-${Math.floor(100 + Math.random() * 900)}`,
        title: 'Instant Bank/UPI Payout',
        subtitle: `Dispatched to ${destination}`,
        amount: numAmount,
        kind: 'debit',
        type: 'withdrawal',
        timestamp: 'Just now',
        status: 'completed',
        paymentMethod: 'IMPS Instant Payout',
      }
      walletLedger.unshift(newTx)

      return NextResponse.json({
        success: true,
        message: `INR ${numAmount.toLocaleString('en-IN')} transferred instantly via IMPS to ${destination}.`,
        availableBalance: currentBalance,
        transaction: newTx,
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Wallet transaction error' }, { status: 500 })
  }
}
