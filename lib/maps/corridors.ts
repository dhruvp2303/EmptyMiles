export interface GeoPoint {
  lat: number
  lng: number
  name: string
  state?: string
  hubType?: 'industrial_estate' | 'port' | 'logistics_park' | 'toll_plaza' | 'city'
  corridor?: string
}

export const FREIGHT_HUBS: Record<string, GeoPoint> = {
  // --- WEST ZONE (Gujarat, Maharashtra, Goa) ---
  ahmedabad: { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad (Sanand / Narol)', state: 'Gujarat', hubType: 'city', corridor: 'NH 48' },
  sanand: { lat: 22.9868, lng: 72.3802, name: 'Sanand Auto SEZ, Ahmedabad', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  narol: { lat: 22.9723, lng: 72.5976, name: 'Narol Textile Market, Ahmedabad', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  changodar: { lat: 22.9158, lng: 72.4439, name: 'Changodar Industrial Zone', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  vadodara: { lat: 22.3072, lng: 73.1812, name: 'Vadodara (Makarpura GIDC)', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  bharuch: { lat: 21.7051, lng: 72.9959, name: 'Bharuch Chemical Corridor', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  ankleshwar: { lat: 21.6264, lng: 73.0039, name: 'Ankleshwar GIDC Hub', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  surat: { lat: 21.1702, lng: 72.8311, name: 'Surat (Textile & Diamond Hub)', state: 'Gujarat', hubType: 'city', corridor: 'NH 48' },
  hazira: { lat: 21.1084, lng: 72.6515, name: 'Hazira Port & Heavy Engineering', state: 'Gujarat', hubType: 'port', corridor: 'NH 48' },
  vapi: { lat: 20.3893, lng: 72.9106, name: 'Vapi GIDC Industrial Complex', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 48' },
  rajkot: { lat: 22.3039, lng: 70.8022, name: 'Rajkot (Aji Industrial Area)', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 27' },
  morbi: { lat: 22.8120, lng: 70.8385, name: 'Morbi Ceramic Cluster', state: 'Gujarat', hubType: 'industrial_estate', corridor: 'NH 27' },
  mundra: { lat: 22.8396, lng: 69.7214, name: 'Mundra Adani Port SEZ', state: 'Gujarat', hubType: 'port', corridor: 'NH 27' },
  kandla: { lat: 23.0118, lng: 70.2185, name: 'Deendayal Kandla Port Hub', state: 'Gujarat', hubType: 'port', corridor: 'NH 27' },

  mumbai: { lat: 19.0760, lng: 72.8777, name: 'Mumbai Logistics Network', state: 'Maharashtra', hubType: 'city', corridor: 'NH 48' },
  bhiwandi: { lat: 19.2967, lng: 73.0631, name: 'Bhiwandi Mega Warehousing Park', state: 'Maharashtra', hubType: 'logistics_park', corridor: 'NH 48' },
  jnpt: { lat: 18.9499, lng: 72.9507, name: 'JNPT Port (Nhava Sheva)', state: 'Maharashtra', hubType: 'port', corridor: 'NH 48' },
  pune: { lat: 18.5204, lng: 73.8567, name: 'Pune (Chakan Auto Cluster)', state: 'Maharashtra', hubType: 'industrial_estate', corridor: 'NH 48' },
  nagpur: { lat: 21.1458, lng: 79.0882, name: 'Nagpur Multi-Modal MIHAN Hub', state: 'Maharashtra', hubType: 'logistics_park', corridor: 'NH 44' },
  nashik: { lat: 19.9975, lng: 73.7898, name: 'Nashik (Ambad MIDC Industrial)', state: 'Maharashtra', hubType: 'industrial_estate', corridor: 'NH 60' },
  aurangabad: { lat: 19.8762, lng: 75.3433, name: 'Aurangabad (Waluj Industrial SEZ)', state: 'Maharashtra', hubType: 'industrial_estate', corridor: 'Samruddhi' },
  kolhapur: { lat: 16.7050, lng: 74.2433, name: 'Kolhapur Foundry & Engineering Hub', state: 'Maharashtra', hubType: 'industrial_estate', corridor: 'NH 48' },
  goa: { lat: 15.2993, lng: 74.1240, name: 'Goa (Mormugao Port & Verna IDC)', state: 'Goa', hubType: 'port', corridor: 'NH 66' },

  // --- NORTH ZONE (Delhi NCR, Haryana, Punjab, Rajasthan, UP, Uttarakhand) ---
  delhi: { lat: 28.6139, lng: 77.2090, name: 'Delhi NCR (Kundli Logistics Hub)', state: 'Delhi NCR', hubType: 'logistics_park', corridor: 'NH 44' },
  gurugram: { lat: 28.4595, lng: 77.0266, name: 'Gurugram (Manesar IMT Auto Hub)', state: 'Haryana', hubType: 'industrial_estate', corridor: 'NH 48' },
  noida: { lat: 28.5355, lng: 77.3910, name: 'Noida (Greater Noida Electronics SEZ)', state: 'Uttar Pradesh', hubType: 'industrial_estate', corridor: 'Yamuna Exp' },
  faridabad: { lat: 28.4089, lng: 77.3178, name: 'Faridabad Industrial Corridor', state: 'Haryana', hubType: 'industrial_estate', corridor: 'NH 44' },
  ludhiana: { lat: 30.9010, lng: 75.8573, name: 'Ludhiana (Focal Point Industrial Hub)', state: 'Punjab', hubType: 'industrial_estate', corridor: 'NH 44' },
  chandigarh: { lat: 30.7333, lng: 76.7794, name: 'Chandigarh / Mohali Industrial Belt', state: 'Punjab', hubType: 'city', corridor: 'NH 44' },
  amritsar: { lat: 31.6340, lng: 74.8723, name: 'Amritsar Trade Gate (Attari)', state: 'Punjab', hubType: 'logistics_park', corridor: 'NH 3' },
  baddi: { lat: 30.9578, lng: 76.7914, name: 'Baddi Pharma Manufacturing Hub', state: 'Himachal Pradesh', hubType: 'industrial_estate', corridor: 'NH 21A' },
  jaipur: { lat: 26.9124, lng: 75.7873, name: 'Jaipur (VKIA & Sitapura SEZ)', state: 'Rajasthan', hubType: 'industrial_estate', corridor: 'NH 48' },
  jodhpur: { lat: 26.2389, lng: 73.0243, name: 'Jodhpur (Boronada Handicraft Hub)', state: 'Rajasthan', hubType: 'industrial_estate', corridor: 'NH 62' },
  bhiwadi: { lat: 28.2104, lng: 76.8606, name: 'Bhiwadi Industrial Estate', state: 'Rajasthan', hubType: 'industrial_estate', corridor: 'NH 48' },
  lucknow: { lat: 26.8467, lng: 80.9462, name: 'Lucknow (Transport Nagar Logistics)', state: 'Uttar Pradesh', hubType: 'logistics_park', corridor: 'NH 27' },
  kanpur: { lat: 26.4499, lng: 80.3319, name: 'Kanpur (Panki Industrial Estate)', state: 'Uttar Pradesh', hubType: 'industrial_estate', corridor: 'NH 19' },
  agra: { lat: 27.1767, lng: 78.0081, name: 'Agra (Foundry & Leather Cluster)', state: 'Uttar Pradesh', hubType: 'industrial_estate', corridor: 'NH 19' },
  varanasi: { lat: 25.3176, lng: 82.9739, name: 'Varanasi Multi-Modal Inland Terminal', state: 'Uttar Pradesh', hubType: 'port', corridor: 'NH 19' },
  rudrapur: { lat: 28.9789, lng: 79.4004, name: 'Rudrapur (SIDCUL Industrial Hub)', state: 'Uttarakhand', hubType: 'industrial_estate', corridor: 'NH 109' },

  // --- SOUTH ZONE (Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala) ---
  bengaluru: { lat: 12.9716, lng: 77.5946, name: 'Bengaluru (Peenya & Whitefield Tech)', state: 'Karnataka', hubType: 'city', corridor: 'NH 48' },
  hosur: { lat: 12.7409, lng: 77.8253, name: 'Hosur (SIPCOT Industrial Park)', state: 'Tamil Nadu', hubType: 'industrial_estate', corridor: 'NH 44' },
  hubballi: { lat: 15.3647, lng: 75.1240, name: 'Hubballi-Dharwad Logistics Junction', state: 'Karnataka', hubType: 'logistics_park', corridor: 'NH 48' },
  mangaluru: { lat: 12.9141, lng: 74.8560, name: 'New Mangalore Port & Baikampady', state: 'Karnataka', hubType: 'port', corridor: 'NH 66' },
  
  chennai: { lat: 13.0827, lng: 80.2707, name: 'Chennai Port & Central Hub', state: 'Tamil Nadu', hubType: 'city', corridor: 'NH 16' },
  sriperumbudur: { lat: 12.9699, lng: 79.9405, name: 'Sriperumbudur Auto & Tech Corridor', state: 'Tamil Nadu', hubType: 'industrial_estate', corridor: 'NH 48' },
  coimbatore: { lat: 11.0168, lng: 76.9558, name: 'Coimbatore (SIDCO Textile & Pump Hub)', state: 'Tamil Nadu', hubType: 'industrial_estate', corridor: 'NH 544' },
  tirupur: { lat: 11.1085, lng: 77.3411, name: 'Tirupur Knitwear Export Hub', state: 'Tamil Nadu', hubType: 'industrial_estate', corridor: 'NH 544' },
  madurai: { lat: 9.9252, lng: 78.1198, name: 'Madurai Industrial Corridor', state: 'Tamil Nadu', hubType: 'city', corridor: 'NH 44' },
  tuticorin: { lat: 8.7642, lng: 78.1348, name: 'V.O. Chidambaranar Port (Tuticorin)', state: 'Tamil Nadu', hubType: 'port', corridor: 'NH 38' },

  hyderabad: { lat: 17.3850, lng: 78.4867, name: 'Hyderabad (Medchal & Shamshabad Cargo)', state: 'Telangana', hubType: 'city', corridor: 'NH 44' },
  pashamylaram: { lat: 17.5348, lng: 78.1882, name: 'Pashamylaram Pharma & Biotech SEZ', state: 'Telangana', hubType: 'industrial_estate', corridor: 'NH 65' },
  
  visakhapatnam: { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam Port & Steel Terminal', state: 'Andhra Pradesh', hubType: 'port', corridor: 'NH 16' },
  vijayawada: { lat: 16.5062, lng: 80.6480, name: 'Vijayawada (Autonagar Transit Hub)', state: 'Andhra Pradesh', hubType: 'logistics_park', corridor: 'NH 16' },
  sri_city: { lat: 13.5342, lng: 80.0245, name: 'Sri City Integrated Business SEZ', state: 'Andhra Pradesh', hubType: 'industrial_estate', corridor: 'NH 16' },

  kochi: { lat: 9.9312, lng: 76.2673, name: 'Kochi (Vallarpadam International Port)', state: 'Kerala', hubType: 'port', corridor: 'NH 66' },
  thiruvananthapuram: { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram (Vizhinjam Port)', state: 'Kerala', hubType: 'port', corridor: 'NH 66' },

  // --- EAST & CENTRAL ZONE (WB, Odisha, Jharkhand, Bihar, MP, Chhattisgarh) ---
  kolkata: { lat: 22.5726, lng: 88.3639, name: 'Kolkata (Dankuni Multi-Modal Terminal)', state: 'West Bengal', hubType: 'logistics_park', corridor: 'NH 19' },
  haldia: { lat: 22.0657, lng: 88.0640, name: 'Haldia Port & Petrochemical SEZ', state: 'West Bengal', hubType: 'port', corridor: 'NH 116' },
  siliguri: { lat: 26.7271, lng: 88.3953, name: 'Siliguri Chicken-Neck Corridor Hub', state: 'West Bengal', hubType: 'logistics_park', corridor: 'NH 27' },
  bhubaneswar: { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar Logistics Corridor', state: 'Odisha', hubType: 'city', corridor: 'NH 16' },
  paradeep: { lat: 20.3164, lng: 86.6114, name: 'Paradeep Port Iron & Mineral Hub', state: 'Odisha', hubType: 'port', corridor: 'NH 53' },
  jamshedpur: { lat: 22.8046, lng: 86.2029, name: 'Jamshedpur (Adityapur Industrial Area)', state: 'Jharkhand', hubType: 'industrial_estate', corridor: 'NH 18' },
  ranchi: { lat: 23.3441, lng: 85.3096, name: 'Ranchi Mineral Corridor Gate', state: 'Jharkhand', hubType: 'city', corridor: 'NH 20' },
  patna: { lat: 25.5941, lng: 85.1376, name: 'Patna (Fatuha Inland Logistics Hub)', state: 'Bihar', hubType: 'logistics_park', corridor: 'NH 31' },
  indore: { lat: 22.7196, lng: 75.8577, name: 'Indore (Pithampur Auto & Pharma SEZ)', state: 'Madhya Pradesh', hubType: 'industrial_estate', corridor: 'NH 52' },
  bhopal: { lat: 23.2599, lng: 77.4126, name: 'Bhopal (Mandideep Industrial Area)', state: 'Madhya Pradesh', hubType: 'industrial_estate', corridor: 'NH 46' },
  raipur: { lat: 21.2514, lng: 81.6296, name: 'Raipur (Urla & Siltara Steel Belt)', state: 'Chhattisgarh', hubType: 'industrial_estate', corridor: 'NH 53' },

  // --- NORTH-EAST ZONE (Assam, Meghalaya, Tripura) ---
  guwahati: { lat: 26.1445, lng: 91.7362, name: 'Guwahati (Amingaon Inland Depot)', state: 'Assam', hubType: 'logistics_park', corridor: 'NH 27' },
  shillong: { lat: 25.5788, lng: 91.8933, name: 'Shillong Bypass Hub', state: 'Meghalaya', hubType: 'city', corridor: 'NH 6' },
  agartala: { lat: 23.8315, lng: 91.2868, name: 'Agartala Integrated Border Checkpost', state: 'Tripura', hubType: 'logistics_park', corridor: 'NH 8' },
}

export const NATIONAL_FREIGHT_CORRIDORS = [
  {
    id: 'COR-01',
    name: 'Delhi - Mumbai Industrial Corridor (DMIC)',
    highway: 'NH 48 / Western DFC',
    distanceKm: 1420,
    keyHubs: ['Delhi NCR', 'Gurugram', 'Jaipur', 'Ahmedabad', 'Vadodara', 'Surat', 'Bhiwandi', 'JNPT Port', 'Mumbai'],
  },
  {
    id: 'COR-02',
    name: 'Ahmedabad - Mumbai Highway Logistics Belt',
    highway: 'NH 48',
    distanceKm: 530,
    keyHubs: ['Sanand GIDC', 'Vadodara Makarpura', 'Bharuch Chemical Hub', 'Ankleshwar', 'Surat Textile', 'Vapi', 'Bhiwandi'],
  },
  {
    id: 'COR-03',
    name: 'Bengaluru - Chennai Automotive Expressway',
    highway: 'NH 48 / Chennai-Bengaluru Exp',
    distanceKm: 345,
    keyHubs: ['Peenya Industrial', 'Hosur SIPCOT', 'Sriperumbudur Auto Hub', 'Chennai Port'],
  },
  {
    id: 'COR-04',
    name: 'Golden Quadrilateral: Kolkata - Delhi (Eastern Freight)',
    highway: 'NH 19 / Eastern DFC',
    distanceKm: 1530,
    keyHubs: ['Dankuni Logistics', 'Asansol', 'Dhanbad', 'Varanasi Port', 'Kanpur Panki', 'Agra', 'Delhi NCR'],
  },
  {
    id: 'COR-05',
    name: 'North-South Corridor (Delhi - Nagpur - Hyderabad - Bengaluru)',
    highway: 'NH 44',
    distanceKm: 2180,
    keyHubs: ['Delhi NCR', 'Gwalior', 'Nagpur MIHAN', 'Hyderabad Shamshabad', 'Kurnool', 'Bengaluru'],
  },
  {
    id: 'COR-06',
    name: 'East-West Corridor (Gujarat Ports - Lucknow - Guwahati)',
    highway: 'NH 27',
    distanceKm: 3300,
    keyHubs: ['Mundra Port', 'Ahmedabad', 'Udaipur', 'Jhansi', 'Lucknow', 'Patna', 'Siliguri', 'Guwahati'],
  },
  {
    id: 'COR-07',
    name: 'Chennai - Hyderabad - Mumbai Industrial Corridor',
    highway: 'NH 65',
    distanceKm: 1240,
    keyHubs: ['Chennai', 'Vijayawada Autonagar', 'Hyderabad Medchal', 'Solapur', 'Pune Chakan', 'Mumbai'],
  },
  {
    id: 'COR-08',
    name: 'East Coast Coastal Freight Corridor (Kolkata - Vizag - Chennai)',
    highway: 'NH 16',
    distanceKm: 1680,
    keyHubs: ['Kolkata', 'Bhubaneswar', 'Paradeep Port', 'Visakhapatnam Port', 'Vijayawada', 'Sri City', 'Chennai Port'],
  },
]

export const DEFAULT_CORRIDOR_WAYPOINTS = [
  { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad (Sanand GIDC)' },
  { lat: 22.8461, lng: 72.7121, name: 'Kheda Toll Plaza' },
  { lat: 22.6916, lng: 72.8634, name: 'Nadiad Crossing' },
  { lat: 22.5645, lng: 72.9289, name: 'Anand Bypass' },
  { lat: 22.3072, lng: 73.1812, name: 'Vadodara Golden Chawk' },
  { lat: 21.9421, lng: 73.0854, name: 'Karjan Toll' },
  { lat: 21.7051, lng: 72.9959, name: 'Bharuch Narmada Bridge' },
  { lat: 21.6264, lng: 73.0039, name: 'Ankleshwar GIDC (Detour Hub)' },
  { lat: 21.4125, lng: 72.9421, name: 'Kosamba NH 48' },
  { lat: 21.2891, lng: 72.8845, name: 'Kamrej Toll Junction' },
  { lat: 21.1702, lng: 72.8311, name: 'Surat (Ring Road Textile Hub)' },
]

export function resolveFreightCoordinates(locationString: string): GeoPoint {
  if (!locationString) {
    return FREIGHT_HUBS.ahmedabad
  }
  const clean = locationString.toLowerCase().trim()
  for (const [key, point] of Object.entries(FREIGHT_HUBS)) {
    if (clean.includes(key) || clean.includes(point.name.toLowerCase()) || (point.state && clean.includes(point.state.toLowerCase()))) {
      return point
    }
  }
  
  // Geolocation approximation based on name hash for consistent Pan-India coordinates
  let hash = 0
  for (let i = 0; i < locationString.length; i++) {
    hash = locationString.charCodeAt(i) + ((hash << 5) - hash)
  }
  const latOffset = ((Math.abs(hash) % 1200) / 100) - 6 // lat range 18 to 30
  const lngOffset = ((Math.abs(hash >> 3) % 1400) / 100) - 7 // lng range 72 to 86

  return {
    lat: 22.5 + latOffset,
    lng: 78.0 + lngOffset,
    name: locationString,
    hubType: 'city',
  }
}
