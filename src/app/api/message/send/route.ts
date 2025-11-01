import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    // Extract user ID from middleware headers
    const senderId = req.headers.get('x-user-id');
    
    if (!senderId) {
        return NextResponse.json({ ok: false, error: "Unauthorized - User not authenticated" }, { status: 401 });
    }
    
    const data = await req.json().catch(() => ({}));
    const {message, receiverId} = data;
    
    if (!message || !receiverId) {
        return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    
    // Save the message to the database
    const newMessage = await (prisma as any).message.create({
        data: {
            text: message,
            senderId: senderId,
            receiverId: receiverId,
        },
    });
    
    return NextResponse.json({ ok: true, message: newMessage });
}