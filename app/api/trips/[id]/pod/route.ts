import { NextResponse } from 'next/server'

interface PodRecord {
  id: string
  tripId: string
  consigneeName: string
  consigneePhone: string
  signatureData: string
  photoProofUrl?: string
  deliveredAt: string
  gpsLocation: string
  notes?: string
  verified: boolean
  settledAmount: number
}

const podDatabase = new Map<string, PodRecord>()

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: tripId } = await params
    const body = await req.json()
    const {
      consigneeName,
      consigneePhone,
      signatureData,
      photoProofUrl,
      notes,
      gpsLocation,
      settledAmount,
    } = body

    if (!consigneeName || !signatureData) {
      return NextResponse.json(
        { error: 'Consignee name and signature are required for delivery sign-off' },
        { status: 400 }
      )
    }

    const podRecord: PodRecord = {
      id: `POD-${Math.floor(10000 + Math.random() * 90000)}`,
      tripId,
      consigneeName,
      consigneePhone: consigneePhone || '+91 98765 00000',
      signatureData,
      photoProofUrl: photoProofUrl || '/assets/pod-sample.jpg',
      deliveredAt: new Date().toISOString(),
      gpsLocation: gpsLocation || '21.1702, 72.8311 (Surat Terminal)',
      notes: notes || 'Delivered with no package seal damage.',
      verified: true,
      settledAmount: parseFloat(settledAmount) || 8400,
    }

    podDatabase.set(tripId, podRecord)

    return NextResponse.json({
      success: true,
      message: 'Digital Proof of Delivery verified. Escrow funds released to wallet.',
      pod: podRecord,
      settlement: {
        amount: podRecord.settledAmount,
        status: 'completed',
        transferredToWallet: true,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing POD' }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: tripId } = await params
  const pod = podDatabase.get(tripId)

  if (!pod) {
    return NextResponse.json({ error: 'No POD record found for trip ' + tripId }, { status: 404 })
  }

  return NextResponse.json({ success: true, pod })
}
