// This route is deprecated. Use /api/auth/login instead.
// Keeping for backward compatibility - redirects to centralized auth route
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as {
      email?: string
      password?: string
    }

    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json({ error: 'email and password are required' }, { status: 400 })
    }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } })
 console.log("Login attempt for user:", user);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ userId: user.id, email: user.email })
    if(!token){
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      },
      token,
    })
  } catch (err: any) {
    // Handle common Prisma connectivity issues more gracefully
    const code = err?.code
    if (code === 'P1001') {
      // Database unreachable
      return NextResponse.json({
        error: 'Database is unreachable. Please try again shortly.'
      }, { status: 503 })
    }
    if (code === 'P2024') {
      // Timed out fetching a new connection from the pool
      return NextResponse.json({
        error: 'Service is busy. Please retry in a moment.'
      }, { status: 503 })
    }
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
