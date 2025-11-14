import { NextResponse } from 'next/server'

// Redirect to the proper connections endpoint
export async function GET() {
  return NextResponse.json({ 
    message: 'Connection API moved to /api/users/connections',
    redirect: '/api/users/connections'
  }, { status: 301 })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Connection API moved to /api/users/connections',
    redirect: '/api/users/connections'
  }, { status: 301 })
}