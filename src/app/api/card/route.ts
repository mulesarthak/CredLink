import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key';

// GET all cards for authenticated user
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string };

    // Fetch all cards for the user
    const cards = await prisma.card.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        fullName: true,
        firstName: true,
        middleName: true,
        lastName: true,
        prefix: true,
        suffix: true,
        preferredName: true,
        maidenName: true,
        pronouns: true,
        title: true,
        company: true,
        department: true,
        affiliation: true,
        headline: true,
        accreditations: true,
        email: true,
        phone: true,
        emailLink: true,
        phoneLink: true,
        location: true,
        linkedinUrl: true,
        websiteUrl: true,
        cardName: true,
        cardType: true,
        selectedDesign: true,
        selectedColor: true,
        selectedFont: true,
        displayTypes: true,
        profileImage: true,
        bannerImage: true,
        coverImage: true,
        bio: true,
        description: true,
        skills: true,
        portfolio: true,
        experience: true,
        services: true,
        review: true,
        status: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
          }
        }
      }
    });

    // Add selectedColor2 using a separate query for now
    const cardsWithColor2 = await Promise.all(
      cards.map(async (card) => {
        const color2Result = await prisma.$queryRaw`
          SELECT selected_color2 as selectedColor2 FROM cards WHERE id = ${card.id}
        ` as any[];
        
        return {
          ...card,
          selectedColor2: color2Result[0]?.selectedColor2 || null
        };
      })
    );

    console.log('📊 Fetched cards for user:', decoded.userId);
    console.log('📋 Number of cards:', cardsWithColor2.length);
    if (cardsWithColor2.length > 0) {
      console.log('🎨 First card design:', cardsWithColor2[0].selectedDesign);
      console.log('🎨 First card selectedColor2:', cardsWithColor2[0].selectedColor2);
      console.log('🔍 First card data:', JSON.stringify(cardsWithColor2[0], null, 2));
    }

    return NextResponse.json({ 
      success: true,
      cards: cardsWithColor2,
      count: cardsWithColor2.length
    });

  } catch (error: any) {
    console.error("Error fetching cards:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to fetch cards" 
    }, { status: 500 });
  }
}
