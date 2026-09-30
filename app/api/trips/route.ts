import { NextResponse } from 'next/server'
import { initialTrips, Trip, TripStatus } from '@/lib/data'

let tripsStore: Trip[] = [...initialTrips]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const tripId = searchParams.get('id')

  if (tripId) {
    const found = tripsStore.find((t) => t.id === tripId)
    if (!found) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, trip: found })
  }

  let results = tripsStore
  if (status) {
    results = results.filter((t) => t.status === status)
  }

  return NextResponse.json({ success: true, trips: results })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      cargoId,
      cargoTitle,
      origin,
      destination,
      weightTon,
      cargoType,
      fare,
      driverName,
      driverPhone,
      vehicleReg,
      vehicleModel,
      shipperName,
      shipperPhone,
    } = body

    const newTrip: Trip = {
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      cargoId: cargoId || `CG-${Math.floor(1000 + Math.random() * 9000)}`,
      cargoTitle: cargoTitle || `${weightTon || 5}T Freight Load`,
      origin: origin || 'Ahmedabad',
      destination: destination || 'Surat',
      originAddress: `${origin || 'Ahmedabad'} Logistics Hub`,
      destinationAddress: `${destination || 'Surat'} Terminal Dock`,
      weightTon: parseFloat(weightTon) || 5.0,
      cargoType: cargoType || 'General Goods',
      vehicleModel: vehicleModel || 'Tata 407',
      vehicleReg: vehicleReg || 'MH 12 AB 1234',
      driverName: driverName || 'Rahul Sharma',
      driverPhone: driverPhone || '+91 98765 43210',
      shipperName: shipperName || 'Verified Shipper',
      shipperPhone: shipperPhone || '+91 98250 12345',
      fare: parseFloat(fare) || 8400,
      detourKm: 2,
      status: 'confirmed',
      currentKm: 0,
      totalKm: 280,
      etaMinutes: 180,
      currentLocationName: `${origin || 'Ahmedabad'} Dispatch Bay`,
      gpsCoordinates: { lat: 23.0225, lng: 72.5714 },
      createdAt: 'Just now',
    }

    tripsStore.unshift(newTrip)

    return NextResponse.json({
      success: true,
      message: 'Trip booking confirmed and dispatched.',
      trip: newTrip,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error booking trip' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, status, currentKm, currentLocationName, gpsCoordinates } = body

    const tripIndex = tripsStore.findIndex((t) => t.id === id)
    if (tripIndex === -1) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 })
    }

    const updated = {
      ...tripsStore[tripIndex],
      ...(status && { status }),
      ...(currentKm !== undefined && { currentKm }),
      ...(currentLocationName && { currentLocationName }),
      ...(gpsCoordinates && { gpsCoordinates }),
    }

    tripsStore[tripIndex] = updated

    return NextResponse.json({
      success: true,
      message: `Trip status updated to ${status || updated.status}`,
      trip: updated,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating trip' }, { status: 500 })
  }
}
