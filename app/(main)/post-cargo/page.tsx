'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  MapPin,
  Calendar,
  Weight,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  Navigation,
} from 'lucide-react'
import { AppHeader } from '@/components/shell/app-header'
import { PlacesAutocompleteInput } from '@/components/maps/places-autocomplete-input'
import { useApp } from '@/lib/app-context'
import { cargoCategories } from '@/lib/data'

export default function PostCargoPage() {
  const router = useRouter()
  const { addShipperPost } = useApp()

  const [origin, setOrigin] = useState('Sanand GIDC, Ahmedabad')
  const [destination, setDestination] = useState('Surat Textile Market Hub')
  const [weightTon, setWeightTon] = useState('6.0')
  const [cargoType, setCargoType] = useState('General Goods')
  const [requiredBodyType, setRequiredBodyType] = useState('Closed Container')
  const [pickupDate, setPickupDate] = useState('Today, 2:00 PM to 6:00 PM')
  const [deliveryDeadline, setDeliveryDeadline] = useState('Tomorrow, 12:00 PM')
  const [budget, setBudget] = useState('8400')
  const [notes, setNotes] = useState('Forklift dock loading available.')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const numWeight = parseFloat(weightTon) || 5.0
    const numBudget = parseInt(budget) || 8000

    addShipperPost({
      origin,
      destination,
      weightTon: numWeight,
      cargoType,
      pickupDate,
      deliveryDeadline,
      budget: numBudget,
      notes,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/find-trucks')
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <AppHeader title="Post Cargo Load" back />

      <div className="px-4 pt-3 space-y-4">
        {/* Banner */}
        <div className="rounded-xl border border-slate-200 bg-[#0B192C] p-4 text-white shadow-sm space-y-1">
          <p className="font-sans text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#F06524]" /> Match Available Passing Trucks
          </p>
          <p className="text-xs text-slate-300">
            EmptyMiles matches your shipment with trucks that have spare capacity on NH 48 corridor.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* 1. Route Section with Places Autocomplete */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Route &amp; Dock Locations</h3>

            <PlacesAutocompleteInput
              label="Pickup Location"
              placeholder="e.g. Sanand GIDC, Ahmedabad"
              value={origin}
              onChange={(val) => setOrigin(val)}
              iconColor="emerald"
              required
            />

            <PlacesAutocompleteInput
              label="Delivery Destination"
              placeholder="e.g. Surat Textile Market Hub"
              value={destination}
              onChange={(val) => setDestination(val)}
              iconColor="brand"
              required
            />

            {origin && destination && (
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-semibold flex items-center gap-1">
                  <Navigation className="h-3.5 w-3.5 text-[#0B192C]" /> Approx. Corridor Distance: <strong>280 km</strong>
                </span>
                <span className="text-slate-500 text-[11px]">~4h 30m Transit</span>
              </div>
            )}
          </div>

          {/* 2. Load Specifications */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Load Specifications</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Weight (Tons)</label>
                <input
                  required
                  type="number"
                  step="0.5"
                  value={weightTon}
                  onChange={(e) => setWeightTon(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                >
                  {cargoCategories.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Required Body</label>
                <select
                  value={requiredBodyType}
                  onChange={(e) => setRequiredBodyType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                >
                  <option value="Closed Container">Closed Container</option>
                  <option value="High Side Deck">High Side Deck</option>
                  <option value="Flatbed Trailer">Flatbed Trailer</option>
                  <option value="Open Body">Open Body</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Budget (₹)</label>
                <input
                  required
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 8400"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Handling Notes</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Dock loading, forklift required"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 outline-none focus:border-[#0B192C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent w-full py-3.5 text-sm justify-center font-black"
          >
            {isSubmitting ? 'Searching Passing Trucks...' : 'Post Cargo & Match Trucks'}
          </button>
        </form>
      </div>
    </div>
  )
}
