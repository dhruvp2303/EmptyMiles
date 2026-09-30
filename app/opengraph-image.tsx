import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'EmptyMiles: Turn Unused Truck Capacity Into Revenue'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B192C',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #1E3E62 0%, #0B192C 70%)',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Glowing border accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid rgba(240, 101, 36, 0.3)',
            borderRadius: 24,
          }}
        />

        {/* Cargo Truck Illustration Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0F243E 0%, #1E3E62 100%)',
            border: '2px solid #F06524',
            borderRadius: 32,
            padding: '24px 36px',
            marginBottom: 24,
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          <svg
            width="140"
            height="100"
            viewBox="0 0 100 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Speed Streaks */}
            <path d="M6 31 H22 L19 34.5 H3 Z" fill="#38BDF8" />
            <path d="M1 38 H18 L15 41.5 H0 Z" fill="#38BDF8" />
            <path d="M8 45 H23 L20 48.5 H5 Z" fill="#38BDF8" />

            {/* Highway Road */}
            <path d="M8 68 L36 49 H58 L32 68 Z" fill="#F06524" />
            <path d="M18 64.5 L24 60.5 H28 L22 64.5 Z" fill="#FFFFFF" />
            <path d="M32 58 L38 54 H41 L35 58 Z" fill="#FFFFFF" />

            {/* Orange Cargo Container */}
            <path d="M24 24.5 L58 15.5 V49.5 H24 Z" fill="#F06524" />
            <path d="M30 23.5 V49" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M36 21.8 V49" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M42 20.2 V49" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M48 18.5 V49" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M54 16.8 V49" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cab */}
            <path d="M58 15.5 L73 17.5 C77 18 80.5 21.5 83 26 L91 39 C92.2 41 93 43 93 45.5 V52 H58 V15.5 Z" fill="#FFFFFF" />
            <path d="M72 20 L81.5 27 C83 28.5 84 31 84.5 33.5 H69 V20 H72 Z" fill="#0B192C" />
            <polygon points="90.5,39 93.5,39.5 93,42 90,41.5" fill="#FFD200" />

            {/* Wheels */}
            <circle cx="34" cy="53.5" r="7.5" fill="#060E18" />
            <circle cx="34" cy="53.5" r="4" fill="#FFFFFF" />
            <circle cx="76" cy="53.5" r="8.5" fill="#060E18" />
            <circle cx="76" cy="53.5" r="4.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Brand Name */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 64, fontWeight: 900, letterSpacing: '-0.03em' }}>
          <span>Empty</span>
          <span style={{ color: '#F06524', marginLeft: 4 }}>Miles</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#FF9F43',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 8,
          }}
        >
          More Capacity. More Earnings.
        </div>

        {/* Value Prop Description */}
        <div
          style={{
            fontSize: 20,
            color: '#CBD5E1',
            maxWidth: 760,
            textAlign: 'center',
            marginTop: 18,
            lineHeight: 1.4,
          }}
        >
          India&apos;s Smart Highway Freight &amp; Return Load Network. Turn unused truck space into revenue.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
