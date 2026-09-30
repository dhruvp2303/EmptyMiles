import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'color' | 'mono' | 'light'
}

/**
 * EmptyMiles Official Cargo Truck Emblem
 * Features:
 * - Dynamic aerodynamic logistics truck carrying high-capacity ribbed cargo container
 * - Highway corridor road perspective with center lane markers
 * - Aerodynamic speed streaks representing zero-empty-miles rapid transit
 * - No background 'E' letter, focused purely on cargo capacity & logistics speed
 * - Adaptable to UI themes (Color / Light on dark / Monochrome)
 */
export function CargoTruckIcon({
  className,
  variant = 'color',
}: LogoProps) {
  const isLight = variant === 'light'
  const isMono = variant === 'mono'

  // Colors aligned with the EmptyMiles UI design tokens
  const navyColor = isLight ? '#FFFFFF' : isMono ? 'currentColor' : '#0B192C'
  const navyLightColor = isLight ? '#94A3B8' : isMono ? 'currentColor' : '#1E3E62'
  const orangeColor = isMono ? 'currentColor' : '#F06524'
  const orangeLightColor = isMono ? 'currentColor' : '#FF7E3E'
  const roadColor = isLight ? '#334155' : isMono ? 'currentColor' : '#0B192C'
  const roadMarkColor = isLight ? '#F06524' : isMono ? 'currentColor' : '#F06524'
  const windowColor = isLight ? '#0B192C' : isMono ? '#FFFFFF' : '#E2E8F0'
  const rimColor = isLight ? '#0B192C' : isMono ? '#FFFFFF' : '#FFFFFF'

  const id = React.useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 select-none', className)}
      role="img"
      aria-label="EmptyMiles Cargo Truck Logo"
    >
      <defs>
        {/* Cargo Container Gradient */}
        <linearGradient id={`cargo-grad-${id}`} x1="16" y1="20" x2="62" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={orangeLightColor} />
          <stop offset="100%" stopColor={orangeColor} />
        </linearGradient>

        {/* Cab Gradient */}
        <linearGradient id={`cab-grad-${id}`} x1="58" y1="22" x2="94" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={navyLightColor} />
          <stop offset="100%" stopColor={navyColor} />
        </linearGradient>

        {/* Road Gradient */}
        <linearGradient id={`road-grad-${id}`} x1="6" y1="72" x2="60" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={orangeColor} />
          <stop offset="100%" stopColor={orangeLightColor} />
        </linearGradient>

        {/* Speed Streaks Gradient */}
        <linearGradient id={`speed-grad-${id}`} x1="2" y1="36" x2="24" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={navyLightColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={navyLightColor} />
        </linearGradient>
      </defs>

      {/* Speed & Aerodynamic Motion Trails */}
      <g opacity={isMono ? 0.6 : 0.9}>
        <path
          d="M6 31 H22 L19 34.5 H3 Z"
          fill={isMono ? 'currentColor' : `url(#speed-grad-${id})`}
        />
        <path
          d="M1 38 H18 L15 41.5 H0 Z"
          fill={isMono ? 'currentColor' : isLight ? '#64748B' : navyColor}
        />
        <path
          d="M8 45 H23 L20 48.5 H5 Z"
          fill={isMono ? 'currentColor' : `url(#speed-grad-${id})`}
        />
      </g>

      {/* Highway Road Perspective Corridor */}
      <path
        d="M8 68 L36 49 H58 L32 68 Z"
        fill={`url(#road-grad-${id})`}
      />
      {/* Highway Dashed Lane Markings */}
      <path
        d="M18 64.5 L24 60.5 H28 L22 64.5 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <path
        d="M32 58 L38 54 H41 L35 58 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <path
        d="M44 52.5 L48 50 H50.5 L46.5 52.5 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Heavy-Duty Cargo Container (Orange Ribbed Freight Box) */}
      <g>
        {/* Main Container Shell */}
        <path
          d="M24 24.5 L58 15.5 V49.5 H24 Z"
          fill={`url(#cargo-grad-${id})`}
        />
        {/* Container Top Chamfer / Roof Trim */}
        <path
          d="M24 24.5 L58 15.5 L58 17.5 L24 26 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
        {/* Vertical Cargo Ribs (Industrial Fluting) */}
        <path d="M30 23.5 V49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M36 21.8 V49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M42 20.2 V49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M48 18.5 V49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M54 16.8 V49" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

        {/* Base Rail / Chassis Mount */}
        <path
          d="M23 49 H58 V52 H23 Z"
          fill={navyColor}
        />
      </g>

      {/* Aerodynamic Truck Cab (Navy Blue & Sleek Accents) */}
      <g>
        {/* Cab Body */}
        <path
          d="M58 15.5 L73 17.5 C77 18 80.5 21.5 83 26 L91 39 C92.2 41 93 43 93 45.5 V52 H58 V15.5 Z"
          fill={`url(#cab-grad-${id})`}
        />

        {/* Windshield Window */}
        <path
          d="M72 20 L81.5 27 C83 28.5 84 31 84.5 33.5 H69 V20 H72 Z"
          fill={windowColor}
        />
        {/* Side Passenger / Driver Window */}
        <path
          d="M62 20 H66.5 V33.5 H62 V20 Z"
          fill={windowColor}
        />

        {/* Front Grille Slats */}
        <path
          d="M87 41 H92 V43.5 H87 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M86 45 H91.5 V47.5 H86 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* High-Visibility Headlight */}
        <polygon
          points="90.5,39 93.5,39.5 93,42 90,41.5"
          fill={isMono ? 'currentColor' : '#FFD200'}
        />

        {/* Rear Wheel (Under Chassis) */}
        <g>
          <circle cx="34" cy="53.5" r="7.5" fill={navyColor} />
          <circle cx="34" cy="53.5" r="4.2" fill={rimColor} />
          <circle cx="34" cy="53.5" r="2" fill={navyColor} />
        </g>

        {/* Front Cab Wheel */}
        <g>
          <circle cx="76" cy="53.5" r="8.5" fill={navyColor} />
          <circle cx="76" cy="53.5" r="4.8" fill={rimColor} />
          <circle cx="76" cy="53.5" r="2.2" fill={navyColor} />
        </g>
      </g>
    </svg>
  )
}

/**
 * EmptyMiles Official Vector Logo Mark (Square Badge or Standalone)
 */
export function LogoMark({
  className,
  variant = 'color',
  badge = true,
}: {
  className?: string
  variant?: 'color' | 'mono' | 'light'
  badge?: boolean
}) {
  const isLight = variant === 'light'
  const isMono = variant === 'mono'

  if (!badge) {
    return <CargoTruckIcon className={className} variant={variant} />
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-2xl p-1.5 shadow-sm overflow-hidden select-none transition-transform duration-200',
        isLight
          ? 'bg-white/10 backdrop-blur-md border border-white/20'
          : isMono
          ? 'bg-slate-900 border border-slate-700'
          : 'bg-gradient-to-br from-[#0B192C] via-[#0F243E] to-[#1E3E62] border border-[#2563EB]/20 shadow-navy-950/20',
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#F06524]/20 rounded-full blur-lg pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#2563EB]/20 rounded-full blur-lg pointer-events-none" />

      <CargoTruckIcon
        className="w-full h-full transform scale-105"
        variant={isLight ? 'light' : variant}
      />
    </div>
  )
}

/**
 * EmptyMiles Wordmark with cohesive typography and optional cargo truck emblem
 */
export function Wordmark({
  className,
  onDark = false,
  showMark = true,
  subtitle,
  size = 'md',
}: {
  className?: string
  onDark?: boolean
  showMark?: boolean
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeMap = {
    sm: {
      mark: 'h-7 w-7',
      text: 'text-lg',
      sub: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      mark: 'h-9 w-9',
      text: 'text-xl',
      sub: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      mark: 'h-12 w-12',
      text: 'text-2xl sm:text-3xl',
      sub: 'text-xs',
      gap: 'gap-3',
    },
  }

  const s = sizeMap[size]

  return (
    <div className={cn('inline-flex items-center select-none', s.gap, className)}>
      {showMark && (
        <LogoMark
          variant={onDark ? 'light' : 'color'}
          className={cn(s.mark, 'shrink-0')}
          badge={true}
        />
      )}
      <div className="flex flex-col justify-center">
        <span className="flex items-baseline tracking-tight font-sans font-black leading-none">
          <span
            className={cn(
              s.text,
              'font-black transition-colors',
              onDark ? 'text-white' : 'text-[#0B192C]'
            )}
          >
            Empty
          </span>
          <span className={cn(s.text, 'font-black text-[#F06524] drop-shadow-sm')}>
            Miles
          </span>
        </span>
        {subtitle && (
          <span
            className={cn(
              s.sub,
              'font-semibold tracking-wider uppercase mt-1 transition-colors',
              onDark ? 'text-slate-300' : 'text-slate-500'
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * EmptyMiles Full Brand Identity with Tagline
 * Ideal for Hero banners, Splash screens, and Auth pages
 */
export function LogoFull({
  className,
  onDark = false,
  showTagline = true,
  tagline = 'More Capacity. More Earnings.',
}: {
  className?: string
  onDark?: boolean
  showTagline?: boolean
  tagline?: string
}) {
  return (
    <div className={cn('flex flex-col items-center text-center select-none', className)}>
      {/* High-Resolution Standalone Cargo Truck Emblem */}
      <div className="relative group">
        <div className="w-28 h-24 sm:w-36 sm:h-28 flex items-center justify-center p-2 rounded-3xl bg-gradient-to-br from-[#0B192C] to-[#1E3E62] border border-white/10 shadow-2xl transition-all duration-300 group-hover:scale-105">
          <CargoTruckIcon
            className="w-full h-full"
            variant={onDark ? 'light' : 'color'}
          />
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="mt-4 font-sans text-3xl sm:text-4xl font-black tracking-tight leading-none">
        <span className={onDark ? 'text-white' : 'text-[#0B192C]'}>Empty</span>
        <span className="text-[#F06524]">Miles</span>
      </h1>

      {/* Tagline */}
      {showTagline && (
        <p
          className={cn(
            'mt-2 text-xs sm:text-sm font-semibold tracking-wide',
            onDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {tagline}
        </p>
      )}
    </div>
  )
}
