import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"
import { verifyAdminToken } from "@/lib/jwt"

export async function PUT(req: NextRequest) {
    try {
        const cookieStore = await cookies()
            const token = cookieStore.get('admin_token')?.value
        
            if (!token) {
              return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
            }
        
            const decoded = verifyAdminToken(token)
        
            // Check if admin token is valid and has adminId
            if (!decoded || !decoded.adminId) {
              return NextResponse.json({ error: 'Invalid token or insufficient permissions' }, { status: 403 })
            }
        
        const body = await req.json();
        const { password, newPassword} = body;
        if(!password || !newPassword) return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        const admin = await prisma.admin.findUnique({ where: { id: decoded.adminId } });
        if(!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        if(admin.password !== password) return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        const updatedAdmin = await prisma.admin.update({ where: { id: decoded.adminId }, data: { password: newPassword } });
        return NextResponse.json({ admin: updatedAdmin }, { status: 200 });
    } catch (error) {
        console.error("Error updating admin:", error);
        return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
    }
}
