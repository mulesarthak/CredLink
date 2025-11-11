import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => ({}));
    const { messageId, replyText } = data || {};

    if (!messageId || !replyText || typeof replyText !== 'string' || !replyText.trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields: messageId, replyText" }, { status: 400 });
    }

    // Find the original message so we can reply to its sender
    const original = await (prisma as any).message.findUnique({ where: { id: String(messageId) } });
    if (!original) {
      return NextResponse.json({ ok: false, error: "Original message not found" }, { status: 404 });
    }

    // Resolve an admin/support user to act as the sender of the reply
    let supportUser = await (prisma as any).user.findFirst({
      where: {
        OR: [
          { role: { equals: "SUPER_ADMIN" } },
          { role: { equals: "ADMIN" } },
          { email: { equals: "admin@credlink.com" } },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    // Fallback: if no support user exists in users table, reply from the receiver of the original message
    // This keeps FK constraints satisfied and still delivers the reply to the user
    const senderId = supportUser?.id ?? String(original.receiverId);
    const receiverId = String(original.senderId);

    // Create the reply message addressed to the original sender (the end-user)
    const reply = await (prisma as any).message.create({
      data: {
        text: replyText.trim(),
        senderId,
        receiverId,
        status: 'REPLIED' as any,
        read: false,
        tag: 'SUPPORT' as any,
        topic: (original as any)?.topic ? `Re: ${(original as any).topic}` : 'Support',
      },
    });

    // Optionally mark the original as READ/REPLIED
    await (prisma as any).message.update({
      where: { id: String(original.id) },
      data: { status: 'REPLIED' as any, read: true },
    });

    return NextResponse.json({ ok: true, reply }, { status: 201 });
  } catch (err: any) {
    console.error('Failed to send admin reply:', err);
    if (err?.code === 'P2003') {
      return NextResponse.json({ ok: false, error: 'Foreign key error. Ensure sender/receiver users exist.' }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: 'Failed to send reply' }, { status: 500 });
  }
}
