import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let decoded: any
  try {
    decoded = verifyToken(token)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json().catch(() => ({}))

  // TODO: Persist profile data using Prisma once Profile model is available
  return NextResponse.json({ ok: true, resource: 'profile', action: 'create', userId: decoded.userId, data })
}
