import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
if (!process.env.CLOUDINARY_URL) {
  throw new Error(
    "Missing Cloudinary config. Ensure CLOUDINARY_URL is set in .env and restart the dev server."
  )
}

// Cloudinary automatically configures itself when CLOUDINARY_URL is set
// The URL format is: cloudinary://api_key:api_secret@cloud_name

// Export configured cloudinary instance
export { cloudinary }

// Helper function to upload image buffer
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string
    public_id?: string
    transformation?: any
  } = {}
) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: options.folder || 'credlink',
        public_id: options.public_id,
        transformation: options.transformation,
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    ).end(buffer)
  })
}

// Helper function to upload image from URL
export async function uploadFromUrl(
  imageUrl: string,
  options: {
    folder?: string
    public_id?: string
    transformation?: any
  } = {}
) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: options.folder || 'credlink',
      public_id: options.public_id,
      transformation: options.transformation,
    })
    return result
  } catch (error) {
    throw error
  }
}

// Helper function to delete image
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    throw error
  }
}

// Helper function to generate optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string | number
    format?: string
    crop?: string
  } = {}
) {
  return cloudinary.url(publicId, {
    width: options.width,
    height: options.height,
    quality: options.quality || 'auto',
    format: options.format || 'auto',
    crop: options.crop || 'fill',
  })
}
