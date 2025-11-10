import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

// Get all users
export async function GET() {
  try {
    console.log('🔍 GET /api/users - Starting...');
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    console.log('🍪 Admin token:', token ? 'Present' : 'Missing');

    if (!token) {
      console.log('❌ No admin token found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as {
      adminId: string
      role: string
      permissions: string[]
    }

    console.log('✅ Decoded token:', decoded);

    // Check if admin has permission to view users
    if (!decoded.adminId) {
      console.log('❌ No adminId in token');
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    console.log('📊 Fetching users from database...');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`✅ Found ${users.length} users`);
    return NextResponse.json({ users })
  } catch (error) {
    console.error('❌ Get users error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}))
  return NextResponse.json({ ok: true, resource: 'users', created: data })
}
