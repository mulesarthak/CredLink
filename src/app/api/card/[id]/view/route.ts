import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Increment view count for a card
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;

    // Check if card exists
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      select: { id: true, views: true }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Increment views count
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
