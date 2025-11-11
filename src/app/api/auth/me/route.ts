import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('user_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as {
      userId: string
      email: string
      fullName: string
    }

    // Get user from database (only if active)
    const user = await prisma.user.findFirst({
      where: { 
        id: decoded.userId,
        status: 'active'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        prefix: true,
        suffix: true,
        preferredName: true,
        maidenName: true,
        pronouns: true,
        title: true,
        company: true,
        department: true,
        affiliation: true,
        headline: true,
        accreditations: true,
        emailLink: true,
        phoneLink: true,
        location: true,
        cardName: true,
        cardType: true,
        selectedDesign: true,
        selectedColor: true,
        selectedFont: true,
        profileImage: true,
        bannerImage: true,
        bio: true,
        status: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or account is deleted' },
        { status: 404 }
      )
    }

   // console.log('🔍 Auth API: Returning user data:', user);
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
