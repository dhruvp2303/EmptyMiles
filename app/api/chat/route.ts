import { NextResponse } from 'next/server'

interface ChatMessage {
  id: string
  tripId: string
  senderId: string
  senderName: string
  senderRole: 'driver' | 'shipper' | 'support'
  message: string
  timestamp: string
  read: boolean
}

let messagesStore: ChatMessage[] = [
  {
    id: 'MSG-001',
    tripId: 'TR-9001',
    senderId: 'USR-8821',
    senderName: 'Rahul Sharma (Driver)',
    senderRole: 'driver',
    message: 'Namaste sir, reached Sanand Gate 2 dock for loading.',
    timestamp: '1:15 PM',
    read: true,
  },
  {
    id: 'MSG-002',
    tripId: 'TR-9001',
    senderId: 'USR-7700',
    senderName: 'Anand Textiles (Shipper)',
    senderRole: 'shipper',
    message: 'Forklift operator is ready at Bay 4. 6T rolls are palletized.',
    timestamp: '1:18 PM',
    read: true,
  },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tripId = searchParams.get('tripId')

  let results = messagesStore
  if (tripId) {
    results = results.filter((m) => m.tripId === tripId)
  }

  return NextResponse.json({ success: true, messages: results })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { tripId, senderId, senderName, senderRole, message } = body

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    const newMessage: ChatMessage = {
      id: `MSG-${Date.now()}`,
      tripId: tripId || 'TR-9001',
      senderId: senderId || 'USR-8821',
      senderName: senderName || 'Rahul Sharma',
      senderRole: senderRole || 'driver',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }

    messagesStore.push(newMessage)

    return NextResponse.json({
      success: true,
      message: 'Message delivered',
      chatMessage: newMessage,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error sending chat message' }, { status: 500 })
  }
}
