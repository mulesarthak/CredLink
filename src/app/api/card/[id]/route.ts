import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single card by ID (public)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;

    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
          }
        }
      }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Increment views count (use raw query as views field might not be in types yet)
    await prisma.$executeRaw`UPDATE cards SET views = views + 1 WHERE id = ${cardId}`;

    return NextResponse.json({ 
      success: true,
      card: {
        ...card,
        views: ((card as any).views || 0) + 1
      }
    });

  } catch (error: any) {
    console.error("Error fetching card:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to fetch card" 
    }, { status: 500 });
  }
}
