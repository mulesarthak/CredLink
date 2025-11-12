import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PATCH(
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

    if (!decoded.adminId) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Check for MANAGE_USERS permission or SUPER_ADMIN role
    if (decoded.role !== 'SUPER_ADMIN' && !decoded.permissions.includes('MANAGE_USERS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const { fullName, phone, password, status, action } = body

    // Prepare update data
    const updateData: any = {}
    
    if (fullName) updateData.fullName = fullName
    if (phone) updateData.phone = phone
    
    // Handle password change
    if (password && password.trim()) {
      // Validate password length
      if (password.trim().length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
      }
      updateData.password = await hash(password, 12)
    }
    
    // Handle status changes (block/unblock)
    if (action === 'block') {
      updateData.status = 'blocked'
    } else if (action === 'unblock') {
      updateData.status = 'active'
    } else if (status) {
      updateData.status = status
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        phone: updatedUser.phone,
      }
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
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

    // Only SUPER_ADMIN can delete users
    if (decoded.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Soft delete: Set status to inactive instead of deleting
    await prisma.user.update({
      where: { id },
      data: { status: 'inactive' }
    })

    return NextResponse.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
