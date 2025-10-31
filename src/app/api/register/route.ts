// This route is deprecated. Use /api/auth/signup instead.
// Keeping for backward compatibility - redirects to centralized auth route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.warn('⚠️ /api/register is deprecated. Please use /api/auth/signup instead.')
  
  // Forward to the centralized auth endpoint
  const body = await req.json()
  const response = await fetch(`${req.nextUrl.origin}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
