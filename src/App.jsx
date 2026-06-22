import { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Cart from './pages/Cart';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const renderPage = () => {
    if (currentPath === '/') return <Home setActiveTab={setCurrentPath} />;
    if (currentPath === '/cart') return <Cart setActiveTab={setCurrentPath} />;
    
    // Nếu bấm nút Kính lúp search hoặc "Discover" -> Mở toàn bộ sản phẩm
    if (currentPath === '/explore') return <Explore selectedCategory="ALL" setActiveTab={setCurrentPath} />;

    // BƯỚC NGOẶT: Nếu URL là /category/Handbags & Totes -> Bóc tách chuỗi gửi đi
    if (currentPath.startsWith('/category/')) {
      const categoryName = currentPath.replace('/category/', '');
      return <Explore selectedCategory={categoryName} setActiveTab={setCurrentPath} />;
    }

    return <Home setActiveTab={setCurrentPath} />;
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath} />
      <div style={{ flex: 1, width: '100%' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;