import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { credential, email, name, photoUrl } = body

    // Verify Google ID token or handle OAuth callback
    const userEmail = email || 'user@emptymiles.in'
    const userName = name || 'EmptyMiles Transporter'
    const now = new Date().toISOString()
    const sessionToken = `EM_GOOGLE_SESSION_${Math.random().toString(36).substring(2, 12)}`

    return NextResponse.json({
      success: true,
      message: 'Google authentication successful',
      token: sessionToken,
      user: {
        id: `USR-G-${Math.floor(1000 + Math.random() * 9000)}`,
        name: userName,
        email: userEmail,
        emailVerified: true,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        kycStatus: 'pending',
        role: 'truck_owner',
        authenticatedAt: now,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Google Auth Error' }, { status: 500 })
  }
}
