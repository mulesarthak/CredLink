import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { verifyUserToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('user_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const decoded = verifyUserToken(token)
    if (!decoded || !decoded.userId || !decoded.email) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    const { password } = await request.json()
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashed },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Set password error:', error)
    return NextResponse.json({ error: 'Failed to set password.' }, { status: 500 })
  }
}
