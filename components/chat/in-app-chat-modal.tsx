'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Send,
  Phone,
  ShieldCheck,
  CheckCheck,
  MessageSquare,
  Truck,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/app-context'

interface ChatMessage {
  id: string
  tripId: string
  senderRole: 'driver' | 'shipper' | 'support'
  senderName: string
  message: string
  timestamp: string
}

interface InAppChatModalProps {
  tripId?: string
  partnerName?: string
  partnerRole?: string
  partnerPhone?: string
  onClose: () => void
}

export function InAppChatModal({
  tripId = 'TR-9001',
  partnerName = 'Anand Textiles (Shipper)',
  partnerRole = 'Verified Shipper',
  partnerPhone = '+91 98250 12345',
  onClose,
}: InAppChatModalProps) {
  const { user } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-1',
      tripId,
      senderRole: 'driver',
      senderName: user.name || 'Rahul Sharma',
      message: 'Namaste! Reached Sanand Gate 2 dock for loading the 6T cargo.',
      timestamp: '1:15 PM',
    },
    {
      id: 'MSG-2',
      tripId,
      senderRole: 'shipper',
      senderName: partnerName,
      message: 'Welcome! Forklift operator is at Bay 4. Loading should take 15 mins.',
      timestamp: '1:18 PM',
    },
    {
      id: 'MSG-3',
      tripId,
      senderRole: 'driver',
      senderName: user.name || 'Rahul Sharma',
      message: 'Loaded securely. Tarpaulin tied. Heading on NH 48 towards Surat.',
      timestamp: '1:40 PM',
    },
  ])
  const [text, setText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!text.trim()) return

    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      tripId,
      senderRole: 'driver',
      senderName: user.name || 'Rahul Sharma',
      message: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMsg])
    setText('')

    // Simulate auto-reply from shipper/support in demo mode
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `MSG-${Date.now() + 1}`,
        tripId,
        senderRole: 'shipper',
        senderName: partnerName,
        message: 'Understood. We are tracking your live GPS location on NH 48.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, reply])
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex h-[88vh] sm:h-[620px] w-full max-w-lg flex-col rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#0B192C] px-4 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-white font-bold text-sm">
                {partnerName.slice(0, 2).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0B192C]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">{partnerName}</h3>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-300">
                Trip: <span className="font-mono text-[#F06524]">{tripId}</span> • {partnerRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${partnerPhone}`}
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              title="Call"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
            </a>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
          <div className="text-center">
            <span className="rounded-full bg-slate-200/80 px-3 py-1 text-[10px] font-semibold text-slate-600">
              End-to-End Logistics Trip Communication
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderRole === 'driver'
            return (
              <div
                key={msg.id}
                className={cn('flex flex-col max-w-[80%]', isMe ? 'ml-auto items-end' : 'mr-auto items-start')}
              >
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2.5 text-xs shadow-sm',
                    isMe
                      ? 'rounded-tr-xs bg-[#0B192C] text-white'
                      : 'rounded-tl-xs bg-white text-slate-900 border border-slate-200'
                  )}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="h-3 w-3 text-[#F06524]" />}
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses Bar */}
        <div className="flex gap-1.5 overflow-x-auto border-t border-slate-100 bg-white px-3 py-2 no-scrollbar">
          {[
            'Reached loading dock',
            'On NH 48 highway',
            'Estimated 30 mins arrival',
            'Ready for delivery sign-off',
          ].map((quick) => (
            <button
              key={quick}
              onClick={() => setText(quick)}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              {quick}
            </button>
          ))}
        </div>

        {/* Text Input Footer */}
        <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message to shipper..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#F06524] focus:bg-white"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#F06524] text-white disabled:opacity-40 active:scale-95 transition shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
