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
        // Fetch all active users except the requesting user
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: userId
                },
                isActive: true
            },
            select: {
                id: true,
                fullName: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                title: true,
                company: true,
                department: true,
                location: true,
                headline: true,
                profileImage: true,
                views: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return NextResponse.json({ ok: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ ok: false, error: "Failed to fetch users" }, { status: 500 });
    }
}
