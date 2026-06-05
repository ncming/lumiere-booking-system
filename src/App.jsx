import { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Cart from './pages/Cart';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const renderPage = () => {
    switch(currentPath) {
      case '/': return <Home setActiveTab={setCurrentPath} />;
      case '/explore': return <Explore setActiveTab={setCurrentPath} />;
      case '/cart': return <Cart setActiveTab={setCurrentPath} />;
      default: return <Home setActiveTab={setCurrentPath} />;
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      
      {/* Thanh điều hướng ở trên cùng */}
      <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath} />

      {/* Nội dung trang */}
      <div style={{ flex: 1, width: '100%' }}>
        {renderPage()}
      </div>

    </div>
  );
}

export default App;