'use client'

import { useState, useEffect, useRef } from 'react'
import {
  MapPin,
  Search,
  Crosshair,
  Loader2,
  X,
  Building2,
  Warehouse,
  CheckCircle2,
} from 'lucide-react'
import { CargoTruckIcon } from '@/components/brand/logo'
import { searchPlaces, PlacePrediction, getCurrentDeviceLocation, reverseGeocodeCoords } from '@/lib/maps/services'

interface PlacesAutocompleteInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string, details?: PlacePrediction) => void
  iconColor?: 'brand' | 'emerald' | 'indigo' | 'amber'
  required?: boolean
  className?: string
  id?: string
  showLogo?: boolean
}

export function PlacesAutocompleteInput({
  label,
  placeholder = 'Search address, industrial estate, city...',
  value,
  onChange,
  iconColor = 'brand',
  required = false,
  className = '',
  id,
  showLogo = false,
}: PlacesAutocompleteInputProps) {
  const [query, setQuery] = useState(value)
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Search places with debounce
  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setPredictions([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const results = await searchPlaces(query)
        setPredictions(results)
      } catch (err) {
        console.error('Places search failed:', err)
      } finally {
        setIsLoading(false)
      }
    }, 220)

    return () => clearTimeout(timer)
  }, [query, isOpen])

  const handleSelectPrediction = (p: PlacePrediction) => {
    const selectedText = p.mainText + (p.secondaryText ? `, ${p.secondaryText.split('•')[0].trim()}` : '')
    setQuery(selectedText)
    onChange(selectedText, p)
    setIsOpen(false)
  }

  const handleUseCurrentLocation = async () => {
    setIsLocating(true)
    try {
      const loc = await getCurrentDeviceLocation()
      const address = await reverseGeocodeCoords(loc.lat, loc.lng)
      setQuery(address)
      onChange(address, {
        placeId: 'current_gps',
        mainText: address,
        secondaryText: 'Current GPS Location',
        fullAddress: address,
        coordinates: { lat: loc.lat, lng: loc.lng },
      })
      setIsOpen(false)
    } catch (err) {
      console.warn('Geolocation failed:', err)
    } finally {
      setIsLocating(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    onChange('', undefined)
    setPredictions([])
    setIsOpen(false)
  }

  const getPinColor = () => {
    switch (iconColor) {
      case 'emerald':
        return 'text-emerald-500'
      case 'indigo':
        return 'text-indigo-500'
      case 'amber':
        return 'text-amber-500'
      default:
        return 'text-brand'
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-ink flex items-center justify-between mb-1.5">
          <span className="flex items-center gap-1.5">
            <MapPin className={`h-3.5 w-3.5 ${getPinColor()}`} /> {label}
          </span>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="text-[11px] font-semibold text-brand hover:underline inline-flex items-center gap-1 transition"
          >
            {isLocating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Crosshair className="h-3 w-3" />}
            GPS Locate
          </button>
        </label>
      )}

      <div className="relative flex items-center">
        {showLogo && (
          <div className="absolute left-2.5 z-10 flex items-center pointer-events-none">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-[#0B192C] p-0.5 shadow-2xs">
              <CargoTruckIcon className="h-full w-full" variant="color" />
            </div>
          </div>
        )}
        <input
          id={id}
          required={required}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange(e.target.value)
            setIsOpen(true)
          }}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-hairline bg-secondary py-2.5 pr-16 text-xs font-semibold text-ink placeholder-muted-ink outline-none transition focus:border-brand focus:bg-card focus:ring-2 focus:ring-brand/10 ${
            showLogo ? 'pl-10' : 'px-3.5'
          }`}
        />

        <div className="absolute right-2 flex items-center gap-1 text-muted-ink">
          {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear location"
              className="grid h-6 w-6 place-items-center rounded-full hover:bg-slate-200 text-muted-ink hover:text-ink transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Predictions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-40 mt-1.5 w-full overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Quick Hub Presets */}
          <div className="border-b border-hairline bg-secondary/50 px-3 py-2 flex items-center justify-between text-[11px] text-muted-ink font-semibold">
            <span>Verified Freight Corridors</span>
            <span className="text-[10px] text-brand">Google Maps Places</span>
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-hairline">
            {predictions.length > 0 ? (
              predictions.map((item) => (
                <button
                  key={item.placeId}
                  type="button"
                  onClick={() => handleSelectPrediction(item)}
                  className="flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left hover:bg-secondary transition active:bg-secondary/80"
                >
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                    {item.hubType === 'industrial_estate' ? (
                      <Warehouse className="h-3.5 w-3.5" />
                    ) : item.hubType === 'port' ? (
                      <Building2 className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-bold text-ink">{item.mainText}</p>
                    <p className="truncate text-[11px] text-muted-ink">{item.secondaryText || item.fullAddress}</p>
                  </div>
                </button>
              ))
            ) : query.length >= 2 && !isLoading ? (
              <div className="px-4 py-3 text-center text-xs text-muted-ink">
                No matching locations found for &ldquo;{query}&rdquo;.
              </div>
            ) : (
              // Default suggestion list
              <div className="py-1">
                {[
                  { name: 'Sanand GIDC, Ahmedabad', sub: 'Gujarat • Industrial Estate' },
                  { name: 'Surat Textile Market Hub', sub: 'Gujarat • Ring Road Hub' },
                  { name: 'Bharuch Industrial Corridor', sub: 'Gujarat • NH 48 Hub' },
                  { name: 'Bhiwandi Logistics Park', sub: 'Mumbai, Maharashtra' },
                  { name: 'Chakan Auto Cluster', sub: 'Pune, Maharashtra' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setQuery(preset.name)
                      onChange(preset.name)
                      setIsOpen(false)
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left hover:bg-secondary transition"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
                    <div>
                      <p className="text-xs font-semibold text-ink">{preset.name}</p>
                      <p className="text-[10px] text-muted-ink">{preset.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
