import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/app-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://emptymiles.in'),
  title: 'EmptyMiles: Turn Unused Truck Capacity Into Revenue',
  description:
    'EmptyMiles is an intelligent logistics network connecting unused truck capacity with compatible commercial cargo based on route, available tonnage, and timing.',
  keywords: [
    'truck capacity matching',
    'empty miles logistics',
    'freight corridor optimization',
    'indian logistics platform',
    'cargo hunt',
    'part load booking',
  ],
  authors: [{ name: 'EmptyMiles Logistics Technologies' }],
  openGraph: {
    title: 'EmptyMiles: Turn Unused Truck Capacity Into Revenue',
    description:
      'Connect unused truck capacity with verified commercial cargo on your active transit corridor.',
    type: 'website',
    locale: 'en_IN',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EmptyMiles',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}


export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b1730',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <AppProvider>
          {children}
        </AppProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
