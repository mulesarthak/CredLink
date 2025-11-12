import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple JWT decode function (without verification for now)
function decodeJWT(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = parts[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('user_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Decode JWT token to get user info
    const decoded = decodeJWT(token)
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Return actual user data from the token
    return NextResponse.json({ 
      user: {
        id: decoded.userId,
        email: decoded.email,
        fullName: decoded.fullName,
        phone: decoded.phone || null,
        username: decoded.username || null,
        profileImage: decoded.profileImage || null
      }
    })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
