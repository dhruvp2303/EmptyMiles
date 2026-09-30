import type { Cargo, Truck } from './match'

export interface UserProfile {
  id: string
  name: string
  firstName: string
  phone: string
  email: string
  emailVerified: boolean
  businessName?: string
  gstNumber?: string
  kycStatus: 'verified' | 'pending' | 'unverified'
  role: 'truck_owner' | 'shipper' | 'fleet' | 'admin'
  memberSince: string
  operatingRegion: string
  preferredLanguage: string
  activeVehicleId?: string
}

export const initialUser: UserProfile = {
  id: 'USR-8821',
  name: 'Rahul Sharma',
  firstName: 'Rahul',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@emptymiles.in',
  emailVerified: true,
  businessName: 'Sharma Freight Express',
  gstNumber: '24AAAAA0000A1Z5',
  kycStatus: 'verified',
  role: 'truck_owner',
  memberSince: 'Oct 2024',
  operatingRegion: 'Gujarat - Maharashtra Corridor',
  preferredLanguage: 'en',
  activeVehicleId: 'V-101',
}

export const initialTruck: Truck = {
  id: 'V-101',
  model: 'Tata 407',
  registration: 'MH 12 AB 1234',
  totalCapacityTon: 20,
  loadedTon: 12,
  availableTon: 8,
  origin: 'Ahmedabad',
  destination: 'Surat',
  bodyType: 'Closed Container',
}

export const initialCargos: Cargo[] = [
  {
    id: 'CG-6001',
    shipperName: 'Anand Textiles Limited',
    shipperPhone: '+91 98250 12345',
    weightTon: 6.0,
    cargoType: 'General Goods',
    origin: 'Ahmedabad (Sanand GIDC)',
    destination: 'Surat (Textile Market)',
    price: 8400,
    detourKm: 2,
    detourMinutes: 8,
    pickupWindow: 'Today, 2:00 PM to 6:00 PM',
    deliveryWindow: 'Tomorrow, 8:00 AM to 2:00 PM',
    shipperVerified: true,
    requiredBodyType: 'Closed Container',
    routeOverlap: 1.0,
    pickupOverlap: 0.98,
    deliveryOverlap: 0.95,
    vehicleFit: 1.0,
    priceFairness: 0.96,
    status: 'published',
    createdAt: '1 hour ago',
    notes: 'Textile rolls packed in moisture-resistant film. Forklift loading available at dock.',
  },
  {
    id: 'CG-5002',
    shipperName: 'Gujarat FMCG Distribution Ltd',
    shipperPhone: '+91 98251 67890',
    weightTon: 5.0,
    cargoType: 'FMCG',
    origin: 'Vadodara (Makarpura GIDC)',
    destination: 'Surat (Ring Road Hub)',
    price: 7200,
    detourKm: 4,
    detourMinutes: 14,
    pickupWindow: 'Today, 4:00 PM to 8:00 PM',
    deliveryWindow: 'Tomorrow, 10:00 AM to 4:00 PM',
    shipperVerified: true,
    requiredBodyType: 'Closed Container',
    routeOverlap: 0.9,
    pickupOverlap: 0.85,
    deliveryOverlap: 0.88,
    vehicleFit: 0.95,
    priceFairness: 0.9,
    status: 'published',
    createdAt: '2 hours ago',
    notes: 'Packaged consumer goods on standard wooden pallets.',
  },
  {
    id: 'CG-8003',
    shipperName: 'Western Buildcon Infrastructure',
    shipperPhone: '+91 98252 24680',
    weightTon: 7.5,
    cargoType: 'Construction Materials',
    origin: 'Nadiad Industrial Area',
    destination: 'Surat (Hazira Port Road)',
    price: 9800,
    detourKm: 5,
    detourMinutes: 18,
    pickupWindow: 'Tomorrow, 6:00 AM to 10:00 AM',
    deliveryWindow: 'Tomorrow, 6:00 PM to 10:00 PM',
    shipperVerified: true,
    requiredBodyType: 'High Side Deck',
    routeOverlap: 0.82,
    pickupOverlap: 0.78,
    deliveryOverlap: 0.8,
    vehicleFit: 0.88,
    priceFairness: 0.92,
    status: 'published',
    createdAt: '3 hours ago',
    notes: 'Hardware fittings in wooden crates. Waterproof cover required.',
  },
  {
    id: 'CG-7006',
    shipperName: 'Bharat Auto Component Export',
    shipperPhone: '+91 98110 54321',
    weightTon: 7.0,
    cargoType: 'Automobile Parts',
    origin: 'Delhi NCR (Kundli Logistics)',
    destination: 'Mumbai (Bhiwandi Park)',
    price: 28500,
    detourKm: 3,
    detourMinutes: 12,
    pickupWindow: 'Today, 3:00 PM to 8:00 PM',
    deliveryWindow: 'In 2 days, 10:00 AM',
    shipperVerified: true,
    requiredBodyType: 'Closed Container',
    routeOverlap: 0.96,
    pickupOverlap: 0.92,
    deliveryOverlap: 0.94,
    vehicleFit: 1.0,
    priceFairness: 0.95,
    status: 'published',
    createdAt: '30 mins ago',
    notes: 'Precision engine parts in heavy-duty corrugated crates.',
  },
  {
    id: 'CG-5007',
    shipperName: 'SouthTech Electronics Hub',
    shipperPhone: '+91 98440 98765',
    weightTon: 5.5,
    cargoType: 'E-commerce Parcels',
    origin: 'Bengaluru (Peenya Industrial)',
    destination: 'Chennai (Sriperumbudur Hub)',
    price: 14200,
    detourKm: 2,
    detourMinutes: 10,
    pickupWindow: 'Tomorrow, 8:00 AM to 12:00 PM',
    deliveryWindow: 'Tomorrow, 6:00 PM',
    shipperVerified: true,
    requiredBodyType: 'Closed Container',
    routeOverlap: 0.98,
    pickupOverlap: 0.94,
    deliveryOverlap: 0.96,
    vehicleFit: 1.0,
    priceFairness: 0.92,
    status: 'published',
    createdAt: '45 mins ago',
    notes: 'Telecommunication equipment. Climate control container preferred.',
  },
  {
    id: 'CG-8008',
    shipperName: 'Eastern Steel & Hardware Corp',
    shipperPhone: '+91 98300 11223',
    weightTon: 8.0,
    cargoType: 'Industrial Goods',
    origin: 'Kolkata (Dankuni Logistics)',
    destination: 'Patna (Fatuha Inland Depot)',
    price: 21000,
    detourKm: 4,
    detourMinutes: 15,
    pickupWindow: 'Today, 6:00 PM to 10:00 PM',
    deliveryWindow: 'Tomorrow, 2:00 PM',
    shipperVerified: true,
    requiredBodyType: 'High Side Deck',
    routeOverlap: 0.91,
    pickupOverlap: 0.88,
    deliveryOverlap: 0.9,
    vehicleFit: 0.95,
    priceFairness: 0.93,
    status: 'published',
    createdAt: '1 hour ago',
    notes: 'Fasteners and steel rods with heavy strapping.',
  },
  {
    id: 'CG-4009',
    shipperName: 'Punjab Hosiery Exporters',
    shipperPhone: '+91 98160 33445',
    weightTon: 4.5,
    cargoType: 'Textiles & Garments',
    origin: 'Ludhiana (Focal Point)',
    destination: 'Delhi (Transport Nagar)',
    price: 11800,
    detourKm: 2,
    detourMinutes: 9,
    pickupWindow: 'Tomorrow, 9:00 AM to 1:00 PM',
    deliveryWindow: 'Tomorrow, 8:00 PM',
    shipperVerified: true,
    requiredBodyType: 'Closed Container',
    routeOverlap: 0.97,
    pickupOverlap: 0.95,
    deliveryOverlap: 0.96,
    vehicleFit: 1.0,
    priceFairness: 0.94,
    status: 'published',
    createdAt: '2 hours ago',
    notes: 'Garment cartons export quality sealed with barcode labels.',
  },
  {
    id: 'CG-6010',
    shipperName: 'Deccan Pharma Lifesciences',
    shipperPhone: '+91 98490 55667',
    weightTon: 6.0,
    cargoType: 'Chemicals (Non-Haz)',
    origin: 'Hyderabad (Pashamylaram SEZ)',
    destination: 'Bengaluru (Hosur Highway)',
    price: 18500,
    detourKm: 3,
    detourMinutes: 14,
    pickupWindow: 'Today, 4:00 PM to 8:00 PM',
    deliveryWindow: 'Tomorrow, 11:00 AM',
    shipperVerified: true,
    requiredBodyType: 'Refrigerated Reefer',
    routeOverlap: 0.94,
    pickupOverlap: 0.9,
    deliveryOverlap: 0.92,
    vehicleFit: 0.96,
    priceFairness: 0.95,
    status: 'published',
    createdAt: '3 hours ago',
    notes: 'Pharma intermediates requiring temperature maintenance between 15-25C.',
  },
]

export type TripStatus =
  | 'planned'
  | 'confirmed'
  | 'en_route_pickup'
  | 'pickup_arrived'
  | 'in_transit'
  | 'delivery_arrived'
  | 'pod_submitted'
  | 'settled'
  | 'completed'
  | 'cancelled'

export interface Trip {
  id: string
  cargoId: string
  cargoTitle: string
  origin: string
  destination: string
  originAddress: string
  destinationAddress: string
  weightTon: number
  cargoType: string
  vehicleModel: string
  vehicleReg: string
  driverName: string
  driverPhone: string
  shipperName: string
  shipperPhone: string
  fare: number
  detourKm: number
  status: TripStatus
  currentKm: number
  totalKm: number
  etaMinutes: number
  currentLocationName: string
  gpsCoordinates: { lat: number; lng: number }
  createdAt: string
  startedAt?: string
  deliveredAt?: string
}

export const initialTrips: Trip[] = [
  {
    id: 'TR-9001',
    cargoId: 'CG-6001',
    cargoTitle: '6.0T General Goods (Textiles)',
    origin: 'Ahmedabad',
    destination: 'Surat',
    originAddress: 'Sanand Industrial Estate, Gate 2, Ahmedabad',
    destinationAddress: 'Surat Textile Market Hub, Ring Road, Surat',
    weightTon: 6.0,
    cargoType: 'General Goods',
    vehicleModel: 'Tata 407',
    vehicleReg: 'MH 12 AB 1234',
    driverName: 'Rahul Sharma',
    driverPhone: '+91 98765 43210',
    shipperName: 'Anand Textiles Limited',
    shipperPhone: '+91 98250 12345',
    fare: 8400,
    detourKm: 2,
    status: 'in_transit',
    currentKm: 198,
    totalKm: 280,
    etaMinutes: 85,
    currentLocationName: 'NH 48 near Bharuch Bypass',
    gpsCoordinates: { lat: 21.7051, lng: 72.9959 },
    createdAt: 'Today, 10:30 AM',
    startedAt: 'Today, 1:15 PM',
  },
  {
    id: 'TR-8800',
    cargoId: 'CG-5002',
    cargoTitle: '5.0T FMCG Goods',
    origin: 'Vadodara',
    destination: 'Surat',
    originAddress: 'Makarpura GIDC, Vadodara',
    destinationAddress: 'Surat Industrial Park, Gate 4',
    weightTon: 5.0,
    cargoType: 'FMCG',
    vehicleModel: 'Tata 407',
    vehicleReg: 'MH 12 AB 1234',
    driverName: 'Rahul Sharma',
    driverPhone: '+91 98765 43210',
    shipperName: 'Gujarat FMCG Distribution Ltd',
    shipperPhone: '+91 98251 67890',
    fare: 7200,
    detourKm: 4,
    status: 'completed',
    currentKm: 154,
    totalKm: 154,
    etaMinutes: 0,
    currentLocationName: 'Surat Delivery Hub',
    gpsCoordinates: { lat: 21.1702, lng: 72.8311 },
    createdAt: 'Yesterday',
    deliveredAt: 'Yesterday, 5:40 PM',
  },
]

export interface TransactionRecord {
  id: string
  referenceId: string
  title: string
  subtitle: string
  amount: number
  kind: 'credit' | 'debit'
  type: 'settlement' | 'cargo_payment' | 'wallet_topup' | 'withdrawal' | 'platform_fee' | 'refund'
  timestamp: string
  status: 'completed' | 'processing' | 'failed'
  paymentMethod?: string
}

export const initialTransactions: TransactionRecord[] = [
  {
    id: 'TX-9401',
    referenceId: 'TR-8800',
    title: 'Trip Settlement: TR-8800',
    subtitle: 'Vadodara to Surat (5.0T FMCG)',
    amount: 7200,
    kind: 'credit',
    type: 'settlement',
    timestamp: 'Yesterday, 05:45 PM',
    status: 'completed',
    paymentMethod: 'Escrow Release',
  },
  {
    id: 'TX-9402',
    referenceId: 'WD-201',
    title: 'Bank Withdrawal to HDFC',
    subtitle: 'IMPS Payout (A/C: •••• 4921)',
    amount: 15000,
    kind: 'debit',
    type: 'withdrawal',
    timestamp: '3 days ago',
    status: 'completed',
    paymentMethod: 'IMPS Direct',
  },
  {
    id: 'TX-9403',
    referenceId: 'TR-8790',
    title: 'Trip Settlement: TR-8790',
    subtitle: 'Surat to Mumbai (6.0T Industrial)',
    amount: 12600,
    kind: 'credit',
    type: 'settlement',
    timestamp: '4 days ago',
    status: 'completed',
    paymentMethod: 'Escrow Release',
  },
  {
    id: 'TX-9404',
    referenceId: 'FEE-109',
    title: 'Platform Convenience Fee',
    subtitle: 'Trip matching surcharge',
    amount: 250,
    kind: 'debit',
    type: 'platform_fee',
    timestamp: '4 days ago',
    status: 'completed',
  },
]

export interface NotificationItem {
  id: string
  category: 'cargo' | 'trips' | 'payment' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
}

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NT-101',
    category: 'cargo',
    title: 'Cargo Hunt match available',
    message: '6.0T General Goods for Surat with 96% match and +2 km detour.',
    timestamp: '5 minutes ago',
    read: false,
    link: '/hunt/CG-6001',
  },
  {
    id: 'NT-102',
    category: 'trips',
    title: 'Trip TR-9001 in transit',
    message: 'Approaching Bharuch bypass. Fastag toll payment processed.',
    timestamp: '45 minutes ago',
    read: false,
    link: '/trip',
  },
  {
    id: 'NT-103',
    category: 'payment',
    title: 'Payment settled to wallet',
    message: 'INR 7,200 credited for completed delivery TR-8800.',
    timestamp: 'Yesterday',
    read: true,
    link: '/wallet',
  },
  {
    id: 'NT-104',
    category: 'system',
    title: 'Vehicle documents verified',
    message: 'Tata 407 (MH 12 AB 1234) national fitness permit approved.',
    timestamp: '2 days ago',
    read: true,
    link: '/vehicles',
  },
]

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi NCR',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const

export const INDIAN_CORRIDORS = [
  { id: 'COR-01', name: 'Delhi - Mumbai Industrial Corridor (DMIC)', nh: 'NH 48 / Western DFC', lengthKm: 1420 },
  { id: 'COR-02', name: 'Ahmedabad - Mumbai Industrial Logistics Belt', nh: 'NH 48', lengthKm: 530 },
  { id: 'COR-03', name: 'Bengaluru - Chennai Tech & Auto Belt', nh: 'NH 48', lengthKm: 345 },
  { id: 'COR-04', name: 'Golden Quadrilateral: Kolkata - Delhi (Eastern Freight)', nh: 'NH 19 / Eastern DFC', lengthKm: 1530 },
  { id: 'COR-05', name: 'North-South Corridor (Delhi - Nagpur - Hyderabad - Bengaluru)', nh: 'NH 44', lengthKm: 2180 },
  { id: 'COR-06', name: 'East-West Corridor (Gujarat Ports - Lucknow - Siliguri - Guwahati)', nh: 'NH 27', lengthKm: 3300 },
  { id: 'COR-07', name: 'Chennai - Hyderabad - Mumbai Industrial Corridor', nh: 'NH 65', lengthKm: 1240 },
  { id: 'COR-08', name: 'East Coast Coastal Freight Corridor (Kolkata - Vizag - Chennai)', nh: 'NH 16', lengthKm: 1680 },
]

export const VEHICLE_BODY_TYPES = [
  'Closed Container',
  'Open Tarpaulin Deck',
  'High Side Deck',
  'Flatbed Trailer',
  'Refrigerated Reefer',
  'Tanker (Liquid)',
] as const

export const VEHICLE_MODELS = [
  { name: 'Tata Ace (Chhota Hathi)', capacityTon: 1.0, defaultBody: 'Closed Container' },
  { name: 'Tata 407', capacityTon: 4.0, defaultBody: 'Closed Container' },
  { name: 'Eicher Pro 2049 (14ft)', capacityTon: 5.0, defaultBody: 'High Side Deck' },
  { name: 'Eicher Pro 3019 (19ft)', capacityTon: 10.0, defaultBody: 'Closed Container' },
  { name: 'Ashok Leyland Ecomet', capacityTon: 12.0, defaultBody: 'Open Tarpaulin Deck' },
  { name: 'BharatBenz 2823R (10-Wheeler)', capacityTon: 20.0, defaultBody: 'Closed Container' },
  { name: '32ft MXL Multi-Axle Container', capacityTon: 25.0, defaultBody: 'Closed Container' },
  { name: '40ft Flatbed Trailer', capacityTon: 35.0, defaultBody: 'Flatbed Trailer' },
]

export const cargoCategories = [
  'General Goods',
  'FMCG',
  'Textiles & Garments',
  'Industrial Goods',
  'Construction Materials',
  'E-commerce Parcels',
  'Agriculture Produce',
  'Automobile Parts',
  'Chemicals (Non-Haz)',
]

export function formatINR(num: number): string {
  if (isNaN(num)) return '₹0'
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

