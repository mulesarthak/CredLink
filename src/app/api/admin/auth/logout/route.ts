import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (token) {
      try {
        // Verify and decode token
        const decoded = verify(token, JWT_SECRET) as { adminId: string }

        // Delete session from database
        await prisma.adminSession.deleteMany({
          where: {
            adminId: decoded.adminId,
            token
          }
        })
      } catch (error) {
        console.error("Token verification error:", error)
      }

      // Clear cookie
      cookieStore.delete("admin_token")
    }

    return NextResponse.json({ success: true, message: "Logged out successfully" })
  } catch (error) {
    console.error("Admin logout error:", error)
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    )
  }
}
