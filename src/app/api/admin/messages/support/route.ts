import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Optional: In future, enforce admin auth here using your admin session mechanism
    // Fetch all SUPPORT-tagged messages, newest first
    const messages = await (prisma as any).message.findMany({
      where: { tag: 'SUPPORT' as any },
      orderBy: { createdAt: 'desc' },
    });

    const senderIds = Array.from(new Set(messages.map((m: any) => m.senderId)));
    const senders = await (prisma as any).user.findMany({
      where: { id: { in: senderIds } },
      select: { id: true, fullName: true, email: true },
    });

    return NextResponse.json({ ok: true, messages, senders });
  } catch (err) {
    console.error('Error fetching support messages:', err);
    return NextResponse.json({ ok: false, error: 'Failed to fetch support messages' }, { status: 500 });
  }
}
