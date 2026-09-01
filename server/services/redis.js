// Redis Service - Upstash Serverless Redis
// Sử dụng để lock booking slots và ngăn race condition

import { Redis } from '@upstash/redis';

// Khởi tạo Redis client
const redis = process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    })
  : null;

/**
 * Kiểm tra Redis connection
 */
export async function checkRedisConnection() {
  if (!redis) {
    console.warn('⚠️  Redis not configured. Booking locks disabled.');
    return false;
  }
  
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('Redis connection failed:', error);
    return false;
  }
}

/**
 * Khóa giữ chỗ booking (Hold slot)
 * Thời gian khóa: 10 phút (600 giây)
 * 
 * @param {string} boutiqueId - ID của boutique
 * @param {string} date - Ngày đặt (YYYY-MM-DD)
 * @param {string} timeSlot - Khung giờ (VD: "14:00")
 * @param {string} userId - ID user đang giữ slot
 * @returns {Promise<boolean>} - true nếu lock thành công
 */
export async function holdSlot(boutiqueId, date, timeSlot, userId) {
  if (!redis) {
    // Nếu không có Redis, skip locking (development mode)
    console.warn('Redis not available, skipping slot lock');
    return true;
  }
  
  try {
    const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
    
    // Kiểm tra xem slot đã bị lock bởi user khác chưa
    const existingLock = await redis.get(key);
    
    if (existingLock && existingLock !== userId) {
      throw new Error('Time slot is currently being held by another user. Please select another time.');
    }
    
    // Set lock với TTL 10 phút (600 giây)
    await redis.set(key, userId, { ex: 600 });
    
    console.log(`✓ Slot locked: ${key} by user ${userId}`);
    return true;
  } catch (error) {
    console.error('Hold slot error:', error);
    throw error;
  }
}

/**
 * Giải phóng khóa slot (sau khi confirm booking hoặc timeout)
 * 
 * @param {string} boutiqueId
 * @param {string} date
 * @param {string} timeSlot
 */
export async function releaseSlot(boutiqueId, date, timeSlot) {
  if (!redis) return;
  
  try {
    const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
    await redis.del(key);
    console.log(`✓ Slot released: ${key}`);
  } catch (error) {
    console.error('Release slot error:', error);
  }
}

/**
 * Kiểm tra xem slot có đang bị lock không
 * 
 * @param {string} boutiqueId
 * @param {string} date
 * @param {string} timeSlot
 * @returns {Promise<{locked: boolean, lockedBy?: string}>}
 */
export async function checkSlotAvailability(boutiqueId, date, timeSlot) {
  if (!redis) {
    return { locked: false };
  }
  
  try {
    const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
    const lockedBy = await redis.get(key);
    
    return {
      locked: !!lockedBy,
      lockedBy: lockedBy || undefined
    };
  } catch (error) {
    console.error('Check availability error:', error);
    return { locked: false };
  }
}

/**
 * Extend lock time (gia hạn thời gian giữ slot)
 * Useful khi user đang trong quá trình checkout
 * 
 * @param {string} boutiqueId
 * @param {string} date
 * @param {string} timeSlot
 * @param {string} userId
 * @param {number} seconds - Số giây gia hạn (default: 600)
 */
export async function extendSlotLock(boutiqueId, date, timeSlot, userId, seconds = 600) {
  if (!redis) return;
  
  try {
    const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
    
    // Kiểm tra owner
    const currentLock = await redis.get(key);
    if (currentLock !== userId) {
      throw new Error('Cannot extend lock: you are not the owner');
    }
    
    // Extend TTL
    await redis.expire(key, seconds);
    console.log(`✓ Lock extended: ${key} for ${seconds}s`);
  } catch (error) {
    console.error('Extend lock error:', error);
  }
}

/**
 * Cache helper - Generic cache get/set
 * Useful cho caching product data, user info, etc.
 */
export async function cacheGet(key) {
  if (!redis) return null;
  
  try {
    return await redis.get(key);
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheSet(key, value, expirySeconds = 3600) {
  if (!redis) return;
  
  try {
    await redis.set(key, value, { ex: expirySeconds });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function cacheDel(key) {
  if (!redis) return;
  
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Cache del error:', error);
  }
}

export default redis;
