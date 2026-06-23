import { useState } from 'react';
import MenuDrawer from './MenuDrawer';
import { useApp } from '../context/AppContext';

const NavBar = ({ currentPath, setCurrentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, toggleBag } = useApp();

  const isHome = currentPath === '/';

  // On home page with no overlays, use transparent/white. Elsewhere always solid.
  const isSolidBg = !isHome || isSearchOpen;
  const color = isSolidBg ? '#000000' : '#ffffff';
  const bgColor = isSolidBg ? '#ffffff' : 'transparent';

  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setIsSearchOpen(false);
      setCurrentPath('/explore');
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

        {/* Main Menu Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 20px', position: 'relative' }}>

          {/* Left Controls: Hamburger + Search */}
          <div style={{ position: 'absolute', left: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Hamburger */}
            <div onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '22px', height: '1.5px', backgroundColor: color, transition: 'background-color 0.3s' }}></div>
              <div style={{ width: '22px', height: '1.5px', backgroundColor: color, transition: 'background-color 0.3s' }}></div>
            </div>

            {/* Search Icon */}
            <svg
              onClick={handleToggleSearch}
              style={{ cursor: 'pointer', transition: 'stroke 0.3s' }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>

          {/* Logo */}
          <div
            onClick={() => setCurrentPath('/')}
            style={{
              fontFamily: '"Playfair Display", serif', fontSize: '26px',
              fontWeight: '400', letterSpacing: '2px', cursor: 'pointer', color: color,
              transition: 'color 0.3s'
            }}
          >
            Lumière
          </div>

          {/* Right Controls: Bag icon */}
          <div style={{ position: 'absolute', right: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              onClick={toggleBag}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Shopping Bag"
            >
              <svg
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={color} strokeWidth="1.5"
                style={{ transition: 'stroke 0.3s' }}
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>

              {/* Cart Badge */}
              {cartCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  border: `1.5px solid ${bgColor || '#fff'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px',
                  fontWeight: '600',
                  color: '#fff',
                  letterSpacing: 0,
                  transition: 'background-color 0.3s',
                  // On transparent bg (home), flip badge to white bg + black text
                  backgroundColor: isSolidBg ? '#000' : '#fff',
                  color: isSolidBg ? '#fff' : '#000',
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar (expandable) */}
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