import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key';

// GET all cards for authenticated user
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string };

    // Fetch all cards for the user
    const cards = await prisma.card.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true,
      cards,
      count: cards.length
    });

  } catch (error: any) {
    console.error("Error fetching cards:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to fetch cards" 
    }, { status: 500 });
  }
}
