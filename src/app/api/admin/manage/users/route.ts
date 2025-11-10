import { NextRequest, NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json()
        const user = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                password: data.password,
                isActive: data.isActive
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}
