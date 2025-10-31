// This route is deprecated. Use /api/auth/logout instead.
// Keeping for backward compatibility - redirects to centralized auth route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.warn('⚠️ /api/logout is deprecated. Please use /api/auth/logout instead.')
  
  // Forward to the centralized auth endpoint
  const response = await fetch(`${req.nextUrl.origin}/api/auth/logout`, {
    method: 'POST'
  })
  
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
