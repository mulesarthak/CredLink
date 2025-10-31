import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    console.log("Admin token from cookie:", token ? "EXISTS" : "NOT FOUND")
    if (token) {
      console.log("🔍 Token from cookie (first 20 chars):", token.substring(0, 20))
    }
    console.log("All cookies:", cookieStore.getAll().map(c => c.name))

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Verify token
    let decoded
    try {
      decoded = verify(token, JWT_SECRET) as {
        adminId: string
        email: string
        role: string
        permissions: string[]
      }
      console.log("✅ Token verified for admin:", decoded.email)
    } catch (err) {
      console.error("❌ Token verification failed:", err)
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    // Check if session exists in database
    console.log("🔎 Looking up session with token (first 20 chars):", token.substring(0, 20))
    
    const session = await prisma.adminSession.findUnique({
      where: { token }
    })

    console.log("Session lookup:", session ? "FOUND" : "NOT FOUND")
    if (session) {
      console.log("Session ID:", session.id)
      console.log("Session expires at:", session.expiresAt)
      console.log("Current time:", new Date())
    } else {
      // Check if ANY sessions exist
      const allSessions = await prisma.adminSession.findMany()
      console.log("Total sessions in DB:", allSessions.length)
      if (allSessions.length > 0) {
        console.log("First session token (first 20 chars):", allSessions[0].token.substring(0, 20))
        console.log("🔬 Token from cookie length:", token.length)
        console.log("🔬 Token from DB length:", allSessions[0].token.length)
        console.log("🔬 Tokens match:", token === allSessions[0].token)
        
        // Compare character by character to find where they differ
        for (let i = 0; i < Math.min(token.length, allSessions[0].token.length); i++) {
          if (token[i] !== allSessions[0].token[i]) {
            console.log(`🔬 First difference at position ${i}:`)
            console.log(`   Cookie: "${token.substring(Math.max(0, i-5), i+15)}"`)
            console.log(`   DB:     "${allSessions[0].token.substring(Math.max(0, i-5), i+15)}"`)
            break
          }
        }
      }
    }

    if (!session || session.expiresAt < new Date()) {
      console.log("❌ Session invalid or expired")
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      )
    }

    // Get admin details
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId }
    })

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: "Admin account not found or inactive" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: JSON.parse(admin.permissions)
      }
    })
  } catch (error) {
    console.error("Admin auth check error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    )
  }
}
