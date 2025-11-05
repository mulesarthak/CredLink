import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { deleteFromCloudinary } from '@/lib/cloudinary'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function DELETE(request: NextRequest) {
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

    // Get current user profile image
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { profileImage: true } as any
    })

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const oldProfileImage = (currentUser as any)?.profileImage
    
    if (!oldProfileImage) {
      return NextResponse.json(
        { error: 'No profile image to delete' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    try {
      // Extract public_id from Cloudinary URL
      const urlParts = oldProfileImage.split('/')
      const uploadIndex = urlParts.findIndex((part: string) => part === 'upload')
      
      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        const startIndex = urlParts[uploadIndex + 1].startsWith('v') ? uploadIndex + 2 : uploadIndex + 1
        const pathParts = urlParts.slice(startIndex)
        const fileWithExt = pathParts[pathParts.length - 1]
        const fileName = fileWithExt.split('.')[0]
        const folderPath = pathParts.slice(0, -1).join('/')
        const publicId = folderPath ? `${folderPath}/${fileName}` : fileName
        
        console.log('🗑️ Delete API: Deleting profile image:', publicId)
        await deleteFromCloudinary(publicId)
        console.log('✅ Delete API: Profile image deleted from Cloudinary')
      }
    } catch (cloudinaryError) {
      console.warn('⚠️ Delete API: Failed to delete from Cloudinary:', cloudinaryError)
      // Continue to remove from database even if Cloudinary deletion fails
    }

    // Remove profile image from database
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { profileImage: null } as any,
      select: {
        id: true,
        email: true,
        fullName: true,
        profileImage: true
      } as any
    })

    return NextResponse.json({
      success: true,
      message: 'Profile image deleted successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Delete profile image error:', error)
    return NextResponse.json(
      { error: 'An error occurred while deleting the profile image' },
      { status: 500 }
    )
  }
}
