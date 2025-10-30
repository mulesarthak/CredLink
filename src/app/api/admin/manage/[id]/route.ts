import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

// Update admin
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as {
      adminId: string
      role: string
      permissions: string[]
    }

    // Only SUPER_ADMIN can update admins
    if (decoded.role !== 'SUPER_ADMIN' && !decoded.permissions.includes('MANAGE_ADMINS')) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const { role, permissions, isActive } = body

    // Prevent modifying super admin
    const targetAdmin = await prisma.admin.findUnique({
      where: { id }
    })

    if (!targetAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    if (targetAdmin.role === 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: "Cannot modify super admin" },
        { status: 403 }
      )
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        role,
        permissions: JSON.stringify(permissions),
        isActive
      }
    })

    return NextResponse.json({
      success: true,
      admin: {
        id: updatedAdmin.id,
        email: updatedAdmin.email,
        fullName: updatedAdmin.fullName,
        role: updatedAdmin.role,
        permissions: JSON.parse(updatedAdmin.permissions),
        isActive: updatedAdmin.isActive
      }
    })
  } catch (error) {
    console.error("Update admin error:", error)
    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 })
  }
}

// Delete admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as {
      adminId: string
      role: string
      permissions: string[]
    }

    // Only SUPER_ADMIN can delete admins
    if (decoded.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Prevent deleting super admin
    const targetAdmin = await prisma.admin.findUnique({
      where: { id }
    })

    if (!targetAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    if (targetAdmin.role === 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: "Cannot delete super admin" },
        { status: 403 }
      )
    }

    // Prevent self-deletion
    if (targetAdmin.id === decoded.adminId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 403 }
      )
    }

    // Delete admin sessions first
    await prisma.adminSession.deleteMany({
      where: { adminId: id }
    })

    // Delete admin
    await prisma.admin.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: "Admin deleted successfully" })
  } catch (error) {
    console.error("Delete admin error:", error)
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 })
  }
}
