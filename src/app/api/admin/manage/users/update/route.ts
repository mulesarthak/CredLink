import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Update user
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { payload, passwords } = body;

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    // Build update data object
    const updateData: any = {};

    // Only include fields that are provided
    if (payload.fullName !== undefined) {
      updateData.fullName = payload.fullName;
    }
    
    if (payload.phone !== undefined) {
      updateData.phone = payload.phone || null;
    }
    
    if (payload.city !== undefined) {
      updateData.location = payload.city || null;
    }
    
    if (payload.category !== undefined) {
      updateData.title = payload.category || null;
    }
    
    if (payload.status !== undefined) {
      updateData.status = payload.status;
    }

    // Handle password update - only if provided and not empty
    if (passwords && typeof passwords === 'string' && passwords.trim().length > 0) {
      // Validate password length
      if (passwords.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }
      
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(passwords, 10);
      updateData.password = hashedPassword;
    }

    // Perform update
    const user = await prisma.user.update({
      where: { id: payload.id },
      data: updateData,
    });

    // Remove password from response and map database fields to frontend format
    const { password: _, location, title, ...rest } = user;
    
    const responseUser = {
      ...rest,
      city: location || '',
      category: title || '',
    };

    return NextResponse.json({ 
      success: true,
      user: responseUser 
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}