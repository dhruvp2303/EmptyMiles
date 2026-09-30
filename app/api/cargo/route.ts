import { NextResponse } from 'next/server'
import { initialCargos } from '@/lib/data'
import { Cargo, Truck, scoreMatch, passesHardConstraints, rankCargo } from '@/lib/match'

// In-memory / dynamic store
let cargosStore: Cargo[] = [...initialCargos]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const maxWeight = searchParams.get('maxWeight')
  const bodyType = searchParams.get('bodyType')
  const huntTruckId = searchParams.get('huntTruckId')
  const availableTon = searchParams.get('availableTon')
  const totalTon = searchParams.get('totalTon')

  let results = [...cargosStore]

  // If Cargo Hunt parameters are supplied, run Cargo Hunt matching engine
  if (availableTon && origin && destination) {
    const truckParams: Truck = {
      id: huntTruckId || 'TRK-TMP',
      model: 'Tata 407',
      registration: 'MH 12 AB 1234',
      totalCapacityTon: totalTon ? parseFloat(totalTon) : 20,
      loadedTon: (totalTon ? parseFloat(totalTon) : 20) - parseFloat(availableTon),
      availableTon: parseFloat(availableTon),
      origin,
      destination,
      bodyType: bodyType || 'Closed Container',
    }

    const ranked = rankCargo(truckParams, results)
    return NextResponse.json({
      success: true,
      count: ranked.length,
      truck: truckParams,
      matches: ranked,
    })
  }

  // General Filter & Search
  if (origin) {
    results = results.filter((c) => c.origin.toLowerCase().includes(origin.toLowerCase()))
  }
  if (destination) {
    results = results.filter((c) => c.destination.toLowerCase().includes(destination.toLowerCase()))
  }
  if (maxWeight) {
    results = results.filter((c) => c.weightTon <= parseFloat(maxWeight))
  }
  if (bodyType && bodyType !== 'All') {
    results = results.filter((c) => !c.requiredBodyType || c.requiredBodyType === bodyType)
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    cargos: results,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      shipperName,
      shipperPhone,
      weightTon,
      cargoType,
      origin,
      destination,
      price,
      pickupWindow,
      deliveryWindow,
      requiredBodyType,
      notes,
    } = body

    if (!origin || !destination || !weightTon || !price) {
      return NextResponse.json(
        { error: 'Origin, destination, weight and price are required fields' },
        { status: 400 }
      )
    }

    const newCargo: Cargo = {
      id: `CG-${Math.floor(1000 + Math.random() * 9000)}`,
      shipperName: shipperName || 'Verified Shipper',
      shipperPhone: shipperPhone || '+91 98765 00000',
      weightTon: parseFloat(weightTon),
      cargoType: cargoType || 'General Goods',
      origin,
      destination,
      price: parseFloat(price),
      detourKm: Math.floor(1 + Math.random() * 6),
      detourMinutes: Math.floor(5 + Math.random() * 20),
      pickupWindow: pickupWindow || 'Today, 2:00 PM to 6:00 PM',
      deliveryWindow: deliveryWindow || 'Tomorrow, 8:00 AM to 2:00 PM',
      shipperVerified: true,
      requiredBodyType: requiredBodyType || 'Closed Container',
      routeOverlap: 0.95,
      pickupOverlap: 0.9,
      deliveryOverlap: 0.92,
      vehicleFit: 1.0,
      priceFairness: 0.94,
      status: 'published',
      createdAt: 'Just now',
      notes,
    }

    cargosStore.unshift(newCargo)

    return NextResponse.json({
      success: true,
      message: 'Cargo load published to EmptyMiles network successfully.',
      cargo: newCargo,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error publishing cargo' }, { status: 500 })
  }
}
