import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        // Extract user ID from middleware headers
        const userId = req.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ 
                ok: false, 
                error: "Unauthorized - User not authenticated" 
            }, { status: 401 });
        }

        // Fetch messages for the user
        const messages = await (prisma as any).message.findMany({
            where: {
                receiverId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Get unique sender IDs
        const senderIds = Array.from(new Set(messages.map((msg: any) => msg.senderId)));

        // Fetch sender details
        const senders = await (prisma as any).user.findMany({
            where: {
                id: { in: senderIds },
            },
            select: {
                id: true,
                fullName: true,
                email: true,
            },
        });

        return NextResponse.json({ 
            ok: true, 
            messages, 
            senders 
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ 
            ok: false, 
            error: "Failed to fetch messages" 
        }, { status: 500 });
    }
}