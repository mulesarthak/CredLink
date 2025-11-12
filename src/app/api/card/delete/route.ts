import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

/**
 * DELETE /api/card/delete
 * Body: { cardId: string }
 * Auth: Cookie-based (user_token)
 *
 * JWT must contain { userId }.
 */
async function handleDelete(req: NextRequest) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("user_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - Please login to delete cards" },
                { status: 401 }
            );
        }

        // Verify token
        let payload: any;
        try {
            payload = verify(token, JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        const userId = payload.userId || payload.sub;
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid user" },
                { status: 401 }
            );
        }

        // Get card ID from body
        const body = await req.json().catch(() => null);
        const cardId = body?.cardId || body?.id;
        
        if (!cardId || typeof cardId !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid cardId" },
                { status: 400 }
            );
        }

        // Check if card exists and belongs to user
        const existingCard = await prisma.card.findUnique({
            where: { id: cardId },
            select: { userId: true },
        });

        if (!existingCard) {
            return NextResponse.json(
                { error: "Card not found" },
                { status: 404 }
            );
        }

        if (existingCard.userId !== userId) {
            return NextResponse.json(
                { error: "Unauthorized - You don't have permission to delete this card" },
                { status: 403 }
            );
        }

        // Delete the card
        await prisma.card.delete({
            where: { id: cardId },
        });

        return NextResponse.json({
            success: true,
            message: "Card deleted successfully",
        });
    } catch (err: any) {
        console.error("Error deleting card:", err);
        return NextResponse.json(
            { error: err.message || "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    return handleDelete(req);
}

export async function POST(req: NextRequest) {
    return handleDelete(req);
}