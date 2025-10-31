import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return NextResponse.json({ ok: true, resource: 'users', id })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const data = await req.json().catch(() => ({}))
  return NextResponse.json({ ok: true, resource: 'users', id, updated: data })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return NextResponse.json({ ok: true, resource: 'users', id, deleted: true })
}
