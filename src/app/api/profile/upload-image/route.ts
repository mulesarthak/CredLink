import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('user_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify token and get user ID
    const decoded = verify(token, JWT_SECRET) as {
      userId: string
      email: string
      fullName: string
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, {
      folder: 'credlink/profile-images',
      public_id: `profile_${decoded.userId}_${Date.now()}`,
      transformation: {
        width: 400,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        format: 'auto'
      }
    }) as any

    // Update user profile in database
    console.log('🔄 Upload API: Updating user profile with image URL:', uploadResult.secure_url);
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { profileImage: uploadResult.secure_url } as any,
      select: {
        id: true,
        email: true,
        fullName: true,
        profileImage: true
      } as any
    })
    console.log('✅ Upload API: User updated in database:', updatedUser);

    return NextResponse.json({
      success: true,
      message: 'Profile image uploaded successfully',
      user: updatedUser,
      imageUrl: uploadResult.secure_url
    })

  } catch (error) {
    console.error('Profile image upload error:', error)
    
    if (error instanceof Error) {
      // Handle specific JWT errors
      if (error.message.includes('jwt')) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }
      
      // Handle Cloudinary errors
      if (error.message.includes('cloudinary') || error.message.includes('upload')) {
        return NextResponse.json(
          { error: 'Failed to upload image. Please try again.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'An error occurred while uploading the image' },
      { status: 500 }
    )
  }
}
