import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    console.log("Received token:", token);
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string };
    
    // Parse form data
    const formData = await req.formData();
    
    // Extract card fields
    const cardData: any = {
      userId: decoded.userId,
      fullName: formData.get('fullName') as string,
      firstName: formData.get('firstName') as string || undefined,
      middleName: formData.get('middleName') as string || undefined,
      lastName: formData.get('lastName') as string || undefined,
      prefix: formData.get('prefix') as string || undefined,
      suffix: formData.get('suffix') as string || undefined,
      preferredName: formData.get('preferredName') as string || undefined,
      maidenName: formData.get('maidenName') as string || undefined,
      pronouns: formData.get('pronouns') as string || undefined,
      title: formData.get('title') as string || undefined,
      company: formData.get('company') as string || undefined,
      department: formData.get('department') as string || undefined,
      affiliation: formData.get('affiliation') as string || undefined,
      headline: formData.get('headline') as string || undefined,
      accreditations: formData.get('accreditations') as string || undefined,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      emailLink: formData.get('emailLink') as string || undefined,
      phoneLink: formData.get('phoneLink') as string || undefined,
      location: formData.get('location') as string || undefined,
      linkedinUrl: formData.get('linkedinUrl') as string || undefined,
      websiteUrl: formData.get('websiteUrl') as string || undefined,
      cardName: formData.get('cardName') as string || undefined,
      cardType: formData.get('cardType') as string || undefined,
      selectedDesign: formData.get('selectedDesign') as string || undefined,
      selectedColor: formData.get('selectedColor') as string || undefined,
      selectedColor2: formData.get('selectedColor2') as string || undefined,
      selectedFont: formData.get('selectedFont') as string || undefined,
      bio: formData.get('bio') as string || undefined,
      description: formData.get('description') as string || undefined,
      status: formData.get('status') as string || 'draft',
    };

    console.log('🎨 Card creation - selectedDesign received:', cardData.selectedDesign);
    console.log('📦 Full cardData:', JSON.stringify(cardData, null, 2));

    // Handle profile image upload
    const profileImageFile = formData.get('profileImage') as File;
    if (profileImageFile && profileImageFile.size > 0) {
      const buffer = Buffer.from(await profileImageFile.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer, {
        folder: 'credlink/cards/profiles',
        public_id: `${decoded.userId}_profile_${Date.now()}`,
      });
      cardData.profileImage = uploadResult.secure_url;
    }

    // Handle banner image upload
    const bannerImageFile = formData.get('bannerImage') as File;
    if (bannerImageFile && bannerImageFile.size > 0) {
      const buffer = Buffer.from(await bannerImageFile.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer, {
        folder: 'credlink/cards/banners',
        public_id: `${decoded.userId}_banner_${Date.now()}`,
      });
      cardData.bannerImage = uploadResult.secure_url;
    }

    // Handle cover image upload
    const coverImageFile = formData.get('coverImage') as File;
    if (coverImageFile && coverImageFile.size > 0) {
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer, {
        folder: 'credlink/cards/covers',
        public_id: `${decoded.userId}_cover_${Date.now()}`,
      });
      cardData.coverImage = uploadResult.secure_url;
    }

    // Validate required fields
    if (!cardData.fullName) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    // Create card
    const card = await prisma.card.create({
      data: cardData,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Card created successfully',
      card 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating card:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to create card" 
    }, { status: 500 });
  }
}

