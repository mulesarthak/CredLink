import { NextRequest, NextResponse } from 'next/server'

// Profile creation is not needed - user is created during signup
// Use /api/profile/update to add remaining profile information
export async function POST(req: NextRequest) {
  return NextResponse.json({ 
    ok: false, 
    error: 'Profile creation not supported. User is created during signup. Use PUT /api/profile/update to update profile information.' 
  }, { status: 400 })
}
