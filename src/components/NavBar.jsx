import { useState } from 'react';
import MenuDrawer from './MenuDrawer';

const NavBar = ({ currentPath, setCurrentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Trạng thái bật/tắt tìm kiếm

  const isHome = currentPath === '/';
  
  // Nếu đang mở tìm kiếm, tự động chuyển nền thành trắng và chữ thành đen
  const isSolidBg = !isHome || isSearchOpen;
  const color = isSolidBg ? '#000000' : '#ffffff';
  const bgColor = isSolidBg ? '#ffffff' : 'transparent';

  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setIsSearchOpen(false);
      setCurrentPath('/explore'); // Nhấn Enter chuyển sang trang Catalogue
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        backgroundColor: bgColor,
        transition: 'all 0.3s ease',
        boxShadow: isSolidBg ? '0 1px 0 rgba(0,0,0,0.05)' : 'none'
      }}>
        
        {/* Phần Thanh Menu chính */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 20px', position: 'relative' }}>
          
          <div style={{ position: 'absolute', left: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Nút mở Menu Draw */}
            <div onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '22px', height: '1.5px', backgroundColor: color, transition: 'background-color 0.3s' }}></div>
              <div style={{ width: '22px', height: '1.5px', backgroundColor: color, transition: 'background-color 0.3s' }}></div>
            </div>
            
            {/* Nút Kính lúp (Bật/Tắt Tìm kiếm) */}
            <svg 
              onClick={handleToggleSearch} 
              style={{ cursor: 'pointer', transition: 'stroke 0.3s' }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>

          <div 
            onClick={() => setCurrentPath('/')}
            style={{ 
              fontFamily: '"Playfair Display", serif', fontSize: '26px', 
              fontWeight: '400', letterSpacing: '2px', cursor: 'pointer', color: color,
              transition: 'color 0.3s'
            }}>
            Lumière
          </div>
        </div>

        {/* Phần Tìm kiếm thu gọn (Mở ra khi bấm kính lúp) */}
        <div style={{
          height: isSearchOpen ? '50px' : '0',
          overflow: 'hidden',
          transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', alignItems: 'center',
          padding: isSearchOpen ? '0 20px 10px 20px' : '0 20px'
        }}>
          <input 
            type="text" 
            placeholder="WHAT ARE YOU LOOKING FOR?" 
            onKeyDown={handleSearchSubmit}
            style={{
              width: '100%',
              border: 'none',
              borderBottom: '1px solid #E0E0E0',
              padding: '8px 0',
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              outline: 'none',
              background: 'transparent',
              color: '#000',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}
          />
        </div>
      </div>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setCurrentPath={setCurrentPath} />
    </>
  );
};

export default NavBar;