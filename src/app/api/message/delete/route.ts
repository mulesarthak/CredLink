import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const fromHeader = req.headers.get("x-message-id") || undefined;
    const fromQuery = url.searchParams.get("id") || undefined;
    let fromBody: string | undefined;
    try {
        const body = await req.json().catch(() => null) as { id?: string } | null;
        fromBody = body?.id;
    } catch {}

    const messageId = fromHeader || fromQuery || fromBody;
    if (!messageId) {
        return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
    }

    try {
        await prisma.message.delete({ where: { id: messageId } });
        return NextResponse.json({ ok: true });
    } catch (error: any) {
        // Prisma not found
        if (error?.code === 'P2025') {
            return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
        }
        console.error("Failed to delete message:", error);
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}