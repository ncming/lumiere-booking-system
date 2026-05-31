import React, { useState } from 'react';
import TabBar from './components/TabBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
// Import các trang khác...

function App() {
  // Quản lý trạng thái tab hiện tại. Mặc định là 'home'
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{ maxWidth: '414px', margin: '0 auto', border: '1px solid #ccc', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Cảnh báo UI */}
      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', padding: '8px 14px', background: 'var(--color-background-secondary)', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
        Mockup tương tác — React Version
      </div>

      {/* Render thanh TabBar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render nội dung màn hình dựa trên state */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'explore' && <Explore />}
        {/* {activeTab === 'booking' && <Booking />} */}
        {/* {activeTab === 'cart' && <Cart />} */}
        {/* {activeTab === 'admin' && <Admin />} */}
      </div>

    </div>
  );
}

export default App;