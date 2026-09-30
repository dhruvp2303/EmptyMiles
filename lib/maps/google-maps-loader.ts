import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

export type MapsAuthStatus = 'loading' | 'authenticated' | 'demo_mode' | 'invalid_key' | 'error'

const STORAGE_KEY = 'EMPTYMILES_GOOGLE_MAPS_KEY'

let isOptionsConfigured = false
let loadPromise: Promise<typeof google | null> | null = null
let currentAuthStatus: MapsAuthStatus = 'loading'

/**
 * Get active Google Maps API Key from LocalStorage override or Environment Variable
 */
export function getActiveGoogleMapsApiKey(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored.trim().length > 0) {
      return stored.trim()
    }
  }
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
}

/**
 * Store a custom developer / transporter API key in localStorage
 */
export function setStoredGoogleMapsApiKey(key: string): void {
  if (typeof window === 'undefined') return
  if (!key || key.trim() === '') {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim())
  }
  // Reset load promise to allow re-initialization
  isOptionsConfigured = false
  loadPromise = null
}

/**
 * Check if the active key is a known placeholder
 */
export function isPlaceholderKey(key: string): boolean {
  if (!key) return true
  const lower = key.toLowerCase()
  return (
    lower.includes('placeholder') ||
    lower.includes('aizasyplaceholder') ||
    key === 'YOUR_API_KEY' ||
    key.length < 15
  )
}

/**
 * Get current cached authentication status
 */
export function getMapsAuthStatus(): MapsAuthStatus {
  const key = getActiveGoogleMapsApiKey()
  if (!key || isPlaceholderKey(key)) {
    return 'demo_mode'
  }
  return currentAuthStatus
}

/**
 * Loads the Google Maps Javascript API instance cleanly
 */
export async function loadGoogleMaps(): Promise<typeof google | null> {
  if (typeof window === 'undefined') return null

  // If already loaded in window
  if (window.google && window.google.maps) {
    currentAuthStatus = 'authenticated'
    return window.google
  }

  const apiKey = getActiveGoogleMapsApiKey()

  if (!apiKey || isPlaceholderKey(apiKey)) {
    currentAuthStatus = 'demo_mode'
    return null
  }

  if (loadPromise) {
    return loadPromise
  }

  loadPromise = (async () => {
    try {
      if (!isOptionsConfigured) {
        setOptions({
          key: apiKey,
          v: 'weekly',
          libraries: ['places', 'geometry', 'routes', 'marker'],
        })
        isOptionsConfigured = true
      }

      await Promise.all([
        importLibrary('maps'),
        importLibrary('places'),
        importLibrary('geometry'),
        importLibrary('routes'),
        importLibrary('marker'),
      ])

      currentAuthStatus = 'authenticated'
      return window.google
    } catch (error: any) {
      console.warn('[Google Maps Loader] Failed to load official API, falling back to simulated GIS engine:', error)
      currentAuthStatus = error?.message?.includes('InvalidKey') ? 'invalid_key' : 'error'
      return null
    }
  })()

  return loadPromise
}

/**
 * Tests an API Key by attempting a lightweight Geocoding fetch or initialization
 */
export async function testGoogleMapsApiKey(testKey: string): Promise<{ success: boolean; message: string; services?: string[] }> {
  if (!testKey || isPlaceholderKey(testKey)) {
    return {
      success: false,
      message: 'The provided API key is empty or is a placeholder.',
    }
  }

  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Ahmedabad,Gujarat&key=${encodeURIComponent(testKey)}`)
    const data = await res.json()

    if (data.status === 'OK') {
      return {
        success: true,
        message: 'Google Maps Geocoding & Platform API key is active and authenticated successfully!',
        services: ['Maps JavaScript API', 'Geocoding API', 'Places API', 'Directions API', 'Distance Matrix API'],
      }
    } else if (data.status === 'REQUEST_DENIED') {
      return {
        success: false,
        message: `API Key Rejected by Google: ${data.error_message || 'Request Denied. Ensure Geocoding and Maps APIs are enabled.'}`,
      }
    } else {
      return {
        success: true,
        message: `Key reachable with status: ${data.status}`,
      }
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Network or CORS test failed: ${err.message || 'Check network connection'}`,
    }
  }
}
