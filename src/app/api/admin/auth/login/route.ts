import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"
const TOKEN_EXPIRY = "7d" // 7 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('🔐 Admin login attempt for:', email)

    if (!email || !password) {
      console.log('❌ Missing email or password')
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim()

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail }
    })

    if (!admin) {
      console.log('❌ Admin not found:', email)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    console.log('✅ Admin found:', admin.email, 'Role:', admin.role)

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { error: "Your account has been deactivated. Please contact the super admin." },
        { status: 403 }
      )
    }

    // Verify password
    console.log('🔑 Verifying password...')
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      console.log('❌ Invalid password for admin:', email)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    console.log('✅ Password verified successfully')

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

    // Parse permissions from JSON
    const permissions = JSON.parse(admin.permissions)

    // Create JWT token
    const token = sign(
      {
        adminId: admin.id,
        email: admin.email,
        role: admin.role,
        permissions
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    )

    // Calculate expiry date
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    // Delete any existing sessions for this admin
    try {
      await prisma.adminSession.deleteMany({
        where: { adminId: admin.id }
      })
      console.log("🗑️ Deleted old sessions for admin:", admin.email)
    } catch (err) {
      console.error("Error deleting old sessions:", err)
    }

    // Store session in database
    try {
      const newSession = await prisma.adminSession.create({
        data: {
          adminId: admin.id,
          token,
          expiresAt
        }
      })
      console.log("💾 Session created in DB:", newSession.id)
      console.log("🔑 Token stored in DB (first 20 chars):", token.substring(0, 20))
    } catch (err) {
      console.error("❌ Failed to create session:", err)
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      )
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    })

    console.log("✅ Admin cookie set successfully for:", admin.email)
    console.log("🍪 Token set in cookie (first 20 chars):", token.substring(0, 20))

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions
      }
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    )
  }
}
