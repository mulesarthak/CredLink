import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params
    
    // Find user by username
    const user = await (prisma as any).user.findUnique({
      where: { username },
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
      return NextResponse.json({ 
        ok: false, 
        error: "Profile not found" 
      }, { status: 404 })
    }

    // Optionally increment view count
    await (prisma as any).user.update({
      where: { username },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({ 
      ok: true, 
      data: user 
    })
  } catch (error: any) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ 
      ok: false, 
      error: error.message || "Failed to fetch profile" 
    }, { status: 500 })
  }
}
