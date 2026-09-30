'use client'

import React, { useState } from 'react'
import { Search, X, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { CargoTruckIcon, LogoMark } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

interface CargoSearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (val: string) => void
  onSearch?: (val: string) => void
  onFilterClick?: () => void
  showFilterButton?: boolean
  className?: string
  autoFocus?: boolean
}

export function CargoSearchBar({
  placeholder = 'Search corridor, cargo type, or city...',
  value: controlledValue,
  onChange,
  onSearch,
  onFilterClick,
  showFilterButton = false,
  className,
  autoFocus = false,
}: CargoSearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = controlledValue !== undefined
  const query = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue('')
    onChange?.('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(query)
    }
  }

  return (
    <div
      className={cn(
        'relative flex items-center w-full rounded-2xl bg-white border transition-all duration-200 shadow-sm',
        isFocused
          ? 'border-[#F06524] ring-2 ring-[#F06524]/15 shadow-md'
          : 'border-slate-200/90 hover:border-slate-300',
        className
      )}
    >
      {/* Brand Cargo Truck Logo Leading Icon */}
      <div className="flex items-center pl-3 pr-2 shrink-0 select-none">
        <div className="relative group flex items-center justify-center h-8 w-8 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#1E3E62] p-1 shadow-xs transition-transform duration-200 group-hover:scale-105">
          <CargoTruckIcon className="h-full w-full" variant="color" />
        </div>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent py-3 pr-2 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none"
      />

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 pr-2.5">
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}

        {showFilterButton && onFilterClick && (
          <button
            type="button"
            onClick={onFilterClick}
            aria-label="Filters"
            className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        )}

        {onSearch && query && (
          <button
            type="button"
            onClick={() => onSearch(query)}
            aria-label="Submit search"
            className="grid h-7 w-7 place-items-center rounded-lg bg-[#F06524] text-white hover:bg-[#E05310] transition active:scale-95 shadow-xs"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
