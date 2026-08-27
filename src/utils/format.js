/**
 * Format a numeric price to Vietnamese đồng with locale separators.
 * Returns '—' for zero/falsy values (e.g. "Exclusive Invitation" items).
 */
export const formatPrice = (num) =>
  num === 0 ? '—' : num.toLocaleString('vi-VN') + '₫';
