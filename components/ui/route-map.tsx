import { cn } from '@/lib/utils'

export function RouteMap({
  dark = false,
  progress = 0.65,
  className,
  truck = false,
  originLabel = 'Ahmedabad',
  destinationLabel = 'Surat',
  intermediateLabel = 'Bharuch Dock',
}: {
  dark?: boolean
  progress?: number
  className?: string
  truck?: boolean
  originLabel?: string
  destinationLabel?: string
  intermediateLabel?: string
}) {
  const path = 'M 40 210 C 110 160, 90 90, 175 90 S 300 140, 360 70'
  const t = Math.max(0, Math.min(1, progress))
  const px = 40 + (360 - 40) * t
  const py = 210 - Math.sin(t * Math.PI) * 120

  return (
    <svg
      viewBox="0 0 400 260"
      className={cn('h-full w-full select-none', className)}
      role="img"
      aria-label="EmptyMiles route telemetry map"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="260" fill={dark ? '#0B1730' : '#EEF2F9'} />

      {/* Grid lines and geographic block textures */}
      <g stroke={dark ? '#18274A' : '#DBE3F1'} strokeWidth="1.2">
        <path d="M0 60 H400 M0 130 H400 M0 195 H400" />
        <path d="M90 0 V260 M200 0 V260 M310 0 V260" />
      </g>
      <g fill={dark ? '#111E3B' : '#E2E9F5'}>
        <rect x="95" y="18" width="65" height="32" rx="6" />
        <rect x="225" y="145" width="75" height="42" rx="6" />
        <rect x="25" y="145" width="50" height="36" rx="6" />
        <rect x="310" y="15" width="55" height="28" rx="6" />
      </g>

      {/* Highway route track */}
      <path d={path} fill="none" stroke={dark ? '#223660' : '#C3CCDD'} strokeWidth="8" strokeLinecap="round" />
      <path
        d={path}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="400"
        strokeDashoffset={400 - 400 * t}
      />
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B1A" />
          <stop offset="100%" stopColor="#FF8A3D" />
        </linearGradient>
      </defs>

      {/* Intermediate Detour Waypoint */}
      <g transform="translate(175 90)">
        <circle r="6" fill="#FF8A3D" stroke="#FFFFFF" strokeWidth="2" />
        <text x="0" y="-10" textAnchor="middle" fill={dark ? '#94A3B8' : '#475569'} fontSize="9" fontWeight="600">
          {intermediateLabel}
        </text>
      </g>

      {/* Origin Marker */}
      <g transform="translate(40 210)">
        <circle r="9" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle r="3.5" fill="#FFFFFF" />
        <text x="0" y="20" textAnchor="middle" fill={dark ? '#CBD5E1' : '#1E293B'} fontSize="10" fontWeight="700">
          {originLabel}
        </text>
      </g>

      {/* Destination Marker */}
      <g transform="translate(360 70)">
        <path
          d="M0 -16 C 8 -16 14 -9 14 -1 C 14 7 0 17 0 17 C 0 17 -14 7 -14 -1 C -14 -9 -8 -16 0 -16 Z"
          fill="#FF6B1A"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <circle cx="0" cy="-1" r="4" fill="#FFFFFF" />
        <text x="0" y="30" textAnchor="middle" fill={dark ? '#CBD5E1' : '#1E293B'} fontSize="10" fontWeight="700">
          {destinationLabel}
        </text>
      </g>

      {/* Live Truck Marker with Heading Radar */}
      {truck && (
        <g transform={`translate(${px} ${py})`}>
          <circle r="22" fill="#FF6B1A" opacity="0.2" className="animate-ping" />
          <circle r="14" fill="#0B1730" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Truck vector silhouette */}
          <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#FF6B1A" />
          <rect x="2" y="-3" width="4" height="6" rx="1" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  )
}
