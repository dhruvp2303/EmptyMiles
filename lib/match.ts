// Cargo Hunt matching engine for EmptyMiles.
// Two layers: hard constraints first, then transparent explainable weighted scoring.

export type Truck = {
  id: string
  model: string
  registration: string
  totalCapacityTon: number
  loadedTon: number
  availableTon: number
  origin: string
  destination: string
  bodyType: string
}

export type Cargo = {
  id: string
  shipperName: string
  shipperPhone: string
  weightTon: number
  cargoType: string
  origin: string
  destination: string
  price: number
  detourKm: number
  detourMinutes: number
  pickupWindow: string
  deliveryWindow: string
  shipperVerified: boolean
  requiredBodyType?: string
  // Scoring parameters (0 to 1)
  routeOverlap: number
  pickupOverlap: number
  deliveryOverlap: number
  vehicleFit: number
  priceFairness: number
  status: 'published' | 'booked' | 'in_transit' | 'delivered'
  createdAt: string
  notes?: string
}

export const MATCH_WEIGHTS = {
  route: 0.3,
  capacity: 0.2,
  pickup: 0.15,
  delivery: 0.1,
  vehicle: 0.1,
  price: 0.1,
  detour: 0.05,
} as const

export type FactorKey = keyof typeof MATCH_WEIGHTS

export const FACTOR_LABELS: Record<FactorKey, string> = {
  route: 'Route alignment',
  capacity: 'Available capacity fit',
  pickup: 'Pickup timing window',
  delivery: 'Delivery deadline fit',
  vehicle: 'Vehicle body suitability',
  price: 'Rate fairness',
  detour: 'Detour impact',
}

export type MatchFactor = {
  key: FactorKey
  label: string
  weight: number
  score: number // 0 to 1
  detail: string
}

export type MatchResult = {
  score: number // 0 to 100
  band: 'high' | 'mid' | 'low'
  factors: MatchFactor[]
  reasons: string[]
}

const MAX_DETOUR_KM = 25

function clamp(n: number) {
  return Math.max(0, Math.min(1, n))
}

// Hard constraints: Impossible or violating matches are rejected upfront
export function passesHardConstraints(truck: Truck, cargo: Cargo): boolean {
  if (cargo.status !== 'published') return false
  if (cargo.weightTon > truck.availableTon) return false
  if (cargo.detourKm > MAX_DETOUR_KM) return false
  return true
}

export function scoreMatch(truck: Truck, cargo: Cargo): MatchResult {
  const capacityFit = clamp(0.6 + (cargo.weightTon / (truck.availableTon || 1)) * 0.4)
  const detourScore = clamp(1 - cargo.detourKm / MAX_DETOUR_KM)

  const factors: MatchFactor[] = [
    {
      key: 'route',
      label: FACTOR_LABELS.route,
      weight: MATCH_WEIGHTS.route,
      score: cargo.routeOverlap,
      detail: `${cargo.origin} to ${cargo.destination} aligns with your active corridor`,
    },
    {
      key: 'capacity',
      label: FACTOR_LABELS.capacity,
      weight: MATCH_WEIGHTS.capacity,
      score: capacityFit,
      detail: `${cargo.weightTon}T cargo fits your ${truck.availableTon}T unused space`,
    },
    {
      key: 'pickup',
      label: FACTOR_LABELS.pickup,
      weight: MATCH_WEIGHTS.pickup,
      score: cargo.pickupOverlap,
      detail: cargo.pickupWindow,
    },
    {
      key: 'delivery',
      label: FACTOR_LABELS.delivery,
      weight: MATCH_WEIGHTS.delivery,
      score: cargo.deliveryOverlap,
      detail: cargo.deliveryWindow,
    },
    {
      key: 'vehicle',
      label: FACTOR_LABELS.vehicle,
      weight: MATCH_WEIGHTS.vehicle,
      score: cargo.vehicleFit,
      detail: `${cargo.cargoType} compatible with ${truck.bodyType || 'container body'}`,
    },
    {
      key: 'price',
      label: FACTOR_LABELS.price,
      weight: MATCH_WEIGHTS.price,
      score: cargo.priceFairness,
      detail: `INR ${cargo.price.toLocaleString('en-IN')} freight value`,
    },
    {
      key: 'detour',
      label: FACTOR_LABELS.detour,
      weight: MATCH_WEIGHTS.detour,
      score: detourScore,
      detail: `+${cargo.detourKm} km (${cargo.detourMinutes || Math.round(cargo.detourKm * 3.5)} mins) added to route`,
    },
  ]

  const total = factors.reduce((sum, f) => sum + f.weight * f.score, 0)
  const score = Math.round(total * 100)
  const band: MatchResult['band'] = score >= 90 ? 'high' : score >= 75 ? 'mid' : 'low'

  const reasons: string[] = []
  if (cargo.weightTon <= truck.availableTon) {
    reasons.push(`Fits within your ${truck.availableTon}T available space`)
  }
  if (cargo.detourKm <= 3) {
    reasons.push(`Minimal detour (+${cargo.detourKm} km on NH corridor)`)
  }
  if (cargo.shipperVerified) {
    reasons.push('Verified shipper with Escrow payment protection')
  }
  if (cargo.routeOverlap >= 0.85) {
    reasons.push('Direct highway transit on your primary route')
  }

  return { score, band, factors, reasons }
}

export function rankCargo(truck: Truck, cargos: Cargo[]) {
  return cargos
    .filter((c) => passesHardConstraints(truck, c))
    .map((cargo) => ({ cargo, match: scoreMatch(truck, cargo) }))
    .sort((a, b) => b.match.score - a.match.score)
}
