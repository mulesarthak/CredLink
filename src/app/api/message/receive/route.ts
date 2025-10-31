import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    // Extract user ID from middleware headers
    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return NextResponse.json({ ok: false, error: "Unauthorized - User not authenticated" }, { status: 401 });
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

    return NextResponse.json({ ok: true, messages });
}