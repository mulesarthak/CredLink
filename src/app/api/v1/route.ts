import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'v1 API' })
}
