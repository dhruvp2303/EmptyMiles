'use client'

import React, { useRef, useState, useEffect } from 'react'
import { X, CheckCircle, Camera, MapPin, Clock, User, Phone, FileSignature, ShieldCheck } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { formatINR } from '@/lib/data'

interface PodModalProps {
  tripId: string
  settledAmount?: number
  onClose: () => void
  onSuccess: () => void
}

export function PodModal({
  tripId,
  settledAmount = 8400,
  onClose,
  onSuccess,
}: PodModalProps) {
  const { submitPod, activeTrip, t } = useApp()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [consigneeName, setConsigneeName] = useState('Anand Mehta (Dock Manager)')
  const [consigneePhone, setConsigneePhone] = useState('+91 98250 12345')
  const [notes, setNotes] = useState('All 6.0 tons textile rolls unloaded in good condition. Seal intact.')
  const [submitting, setSubmitting] = useState(false)
  const [deliveredDate, setDeliveredDate] = useState('')

  useEffect(() => {
    setDeliveredDate(new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))
  }, [])

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#0B1730'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) {
      e.stopPropagation()
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCanvasCoords(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
    setHasSignature(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    if ('touches' in e) {
      e.stopPropagation()
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCanvasCoords(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const handleSubmit = () => {
    if (!hasSignature) {
      alert(t('receiverSignature') + ': ' + (t('signPod') || 'Please sign'))
      return
    }
    setSubmitting(true)

    setTimeout(() => {
      submitPod({
        tripId,
        cargoId: activeTrip?.cargoId || 'CG-6001',
        consigneeName,
        consigneePhone,
        deliveredAt: deliveredDate,
        locationGps: '21.1702 N, 72.8311 E (Surat Textile Hub Dock 4)',
        signatureData: 'signature-vector-payload',
        photoProofUrl: '/images/cargo-container.png',
        notes,
        settledAmount,
      })
      setSubmitting(false)
      onSuccess()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-t-3xl bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand">EmptyMiles</span>
            <h2 className="font-display text-base font-bold text-ink">{t('digitalPod')}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-xl bg-secondary text-ink hover:bg-slate-200 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Geostamp Telemetry */}
          <div className="rounded-2xl bg-secondary p-3.5 space-y-1.5 text-xs text-muted-ink">
            <div className="flex items-center gap-2 text-ink font-semibold">
              <MapPin className="h-4 w-4 text-brand shrink-0" />
              <span>Surat Textile Market Dock (21.1702° N, 72.8311° E)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-ink shrink-0" />
              <span>{t('status')}: {deliveredDate || 'Just now'}</span>
            </div>
          </div>

          {/* Consignee Details */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-ink flex items-center gap-1.5 mb-1">
                <User className="h-3.5 w-3.5 text-muted-ink" /> {t('consigneeName')}
              </label>
              <input
                value={consigneeName}
                onChange={(e) => setConsigneeName(e.target.value)}
                className="w-full rounded-xl border border-hairline bg-secondary px-3.5 py-2.5 text-xs font-semibold text-ink outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink flex items-center gap-1.5 mb-1">
                <Phone className="h-3.5 w-3.5 text-muted-ink" /> {t('consigneePhone')}
              </label>
              <input
                value={consigneePhone}
                onChange={(e) => setConsigneePhone(e.target.value)}
                className="w-full rounded-xl border border-hairline bg-secondary px-3.5 py-2.5 text-xs font-semibold text-ink outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Photographic Unloading Proof */}
          <div>
            <label className="text-xs font-semibold text-ink flex items-center gap-1.5 mb-1.5">
              <Camera className="h-3.5 w-3.5 text-muted-ink" /> {t('uploadPodPhoto')}
            </label>
            <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-hairline bg-slate-900 flex items-center justify-center">
              <img
                src="/images/cargo-container.png"
                alt="Cargo unloaded at dock"
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> {t('gpsVerified')}
              </span>
            </div>
          </div>

          {/* Signature Canvas Pad */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-ink flex items-center gap-1.5">
                <FileSignature className="h-3.5 w-3.5 text-brand" /> {t('receiverSignature')}
              </label>
              {hasSignature && (
                <button onClick={clearCanvas} className="text-xs font-bold text-rose-500 hover:underline">
                  {t('clearSignature')}
                </button>
              )}
            </div>
            <div className="relative rounded-2xl border-2 border-dashed border-brand/40 bg-white p-1 overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={380}
                height={130}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[130px] touch-none cursor-crosshair"
              />
              {!hasSignature && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400 font-medium">
                  {t('signPod')}
                </div>
              )}
            </div>
          </div>

          {/* Consignment Notes */}
          <div>
            <label className="text-xs font-semibold text-ink mb-1 block">{t('deliveryNotes')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-hairline bg-secondary p-2.5 text-xs text-ink outline-none focus:border-brand"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-hairline bg-card p-4">
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full brand-gradient py-3.5 rounded-2xl font-display font-bold text-white shadow-lg flex items-center justify-center gap-2 active:scale-98 transition disabled:opacity-50"
          >
            {submitting ? (
              <span>{t('submitPod')}...</span>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" /> {t('confirmAndRelease')} ({formatINR(settledAmount)})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
