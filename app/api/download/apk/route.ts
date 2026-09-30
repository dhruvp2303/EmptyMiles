import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // If a custom cloud direct download URL is set in environment, redirect to it
  const customUrl = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || process.env.APK_DOWNLOAD_URL
  if (customUrl) {
    return NextResponse.redirect(customUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  }

  // Otherwise, check if EmptyMiles.apk exists in public folder or fallback
  const url = new URL(request.url)
  const directApkUrl = `${url.origin}/EmptyMiles.apk`

  return NextResponse.redirect(directApkUrl, {
    status: 302,
    headers: {
      'Content-Disposition': 'attachment; filename="EmptyMiles.apk"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
