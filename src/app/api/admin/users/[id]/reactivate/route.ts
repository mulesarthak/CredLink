import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

// Reactivate a user account (admin only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as {
      adminId: string
      role: string
      permissions: string[]
    }

    // Only SUPER_ADMIN or admins with MANAGE_USERS permission can reactivate
    if (decoded.role !== 'SUPER_ADMIN' && !decoded.permissions.includes('MANAGE_USERS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, fullName: true, status: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.status === 'active') {
      return NextResponse.json({ 
        error: 'User account is already active' 
      }, { status: 400 })
    }

    // Reactivate the account
    const reactivatedUser = await prisma.user.update({
      where: { id },
      data: { status: 'active' }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'User account reactivated successfully',
      user: {
        id: reactivatedUser.id,
        email: reactivatedUser.email,
        fullName: reactivatedUser.fullName,
        status: reactivatedUser.status
      }
    })
  } catch (error) {
    console.error('Reactivate user error:', error)
    return NextResponse.json({ error: 'Failed to reactivate user' }, { status: 500 })
  }
}

