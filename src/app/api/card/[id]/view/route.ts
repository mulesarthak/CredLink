import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// POST - Increment view count for a card
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;

    // Fetch card with owner for comparison
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      select: { id: true, views: true, userId: true }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Get current session token (if any)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If the viewer is the owner, do NOT increment
    if (token?.id && token.id === card.userId) {
      return NextResponse.json({ success: true, message: 'Owner view ignored' });
    }

    // Increment views count for any other viewer
    await prisma.$executeRaw`UPDATE cards SET views = views + 1 WHERE id = ${cardId}`;

    return NextResponse.json({ 
      success: true,
      message: 'View count incremented'
    });

  } catch (error: any) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to increment view count" 
    }, { status: 500 });
  }
}
