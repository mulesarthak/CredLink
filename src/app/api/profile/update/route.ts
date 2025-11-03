import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(req: NextRequest) {
    // Extract user ID from middleware headers
    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return NextResponse.json({ ok: false, error: "Unauthorized - User not authenticated" }, { status: 401 });
    }
    const user = await (prisma as any).user.findUnique({
        where: { id: userId },
    });
    const data = await req.json().catch(() => ({}));
    const { fullName, email, phone } = data;
    if (!fullName && !email && !phone) {
        return NextResponse.json({ ok: false, error: "No fields to update" }, { status: 400 });
    }

    // Update the user profile
    const updatedUser = await (prisma as any).user.update({
        where: { id: userId },
        data: {
            fullName: fullName || user?.fullName,
            email: email || user?.email,
            phone: phone || user?.phone,
        },
    });

    return NextResponse.json({ ok: true, resource: "profile", action: "update", data: updatedUser });
}
