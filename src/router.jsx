/**
 * Router tập trung — React Router v7
 *
 * Tất cả pages dùng React.lazy → chỉ load bundle khi user thực sự vào route đó.
 * Suspense fallback là PageSkeleton nhẹ (không flash trắng).
 *
 * Cách navigate trong component:
 *   import { useNavigate, useParams, Link } from 'react-router-dom';
 *   const navigate = useNavigate();
 *   navigate('/explore');          // push
 *   navigate(-1);                  // back
 *   navigate('/auth', { replace: true }); // redirect (replace history entry)
 */

import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageSkeleton from './components/PageSkeleton';

// ─── Lazy pages ───────────────────────────────────────────────────────────────
// Mỗi page là 1 dynamic import → Vite tách ra chunk riêng khi build
const Home         = lazy(() => import('./pages/Home'));
const Explore      = lazy(() => import('./pages/Explore'));
const ProductDetail= lazy(() => import('./pages/ProductDetail'));
const Cart         = lazy(() => import('./pages/Cart'));
const Reserve      = lazy(() => import('./pages/Reserve'));
const Wishlist     = lazy(() => import('./pages/Wishlist'));
const Contact      = lazy(() => import('./pages/Contact'));
const StoreLocator = lazy(() => import('./pages/StoreLocator'));
const LegalPage    = lazy(() => import('./pages/LegalPage'));
const Auth         = lazy(() => import('./pages/Auth'));
const MyBookings   = lazy(() => import('./pages/MyBookings'));
const MyOrders     = lazy(() => import('./pages/MyOrders'));
const Account      = lazy(() => import('./pages/Account'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// ─── Root Layout ─────────────────────────────────────────────────────────────
// Bọc NavBar + Footer quanh toàn bộ routes — chỉ render 1 lần
function RootLayout() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
      }}>
        <NavBar />
        <CartDrawer />
        <ToastNotification />
        <main style={{ flex: 1, width: '100%' }}>
          {/* Suspense bao Outlet → fallback hiện khi page chunk đang load */}
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

// ─── Route table ─────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Home — không có paddingTop vì hero 100vh
      { index: true,                  element: <Home /> },

      // Auth & account
      { path: 'auth',                 element: <Auth /> },
      { path: 'account',              element: <Account /> },
      { path: 'my-bookings',          element: <MyBookings /> },
      { path: 'my-orders',            element: <MyOrders /> },

      // Shop
      { path: 'explore',              element: <Explore /> },
      { path: 'category/:categoryName', element: <Explore /> },
      { path: 'product/:productId',   element: <ProductDetail /> },
      { path: 'cart',                 element: <Cart /> },
      { path: 'wishlist',             element: <Wishlist /> },

      // Services
      { path: 'reserve',              element: <Reserve /> },
      { path: 'contact',              element: <Contact /> },
      { path: 'store-locator',        element: <StoreLocator /> },

      // Legal
      { path: 'privacy-policy',       element: <LegalPage /> },
      { path: 'legal',                element: <LegalPage /> },
      { path: 'cookies',              element: <LegalPage /> },
      { path: 'accessibility',        element: <LegalPage /> },

      // 404 — catch-all dưới cùng
      { path: '*',                    element: <NotFound /> },
    ],
  },
]);

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Router() {
  return <RouterProvider router={router} />;
}
