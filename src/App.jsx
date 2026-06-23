import { useState } from 'react';
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

function AppInner() {
  const [currentPath, setCurrentPath] = useState('/');

  const renderPage = () => {
    if (currentPath === '/') return <Home setActiveTab={setCurrentPath} />;
    if (currentPath === '/cart') return <Cart setActiveTab={setCurrentPath} />;
    if (currentPath === '/reserve') return <Reserve setActiveTab={setCurrentPath} />;
    if (currentPath === '/explore') return <Explore selectedCategory="ALL" setActiveTab={setCurrentPath} />;

    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.replace('/product/', '');
      return <ProductDetail productId={productId} setActiveTab={setCurrentPath} />;
    }

    if (currentPath.startsWith('/category/')) {
      const categoryName = currentPath.replace('/category/', '');
      return <Explore selectedCategory={categoryName} setActiveTab={setCurrentPath} />;
    }

    return <Home setActiveTab={setCurrentPath} />;
  };

  const isHome = currentPath === '/';

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath} />
      <CartDrawer setCurrentPath={setCurrentPath} />
      <ToastNotification />
      {/* Home page handles its own top padding; other pages need offset for announcement bar (33px) + navbar (~68px) */}
      <div style={{ flex: 1, width: '100%', paddingTop: isHome ? '0' : '101px' }}>
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