/**
 * image.js — Image URL utilities for performance optimization
 *
 * Strategy:
 *   - Unsplash: dùng native query params (w, q, auto=format, fit=crop)
 *     Unsplash CDN tự trả về WebP/AVIF nếu browser hỗ trợ.
 *   - Cloudinary: dùng Cloudinary transformation URL để resize/convert
 *     Chỉ áp dụng cho ảnh ĐÃ được upload lên Cloudinary cloud của project.
 *   - External URLs khác: trả về nguyên bản.
 */

const CLOUDINARY_CLOUD = 'wflzuuom'; // Cloud name từ .env CLOUDINARY_CLOUD_NAME

// ─── Unsplash helpers ─────────────────────────────────────────────────────────

const UNSPLASH_BASE = 'https://images.unsplash.com';

/**
 * Trả về Unsplash URL đã được tối ưu với width cụ thể.
 * @param {string} url   URL Unsplash gốc (có hoặc không có query params)
 * @param {number} w     Width target (px)
 * @param {number} [q=80] Quality (1-100)
 */
export function unsplashUrl(url, w, q = 80) {
  if (!url || !url.includes('unsplash.com')) return url;
  // Lấy phần path, bỏ hết query params cũ
  const base = url.split('?')[0];
  return `${base}?q=${q}&w=${w}&auto=format&fit=crop&crop=entropy`;
}

/**
 * Tạo srcSet cho ảnh Unsplash với các breakpoints tiêu chuẩn.
 * @param {string} url   URL Unsplash gốc
 * @param {number[]} widths  Mảng widths cần tạo (mặc định: thumbnail set)
 * @param {number} [q=80] Quality
 */
export function unsplashSrcSet(url, widths = [400, 600, 900, 1200], q = 80) {
  if (!url || !url.includes('unsplash.com')) return undefined;
  return widths
    .map(w => `${unsplashUrl(url, w, q)} ${w}w`)
    .join(', ');
}

// ─── Hero srcSet (larger breakpoints) ────────────────────────────────────────

/** srcSet dành cho hero image — full-viewport-width */
export function heroSrcSet(url) {
  return unsplashSrcSet(url, [800, 1200, 1600, 1920], 80);
}

/** src mặc định cho hero — 1600px đủ cho màn hình 2K với DPR 1 */
export function heroSrc(url) {
  return unsplashUrl(url, 1600, 80);
}

// ─── Thumbnail srcSet (product / category cards) ─────────────────────────────

/** srcSet dành cho product card thumbnail — max 600px.
 * @param {string} url
 * @param {number[]} [widths=[300, 450, 600]] - Custom widths nếu cần override
 */
export function thumbSrcSet(url, widths = [300, 450, 600]) {
  return unsplashSrcSet(url, widths, 82);
}

/** src mặc định cho thumbnail */
export function thumbSrc(url) {
  return unsplashUrl(url, 600, 82);
}

// ─── Editorial srcSet (mid-size feature images) ───────────────────────────────

/** srcSet dành cho editorial grid — max 900px */
export function editorialSrcSet(url) {
  return unsplashSrcSet(url, [450, 700, 900], 82);
}

export function editorialSrc(url) {
  return unsplashUrl(url, 900, 82);
}

// ─── Banner srcSet (full-width section banners) ───────────────────────────────

/** srcSet dành cho full-width banner image */
export function bannerSrcSet(url) {
  return unsplashSrcSet(url, [640, 1024, 1440, 1920], 80);
}

export function bannerSrc(url) {
  return unsplashUrl(url, 1440, 80);
}

// ─── Cloudinary helpers ───────────────────────────────────────────────────────
// Chỉ dùng khi ảnh đã được upload lên Cloudinary của project.
// publicId = path trên Cloudinary, VD: 'products/lady-dior-med'

/**
 * Tạo Cloudinary URL với transformation.
 * @param {string} publicId   Public ID trên Cloudinary
 * @param {object} transforms { w, h, c, q, f } — Cloudinary transform params
 */
export function cloudinaryUrl(publicId, { w, h, c = 'fill', q = 'auto', f = 'auto' } = {}) {
  const transforms = [
    w && `w_${w}`,
    h && `h_${h}`,
    `c_${c}`,
    `q_${q}`,
    `f_${f}`,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transforms}/${publicId}`;
}

/**
 * Tạo srcSet cho Cloudinary image.
 * @param {string} publicId  Public ID trên Cloudinary
 * @param {number[]} widths  Mảng widths
 */
export function cloudinarySrcSet(publicId, widths = [300, 600, 900, 1200]) {
  return widths
    .map(w => `${cloudinaryUrl(publicId, { w })} ${w}w`)
    .join(', ');
}

// ─── Generic helper ───────────────────────────────────────────────────────────

/**
 * Auto-detect source và trả về optimized src.
 * Dùng khi nguồn ảnh không nhất quán.
 */
export function optimizedSrc(url, targetWidth = 600) {
  if (!url) return '';
  if (url.includes('unsplash.com')) return unsplashUrl(url, targetWidth);
  if (url.includes('res.cloudinary.com')) {
    // Đã là Cloudinary URL, chèn thêm w_ transform
    return url.replace('/upload/', `/upload/w_${targetWidth},q_auto,f_auto/`);
  }
  return url;
}
