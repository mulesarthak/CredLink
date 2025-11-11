import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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

    // For now, return mock user data to test the flow
    // TODO: Add JWT verification and database lookup
    return NextResponse.json({ 
      user: {
        id: 'mock-id',
        email: 'jaydhurve09@gmail.com',
        fullName: 'Jay D',
        phone: null,
        username: 'jayd'
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
