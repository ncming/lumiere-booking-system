import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Cart from './pages/Cart';
import Reserve from './pages/Reserve';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import StoreLocator from './pages/StoreLocator';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';

function AppInner() {
  const [currentPath, setCurrentPath] = useState('/');

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  const renderPage = () => {
    if (currentPath === '/') return <Home setActiveTab={setCurrentPath} />;
    if (currentPath === '/cart') return <Cart setActiveTab={setCurrentPath} />;
    if (currentPath === '/reserve') return <Reserve setActiveTab={setCurrentPath} />;
    if (currentPath === '/explore') return <Explore selectedCategory="ALL" setActiveTab={setCurrentPath} />;
    if (currentPath === '/contact') return <Contact setActiveTab={setCurrentPath} />;
    if (currentPath === '/wishlist') return <Wishlist setActiveTab={setCurrentPath} />;
    if (currentPath === '/store-locator') return <StoreLocator setActiveTab={setCurrentPath} />;
    if (currentPath === '/privacy-policy') return <LegalPage type="privacy" setActiveTab={setCurrentPath} />;
    if (currentPath === '/legal') return <LegalPage type="legal" setActiveTab={setCurrentPath} />;
    if (currentPath === '/cookies') return <LegalPage type="cookies" setActiveTab={setCurrentPath} />;
    if (currentPath === '/accessibility') return <LegalPage type="accessibility" setActiveTab={setCurrentPath} />;

    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.replace('/product/', '');
      return <ProductDetail productId={productId} setActiveTab={setCurrentPath} />;
    }

    if (currentPath.startsWith('/category/')) {
      const categoryName = currentPath.replace('/category/', '');
      return <Explore selectedCategory={categoryName} setActiveTab={setCurrentPath} />;
    }

    // Fallback — 404
    return <NotFound setActiveTab={setCurrentPath} />;
  };

  const isHome = currentPath === '/';

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath} />
      <CartDrawer setCurrentPath={setCurrentPath} />
      <ToastNotification />
      {/*
        FIX UX-07: Removed double paddingTop.
        Pages handle their own top offset (paddingTop: '80px') to clear the fixed 68px navbar.
        Home is excluded — its hero fills 100vh intentionally.
      */}
      <div style={{ flex: 1, width: '100%', paddingTop: isHome ? '0' : '0' }}>
        {renderPage()}
      </div>
      <Footer setCurrentPath={setCurrentPath} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;