import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"
import { verifyAdminToken } from "@/lib/jwt"
import bcrypt from 'bcryptjs'

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
        const { password, newPassword } = body;
        
        if (!password || !newPassword) {
            return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
        }
        
        const admin = await prisma.admin.findUnique({ 
            where: { id: decoded.adminId },
            select: { id: true, password: true, email: true, fullName: true, role: true }
        });
        
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }
        
        // Verify current password using bcrypt
        const isCurrentPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isCurrentPasswordValid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
        }
        
        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        
        // Update password in database
        const updatedAdmin = await prisma.admin.update({ 
            where: { id: decoded.adminId }, 
            data: { password: hashedNewPassword },
            select: { id: true, email: true, fullName: true, role: true } // Don't return password
        });
        
        return NextResponse.json({ 
            success: true,
            message: "Password updated successfully",
            admin: updatedAdmin 
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error updating admin password:", error);
        return NextResponse.json({ error: "Failed to update admin password" }, { status: 500 });
    }
}
