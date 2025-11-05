// This route is deprecated. Use /api/auth/login instead.
// Redirecting to the correct auth endpoint
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  // Redirect to the correct auth endpoint
  const body = await req.json()
  
  // Forward the request to the correct endpoint
  const response = await fetch(new URL('/api/auth/login', req.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  
  return response
}
