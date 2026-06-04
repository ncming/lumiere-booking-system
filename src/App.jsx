import { useState } from 'react';
import TabBar from './components/NavBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Booking from './pages/Booking';
import Cart from './pages/Cart';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const renderPage = () => {
    switch(currentPath) {
      case '/':
        return <Home setActiveTab={setCurrentPath} />;
      case '/explore':
        return <Explore setActiveTab={setCurrentPath} />;
      case '/booking':
        return <Booking setActiveTab={setCurrentPath} />;
      case '/cart':
        return <Cart setActiveTab={setCurrentPath} />;
      default:
        return <Home setActiveTab={setCurrentPath} />;
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FDFBF7' }}>
      
      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', padding: '10px 16px', background: '#F5EBE0', borderBottom: '1px solid var(--color-border-tertiary)', fontWeight: '500', letterSpacing: '0.5px' }}>
        Lumière Booking System — React
      </div>

      <TabBar currentPath={currentPath} setCurrentPath={setCurrentPath} />

      <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
        {renderPage()}
      </div>

    </div>
  );
}

export default App;