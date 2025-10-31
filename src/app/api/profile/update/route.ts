import { NextRequest,NextResponse } from "next/server";
export async function PUT(req: NextRequest) {
    const data = await req.json().catch(() => ({}));
    return NextResponse.json({ ok: true, resource: "profile", action: "update", data });
}
