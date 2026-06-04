import { useState } from 'react';
import MenuDrawer from './MenuDrawer';

const NavBar = ({ currentPath, setCurrentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ở trang chủ, chữ màu trắng và nền trong suốt. Ở trang khác, chữ đen nền trắng.
  const isHome = currentPath === '/';
  const color = isHome ? '#ffffff' : '#000000';
  const bgColor = isHome ? 'transparent' : '#ffffff';

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '16px 20px', zIndex: 50,
        backgroundColor: bgColor,
        color: color,
        transition: 'all 0.3s ease'
      }}>
        {/* Cụm Icon bên trái (Hamburger Menu & Search) */}
        <div style={{ position: 'absolute', left: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Dior Hamburger Icon (2 dòng) */}
            <div style={{ width: '22px', height: '1.5px', backgroundColor: color }}></div>
            <div style={{ width: '22px', height: '1.5px', backgroundColor: color }}></div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>

        {/* Logo trung tâm */}
        <div 
          onClick={() => setCurrentPath('/')}
          style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: '28px', 
            fontWeight: '400', 
            letterSpacing: '2px',
            cursor: 'pointer' 
          }}>
          Lumière
        </div>
      </div>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setCurrentPath={setCurrentPath} />
    </>
  );
};

export default NavBar;