import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    // Extract user ID ONLY from middleware-provided headers.
    // Middleware is responsible for decoding tokens and enriching headers.
    const senderId = req.headers.get("x-user-id");

        if (!senderId) {
        return NextResponse.json(
            { ok: false, error: "Unauthorized - User not authenticated" },
            { status: 401 }
        );
    }

    const data = await req.json().catch(() => ({}));
    const { message, receiverId, status, tag, read } = data ?? {};

    if (!message || typeof message !== "string" || !message.trim() || !receiverId) {
        return NextResponse.json(
            { ok: false, error: "Missing required fields: message and receiverId" },
            { status: 400 }
        );
    }

    try {
            const newMessage = await (prisma as any).message.create({
            data: {
                text: message.trim(),
                senderId: String(senderId),
                receiverId: String(receiverId),
                // Persist new fields with sensible defaults
                status: (typeof status === 'string' ? status : 'PENDING') as any,
                read: typeof read === 'boolean' ? read : false,
                tag: (typeof tag === 'string' ? tag : 'PRICING') as any,
            },
        });

        return NextResponse.json({ ok: true, message: newMessage }, { status: 201 });
    } catch (err: any) {
            console.error("Failed to create message:", err);
            if (err?.code === 'P1001') {
                // Database unreachable
                return NextResponse.json(
                    { ok: false, error: "Database is unreachable (P1001). Check DATABASE_URL and DB server status." },
                    { status: 503 }
                );
            }
            return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
    }
}

// Helpful for direct browser hits; make it clear this endpoint expects POST
 