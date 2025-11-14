import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Retrieve all card connections for the logged-in user
export async function GET(req: NextRequest) {
  try {
    // Get user ID from headers (set by middleware)
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized - User not found' 
      }, { status: 401 });
    }

    // Fetch all card connections where the user is the owner
    // For existing records without ownerUserId, we'll also fetch by card ownership
    const connections = await prisma.cardConnection.findMany({
      where: { 
        OR: [
          { ownerUserId: userId },
          { 
            ownerUserId: null,
            card: { userId: userId }
          }
        ]
      },
      include: {
        card: {
          select: {
            id: true,
            fullName: true,
            cardName: true
          }
        }
      },
      orderBy: { 
        createdAt: 'desc' 
      }
    });

    return NextResponse.json({ 
      success: true,
      contacts: connections,
      count: connections.length
    });

  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to fetch contacts" 
    }, { status: 500 });
  }
}
