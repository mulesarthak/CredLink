import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function PUT(req: NextRequest) {
    try {
        // Authentication check
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        
        console.log('🔑 Change password - Token present:', !!token);
        
        if (!token) {
            console.log('❌ No admin token found');
            return NextResponse.json(
                { error: 'Unauthorized - Please login as admin' },
                { status: 401 }
            );
        }
        
        // Verify token with the same secret used in login
        let decoded: any;
        try {
            decoded = verify(token, JWT_SECRET);
            console.log('🔓 Decoded token:', decoded);
        } catch (err) {
            console.log('❌ Token verification failed:', err);
            return NextResponse.json(
                { error: 'Unauthorized - Invalid or expired token' },
                { status: 401 }
            );
        }
        
        // Check if admin token has adminId
        if (!decoded || !decoded.adminId) {
            console.log('❌ Missing adminId in token. Decoded:', decoded);
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token format' },
                { status: 403 }
            );
        }
        
        console.log('✅ Admin authenticated:', decoded.adminId);
        
        // Parse request body
        const body = await req.json();
        const { currentPassword, newPassword } = body;
        
        // Validate required fields
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "Current password and new password are required" },
                { status: 400 }
            );
        }
        
        // Validate new password length (basic server-side validation)
        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "New password must be at least 6 characters long" },
                { status: 400 }
            );
        }
        
        // Get admin from database
        const admin = await prisma.admin.findUnique({
            where: { id: decoded.adminId },
            select: {
                id: true,
                email: true,
                fullName: true,
                password: true,
                role: true,
            }
        });
        
        if (!admin) {
            return NextResponse.json(
                { error: "Admin not found" },
                { status: 404 }
            );
        }
        
        // Verify current password with bcrypt
        const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
        
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 401 }
            );
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password in database
        await prisma.admin.update({
            where: { id: decoded.adminId },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            }
        });
        
        // Return success without exposing password
        return NextResponse.json({
            success: true,
            message: "Password changed successfully",
            admin: {
                id: admin.id,
                email: admin.email,
                fullName: admin.fullName,
                role: admin.role,
            }
        }, { status: 200 });
        
    } catch (error: any) {
        console.error("Error changing admin password:", error);
        return NextResponse.json(
            { error: error.message || "Failed to change password" },
            { status: 500 }
        );
    }
}
