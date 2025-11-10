
import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as {
      email?: string
      password?: string
      fullName?: string
      phone?: string | null
    }

    const { email, password, fullName, phone } = body
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'email, password, and fullName are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true }
    })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // Generate unique username from fullName
    const generateUsername = async (name: string): Promise<string> => {
      // Remove special characters and convert to lowercase
      let baseUsername = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
        .slice(0, 20); // Limit to 20 characters

      // If empty after cleaning, use a random string
      if (!baseUsername) {
        baseUsername = 'user' + Math.random().toString(36).substring(2, 8);
      }

      let username = baseUsername;
      let counter = 1;

      // Check if username exists, if yes, append number
      while (true) {
        const existingUser = await prisma.user.findUnique({
          where: { username },
          select: { id: true, username: true }
        });

        if (!existingUser) {
          return username;
        }

        // Append counter to make it unique
        username = `${baseUsername}${counter}`;
        counter++;
      }
    };

    const username = await generateUsername(fullName);
    const hashed = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        fullName,
        username,
        phone: phone || null,
        
      },
      select: { id: true, email: true, fullName: true, username: true, phone: true, createdAt: true },
    })

    const token = await signToken({ userId: user.id, email: user.email })
    if(!token){
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, user, token}, { status: 201 })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
