
import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as {
      email?: string
      password?: string
      fullName?: string
      phone?: string | null
    }

    const { email, password, fullName, phone } = body
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'email, password, and fullName are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        fullName,
        phone: phone || null,
      },
      select: { id: true, email: true, fullName: true, phone: true, createdAt: true },
    })

    const token = await signToken({ userId: user.id, email: user.email })
    if(!token){
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, user, token}, { status: 201 })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
