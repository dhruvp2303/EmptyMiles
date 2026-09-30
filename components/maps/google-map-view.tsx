'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Layers,
  Navigation,
  Compass,
  Maximize2,
  Minimize2,
  Crosshair,
  ShieldCheck,
  Sparkles,
  Zap,
  MapPin,
  Car,
  Key,
  Info,
} from 'lucide-react'
import { loadGoogleMaps, getMapsAuthStatus } from '@/lib/maps/google-maps-loader'
import {
  EMPTYMILES_DARK_MAP_STYLE,
  EMPTYMILES_SILVER_MAP_STYLE,
  calculateRouteWithDirections,
  RouteResult,
  getCurrentDeviceLocation,
} from '@/lib/maps/services'
import { resolveFreightCoordinates, GeoPoint } from '@/lib/maps/corridors'
import { MapsApiKeyModal } from './maps-api-key-modal'
import { cn } from '@/lib/utils'

export interface MapCargoPoint {
  id: string
  title: string
  location: string
  lat?: number
  lng?: number
  weightTon?: number
  price?: number
  matchScore?: number
  shipper?: string
}

interface GoogleMapViewProps {
  origin?: string | { lat: number; lng: number }
  destination?: string | { lat: number; lng: number }
  originLabel?: string
  destinationLabel?: string
  waypoints?: (string | { lat: number; lng: number })[]
  intermediateLabel?: string
  truckProgress?: number // 0 to 1
  truckSpeedKmh?: number
  cargos?: MapCargoPoint[]
  selectedCargoId?: string
  onSelectCargo?: (cargo: MapCargoPoint) => void
  interactive?: boolean
  showControls?: boolean
  showTraffic?: boolean
  showTelemetryOverlay?: boolean
  defaultTheme?: 'dark' | 'silver' | 'satellite'
  className?: string
  height?: string
}

export function GoogleMapView({
  origin = 'Ahmedabad',
  destination = 'Surat',
  originLabel,
  destinationLabel,
  waypoints = [],
  intermediateLabel = 'Bharuch Dock (Detour Stop)',
  truckProgress = 0.65,
  truckSpeedKmh = 62,
  cargos = [],
  selectedCargoId,
  onSelectCargo,
  interactive = true,
  showControls = true,
  showTraffic: initialTraffic = false,
  showTelemetryOverlay = true,
  defaultTheme = 'dark',
  className = '',
  height = '100%',
}: GoogleMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const polylinesRef = useRef<google.maps.Polyline[]>([])
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null)

  const [mapTheme, setMapTheme] = useState<'dark' | 'silver' | 'satellite'>(defaultTheme)
  const [trafficEnabled, setTrafficEnabled] = useState(initialTraffic)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [authStatus, setAuthStatus] = useState<'authenticated' | 'demo_mode' | 'invalid_key'>('demo_mode')
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [routeData, setRouteData] = useState<RouteResult | null>(null)
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null)

  const originKey = typeof origin === 'string' ? origin : `${origin?.lat},${origin?.lng}`
  const destKey = typeof destination === 'string' ? destination : `${destination?.lat},${destination?.lng}`
  const waypointsKey = JSON.stringify(waypoints)
  const cargosKey = JSON.stringify(cargos?.map((c) => c.id) || [])

  // Initialize and load route data stably
  useEffect(() => {
    let active = true
    const fetchRoute = async () => {
      try {
        const data = await calculateRouteWithDirections(origin, destination, waypoints)
        if (active) {
          setRouteData(data)
        }
      } catch (err) {
        console.warn('Error fetching route for map:', err)
      }
    }
    fetchRoute()
    return () => {
      active = false
    }
  }, [originKey, destKey, waypointsKey])

  // Initialize Map
  useEffect(() => {
    let isCancelled = false

    const initMap = async () => {
      const g = await loadGoogleMaps()
      const currentStatus = getMapsAuthStatus()
      if (!isCancelled) {
        setAuthStatus(currentStatus === 'authenticated' ? 'authenticated' : 'demo_mode')
      }

      if (!g || !g.maps || !mapContainerRef.current) {
        if (!isCancelled) setIsLoaded(true)
        return
      }

      try {
        const originCoords = typeof origin === 'string' ? resolveFreightCoordinates(origin) : origin
        const destCoords = typeof destination === 'string' ? resolveFreightCoordinates(destination) : destination

        const centerLat = (originCoords.lat + destCoords.lat) / 2
        const centerLng = (originCoords.lng + destCoords.lng) / 2

        const mapOptions: google.maps.MapOptions = {
          center: { lat: centerLat, lng: centerLng },
          zoom: 8,
          disableDefaultUI: !showControls,
          zoomControl: showControls,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: interactive ? 'greedy' : 'none',
          styles:
            mapTheme === 'dark'
              ? EMPTYMILES_DARK_MAP_STYLE
              : mapTheme === 'silver'
              ? EMPTYMILES_SILVER_MAP_STYLE
              : undefined,
          mapTypeId: mapTheme === 'satellite' ? g.maps.MapTypeId.HYBRID : g.maps.MapTypeId.ROADMAP,
        }

        const map = new g.maps.Map(mapContainerRef.current, mapOptions)
        mapInstanceRef.current = map

        // Setup Traffic Layer
        const trafficLayer = new g.maps.TrafficLayer()
        trafficLayerRef.current = trafficLayer
        if (trafficEnabled) {
          trafficLayer.setMap(map)
        }

        // Render markers & polylines
        if (!isCancelled) {
          renderMapElements(g, map, originCoords, destCoords)
          setIsLoaded(true)
        }
      } catch (e) {
        console.error('Failed to instantiate Google Map:', e)
        if (!isCancelled) setIsLoaded(true)
      }
    }

    initMap()

    return () => {
      isCancelled = true
      clearMarkersAndPolylines()
    }
  }, [originKey, destKey, mapTheme, waypointsKey, cargosKey])

  const clearMarkersAndPolylines = () => {
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []
    polylinesRef.current.forEach((p) => p.setMap(null))
    polylinesRef.current = []
    if (activeInfoWindow) {
      activeInfoWindow.close()
    }
  }

  const renderMapElements = async (
    g: typeof google,
    map: google.maps.Map,
    originCoords: { lat: number; lng: number },
    destCoords: { lat: number; lng: number }
  ) => {
    clearMarkersAndPolylines()

    const bounds = new g.maps.LatLngBounds()
    bounds.extend(originCoords)
    bounds.extend(destCoords)

    // Origin Marker (Green Flag)
    const originMarker = new g.maps.Marker({
      position: originCoords,
      map,
      title: originLabel || 'Trip Origin',
      icon: {
        path: g.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: '#16A34A',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2.5,
      },
    })
    markersRef.current.push(originMarker)

    // Destination Marker (Brand Pin)
    const destMarker = new g.maps.Marker({
      position: destCoords,
      map,
      title: destinationLabel || 'Delivery Destination',
      icon: {
        path: 'M 0 -16 C 8 -16 14 -9 14 -1 C 14 7 0 17 0 17 C 0 17 -14 7 -14 -1 C -14 -9 -8 -16 0 -16 Z',
        scale: 1.2,
        fillColor: '#FF6B1A',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        anchor: new g.maps.Point(0, 0),
      },
    })
    markersRef.current.push(destMarker)

    // Waypoints / Detour Marker
    waypoints.forEach((wp) => {
      const wpCoord = typeof wp === 'string' ? resolveFreightCoordinates(wp) : wp
      bounds.extend(wpCoord)
      const wpMarker = new g.maps.Marker({
        position: wpCoord,
        map,
        title: intermediateLabel,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#F59E0B',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      })
      markersRef.current.push(wpMarker)
    })

    // Cargo Opportunities pins along route
    cargos.forEach((c) => {
      const coord = c.lat && c.lng ? { lat: c.lat, lng: c.lng } : resolveFreightCoordinates(c.location)
      bounds.extend(coord)

      const isSelected = c.id === selectedCargoId

      const cargoMarker = new g.maps.Marker({
        position: coord,
        map,
        title: c.title,
        icon: {
          path: g.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: isSelected ? 7 : 5,
          fillColor: isSelected ? '#3B82F6' : '#6366F1',
          fillOpacity: 0.95,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      })

      cargoMarker.addListener('click', () => {
        if (onSelectCargo) onSelectCargo(c)
      })

      markersRef.current.push(cargoMarker)
    })

    // Route Polyline
    const rData = routeData || (await loadRoute())
    if (rData && rData.pathCoordinates.length > 0) {
      const polyline = new g.maps.Polyline({
        path: rData.pathCoordinates,
        geodesic: true,
        strokeColor: '#FF6B1A',
        strokeOpacity: 0.9,
        strokeWeight: 5,
        map,
      })
      polylinesRef.current.push(polyline)

      // Live Truck Animated Marker on route
      const tIndex = Math.floor(Math.min(0.99, Math.max(0, truckProgress)) * (rData.pathCoordinates.length - 1))
      const truckPos = rData.pathCoordinates[tIndex] || originCoords

      const truckMarker = new g.maps.Marker({
        position: truckPos,
        map,
        title: `EmptyMiles Fleet Truck (${truckSpeedKmh} km/h)`,
        icon: {
          path: g.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: '#0B1730',
          fillOpacity: 1,
          strokeColor: '#FF6B1A',
          strokeWeight: 3,
          rotation: 180, // heading south on NH 48
        },
      })
      markersRef.current.push(truckMarker)
    }

    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 })
  }

  // Toggle Traffic Layer
  const handleToggleTraffic = () => {
    const next = !trafficEnabled
    setTrafficEnabled(next)
    if (trafficLayerRef.current && mapInstanceRef.current) {
      trafficLayerRef.current.setMap(next ? mapInstanceRef.current : null)
    }
  }

  // Recenter GPS
  const handleRecenter = async () => {
    try {
      const loc = await getCurrentDeviceLocation()
      if (mapInstanceRef.current && window.google) {
        mapInstanceRef.current.panTo({ lat: loc.lat, lng: loc.lng })
        mapInstanceRef.current.setZoom(12)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden select-none',
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen bg-ink' : '',
        className
      )}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Real Google Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 h-full w-full bg-[#0B1730]" />

      {/* Fallback SVG Vector Engine when Google Maps JS is offline/demo */}
      {authStatus !== 'authenticated' && (
        <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen">
          <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <g stroke="#18274A" strokeWidth="1.2">
              <path d="M0 60 H400 M0 130 H400 M0 195 H400" />
              <path d="M90 0 V260 M200 0 V260 M310 0 V260" />
            </g>
            <path
              d="M 40 210 C 110 160, 90 90, 175 90 S 300 140, 360 70"
              fill="none"
              stroke="#223660"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 40 210 C 110 160, 90 90, 175 90 S 300 140, 360 70"
              fill="none"
              stroke="#FF6B1A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 - 400 * truckProgress}
            />
          </svg>
        </div>
      )}

      {/* Top Floating Controls Bar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
        {/* Auth / Simulator Badge */}
        <button
          type="button"
          onClick={() => setShowKeyModal(true)}
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1 text-[11px] font-bold text-white shadow-xl backdrop-blur-md hover:bg-slate-800 transition active:scale-95"
        >
          {authStatus === 'authenticated' ? (
            <>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Google Maps Live</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Corridor GIS Engine</span>
            </>
          )}
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
        </button>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Traffic Toggle */}
          <button
            type="button"
            onClick={handleToggleTraffic}
            title="Toggle Live Traffic"
            className={cn(
              'grid h-8 w-8 place-items-center rounded-xl border backdrop-blur-md shadow-lg transition active:scale-95',
              trafficEnabled
                ? 'border-emerald-500 bg-emerald-600 text-white'
                : 'border-white/15 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            )}
          >
            <Car className="h-4 w-4" />
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={() => setMapTheme((prev) => (prev === 'dark' ? 'silver' : prev === 'silver' ? 'satellite' : 'dark'))}
            title="Switch Map Theme"
            className="grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-slate-900/80 text-slate-300 backdrop-blur-md shadow-lg hover:bg-slate-800 hover:text-white transition active:scale-95"
          >
            <Layers className="h-4 w-4" />
          </button>

          {/* GPS Recenter */}
          <button
            type="button"
            onClick={handleRecenter}
            title="Locate Me (GPS)"
            className="grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-slate-900/80 text-slate-300 backdrop-blur-md shadow-lg hover:bg-slate-800 hover:text-white transition active:scale-95"
          >
            <Crosshair className="h-4 w-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Fullscreen"
            className="grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-slate-900/80 text-slate-300 backdrop-blur-md shadow-lg hover:bg-slate-800 hover:text-white transition active:scale-95"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Live Telemetry Floating Pill (Bottom Left) */}
      {showTelemetryOverlay && routeData && (
        <div className="absolute bottom-3 left-3 pointer-events-none z-10 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/85 px-3 py-2 text-white shadow-2xl backdrop-blur-md">
            <div className="grid h-7 w-7 place-items-center rounded-xl brand-gradient text-white">
              <Navigation className="h-3.5 w-3.5" />
            </div>
            <div className="text-[11px]">
              <p className="font-bold text-white">
                {routeData.distanceText} • {routeData.durationText}
              </p>
              <p className="text-[10px] text-slate-400">
                Speed: <span className="text-emerald-400 font-semibold">{truckSpeedKmh} km/h</span> | Fastag Tolls: {routeData.tollInfo?.tollCount || 4}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps API Key Modal */}
      <MapsApiKeyModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
    </div>
  )
}
