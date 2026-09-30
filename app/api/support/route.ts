import { NextResponse } from 'next/server'

interface SupportTicket {
  id: string
  userId: string
  userName: string
  tripId?: string
  category: 'dispute' | 'payment' | 'kyc' | 'cargo' | 'technical'
  subject: string
  description: string
  status: 'open' | 'investigating' | 'resolved'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  resolution?: string
}

let ticketsStore: SupportTicket[] = [
  {
    id: 'TKT-1081',
    userId: 'USR-8821',
    userName: 'Rahul Sharma',
    tripId: 'TR-8800',
    category: 'payment',
    subject: 'Escrow settlement verification timing query',
    description: 'POD uploaded at 5:40 PM, confirming instantaneous credit to wallet balance.',
    status: 'resolved',
    priority: 'medium',
    createdAt: 'Yesterday, 6:00 PM',
    resolution: 'Settlement confirmed and reconciled into driver ledger.',
  },
]

export async function GET() {
  return NextResponse.json({ success: true, tickets: ticketsStore })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, userName, tripId, category, subject, description, priority } = body

    if (!subject || !description) {
      return NextResponse.json({ error: 'Subject and description are required' }, { status: 400 })
    }

    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId || 'USR-8821',
      userName: userName || 'Rahul Sharma',
      tripId,
      category: category || 'dispute',
      subject,
      description,
      status: 'open',
      priority: priority || 'medium',
      createdAt: 'Just now',
    }

    ticketsStore.unshift(newTicket)

    return NextResponse.json({
      success: true,
      message: 'Support ticket / dispute raised successfully. Operations team will respond within 15 minutes.',
      ticket: newTicket,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating support ticket' }, { status: 500 })
  }
}
