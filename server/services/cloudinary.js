// Cloudinary Service - Image Upload & Management
import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  
  console.log('✓ Cloudinary configured');
} else {
  console.warn('⚠️  Cloudinary credentials not configured. Image upload disabled.');
}

/**
 * Kiểm tra Cloudinary configuration
 */
export function checkCloudinaryConfig() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload ảnh lên Cloudinary
 * 
 * @param {string} imageData - Base64 string hoặc file path
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export async function uploadImage(imageData, options = {}) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const defaultOptions = {
      folder: 'lumiere/products',
      transformation: [
        { width: 1200, height: 1600, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      resource_type: 'auto'
    };
    
    const result = await cloudinary.uploader.upload(imageData, {
      ...defaultOptions,
      ...options
    });
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes
    };
  } catch (error) {
    console.error('Upload image error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/**
 * Upload nhiều ảnh cùng lúc
 * 
 * @param {Array<string>} images - Array of base64 strings or file paths
 * @param {Object} options
 * @returns {Promise<Array<Object>>}
 */
export async function uploadMultipleImages(images, options = {}) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const uploadPromises = images.map(image => uploadImage(image, options));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Upload multiple images error:', error);
    throw error;
  }
}

/**
 * Xóa ảnh từ Cloudinary
 * 
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>}
 */
export async function deleteImage(publicId) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image: ${result.result}`);
    }
    
    return result;
  } catch (error) {
    console.error('Delete image error:', error);
    throw error;
  }
}

/**
 * Xóa nhiều ảnh
 * 
 * @param {Array<string>} publicIds
 */
export async function deleteMultipleImages(publicIds) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error('Delete multiple images error:', error);
    throw error;
  }
}

/**
 * Generate transformation URL
 * Useful để tạo thumbnail, resize on-the-fly
 * 
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} transformations
 * @returns {string} - Transformed image URL
 */
export function getTransformedUrl(publicId, transformations = {}) {
  if (!checkCloudinaryConfig()) {
    return null;
  }
  
  try {
    return cloudinary.url(publicId, {
      secure: true,
      ...transformations
    });
  } catch (error) {
    console.error('Get transformed URL error:', error);
    return null;
  }
}

/**
 * Generate thumbnail URL (300x400)
 */
export function getThumbnailUrl(publicId) {
  return getTransformedUrl(publicId, {
    width: 300,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    fetch_format: 'auto'
  });
}

/**
 * Generate medium size URL (800x1066)
 */
export function getMediumUrl(publicId) {
  return getTransformedUrl(publicId, {
    width: 800,
    height: 1066,
    crop: 'limit',
    quality: 'auto:good',
    fetch_format: 'auto'
  });
}

/**
 * Upload avatar/profile image
 * Optimized cho ảnh profile (square, smaller size)
 */
export async function uploadAvatar(imageData, userId) {
  return uploadImage(imageData, {
    folder: 'lumiere/avatars',
    public_id: `avatar_${userId}`,
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ],
    overwrite: true
  });
}

/**
 * Lấy thông tin ảnh từ Cloudinary
 */
export async function getImageInfo(publicId) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error('Get image info error:', error);
    throw error;
  }
}

/**
 * List tất cả ảnh trong một folder
 */
export async function listImages(folder = 'lumiere', maxResults = 100) {
  if (!checkCloudinaryConfig()) {
    throw new Error('Cloudinary not configured');
  }
  
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: maxResults
    });
    
    return result.resources;
  } catch (error) {
    console.error('List images error:', error);
    throw error;
  }
}

export default cloudinary;
