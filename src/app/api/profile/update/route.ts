import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
    // Extract user ID from middleware headers
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
        return NextResponse.json({ ok: false, error: "Unauthorized - User not authenticated" }, { status: 401 });
    }

    try {
        const data = await req.json().catch(() => ({}));

        // Extract all possible profile fields from request
        const {
            fullName,
            username,
            firstName,
            middleName,
            lastName,
            prefix,
            suffix,
            preferredName,
            maidenName,
            pronouns,
            title,
            company,
            department,
            affiliation,
            headline,
            accreditations,
            email,
            phone,
            emailLink,
            phoneLink,
            location,
            cardName,
            cardType,
            selectedDesign,
            selectedColor,
            selectedFont,
            displayTypes,
            profileImage,
            bannerImage,
            bio,
            status,
            views
        } = data;

        // Build update object with only provided fields
        const updateData: any = {};
        
        if (fullName !== undefined) updateData.fullName = fullName;
        if (username !== undefined) updateData.username = username;
        if (firstName !== undefined) updateData.firstName = firstName;
        if (middleName !== undefined) updateData.middleName = middleName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (prefix !== undefined) updateData.prefix = prefix;
        if (suffix !== undefined) updateData.suffix = suffix;
        if (preferredName !== undefined) updateData.preferredName = preferredName;
        if (maidenName !== undefined) updateData.maidenName = maidenName;
        if (pronouns !== undefined) updateData.pronouns = pronouns;
        if (title !== undefined) updateData.title = title;
        if (company !== undefined) updateData.company = company;
        if (department !== undefined) updateData.department = department;
        if (affiliation !== undefined) updateData.affiliation = affiliation;
        if (headline !== undefined) updateData.headline = headline;
        if (accreditations !== undefined) updateData.accreditations = accreditations;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (emailLink !== undefined) updateData.emailLink = emailLink;
        if (phoneLink !== undefined) updateData.phoneLink = phoneLink;
        if (location !== undefined) updateData.location = location;
        if (cardName !== undefined) updateData.cardName = cardName;
        if (cardType !== undefined) updateData.cardType = cardType;
        if (selectedDesign !== undefined) updateData.selectedDesign = selectedDesign;
        if (selectedColor !== undefined) updateData.selectedColor = selectedColor;
        if (selectedFont !== undefined) updateData.selectedFont = selectedFont;
        if (displayTypes !== undefined) {
            // Convert array to JSON string for storage
            updateData.displayTypes = Array.isArray(displayTypes) 
                ? JSON.stringify(displayTypes) 
                : displayTypes;
        }
        if (profileImage !== undefined) updateData.profileImage = profileImage;
        if (bannerImage !== undefined) updateData.bannerImage = bannerImage;
        if (bio !== undefined) updateData.bio = bio;
        if (status !== undefined) updateData.status = status;
        if (views !== undefined) updateData.views = views;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ ok: false, error: "No fields to update" }, { status: 400 });
        }

        // Update the user profile
        const updatedUser = await (prisma as any).user.update({
            where: { id: userId },
            data: updateData,
        });

        // Remove password from response
        const { password, ...userWithoutPassword } = updatedUser;

        return NextResponse.json({ 
            ok: true, 
            resource: "profile", 
            action: "update", 
            data: userWithoutPassword 
        });
    } catch (error: any) {
        console.error('Profile update error:', error);
        
        if (error.code === 'P2002') {
            return NextResponse.json({ 
                ok: false, 
                error: "Username or email already exists" 
            }, { status: 409 });
        }
        
        return NextResponse.json({ 
            ok: false, 
            error: error.message || "Failed to update profile" 
        }, { status: 500 });
    }
}
