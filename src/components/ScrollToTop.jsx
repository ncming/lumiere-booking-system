/**
 * ScrollToTop
 * Scroll lên đầu trang mỗi khi route thay đổi.
 * Đặt bên trong RouterProvider nhưng ngoài <Outlet> để chạy cho mọi navigation.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'instant' không có animation — đúng UX khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
