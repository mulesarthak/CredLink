import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, resource: 'users', items: [] })
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}))
  return NextResponse.json({ ok: true, resource: 'users', created: data })
}
