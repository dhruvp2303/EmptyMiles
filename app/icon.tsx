import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B192C',
          borderRadius: '8px',
          border: '1px solid #F06524',
          position: 'relative',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Speed Streaks */}
          <path d="M4 25 H15 L13 28 H2 Z" fill="#38BDF8" />
          <path d="M1 31 H12 L10 34 H0 Z" fill="#38BDF8" />
          <path d="M5 37 H16 L14 40 H3 Z" fill="#38BDF8" />

          {/* Highway Road */}
          <path d="M6 55 L26 39 H42 L24 55 Z" fill="#F06524" />
          <path d="M14 52 L19 48 H22 L17 52 Z" fill="#FFFFFF" />

          {/* Orange Cargo Container */}
          <path d="M17 19 L40 12 V40 H17 Z" fill="#F06524" />
          <path d="M22 18 V39.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M27 16.5 V39.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 15 V39.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M37 13.5 V39.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          {/* Truck Cab */}
          <path d="M40 12 L50 14 C53 14.5 56 17 58 21 L62 31 C63 33 63.5 35 63.5 37 V42 H40 V12 Z" fill="#FFFFFF" />
          <path d="M50 17 L57 23 C58 24 58.5 26 59 28 H47 V17 H50 Z" fill="#0B192C" />
          <polygon points="61.5,32 63.5,32.5 63,34.5 61,34" fill="#FFD200" />

          {/* Wheels */}
          <circle cx="24" cy="43" r="5" fill="#060E18" />
          <circle cx="24" cy="43" r="2.5" fill="#FFFFFF" />
          <circle cx="53" cy="43" r="5.5" fill="#060E18" />
          <circle cx="53" cy="43" r="2.8" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
