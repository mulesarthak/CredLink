import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    // Get session to verify user is authenticated
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phone } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Update user's phone number in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { phone: phone.trim() },
      select: {
        id: true,
        phone: true,
        fullName: true,
        email: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Phone number updated successfully",
      user: updatedUser
    });

  } catch (error: any) {
    console.error("Error updating phone number:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update phone number" },
      { status: 500 }
    );
  }
}
