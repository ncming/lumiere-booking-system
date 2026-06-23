import { useState, useEffect, useRef } from 'react';
import MenuDrawer from './MenuDrawer';
import { useApp } from '../context/AppContext';

const SearchPanel = ({ isOpen, onClose, setCurrentPath }) => {
  const inputRef = useRef(null);
  const suggestions = ['Wallet', 'Lady bag', 'Lady', 'Card holder', 'Earrings'];
  const youMayLike = [
    {
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop',
      label: 'Earrings'
    },
    {
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      label: 'Sneakers'
    },
    {
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop',
      label: 'Bag'
    },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      onClose();
      setCurrentPath('/explore');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
          zIndex: 99,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease, backdrop-filter 0.4s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Right Side Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'clamp(320px, 55vw, 680px)',
        backgroundColor: '#FFFFFF',
        zIndex: 100,
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isOpen ? '-4px 0 40px rgba(0,0,0,0.12)' : 'none',
        overflowY: 'auto',
      }}>
        {/* Close row */}
        <div style={{
          padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #EEEEEE',
          position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1,
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              color: '#000', fontFamily: 'inherit',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Close
          </button>
          {/* Search icon right corner */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>

        {/* Search input */}
        <div style={{ padding: '32px 32px 16px' }}>
          <div style={{ borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="What are you looking for?"
              onKeyDown={handleSubmit}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: '14px', color: '#000', background: 'transparent',
                fontFamily: 'inherit', letterSpacing: '0.2px',
              }}
            />
            <svg
              onClick={() => { onClose(); setCurrentPath('/explore'); }}
              style={{ cursor: 'pointer' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5"
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>

          {/* Fragrance & Beauty link */}
          <div style={{ textAlign: 'right', marginTop: '12px', fontSize: '12px', color: '#757575' }}>
            Search for <span
              onClick={() => { onClose(); setCurrentPath('/explore'); }}
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#000' }}
            >Fragrance &amp; Beauty</span> products
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ padding: '8px 32px 24px' }}>
          <div style={{ fontSize: '11px', color: '#757575', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Suggestions
          </div>
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => { onClose(); setCurrentPath('/explore'); }}
              style={{
                fontSize: '14px', color: '#000', cursor: 'pointer',
                padding: '7px 0', letterSpacing: '0.1px',
                transition: 'color 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.color = '#757575'}
              onMouseOut={e => e.currentTarget.style.color = '#000'}
            >
              {s}
            </div>
          ))}
        </div>

        {/* You may also like */}
        <div style={{ padding: '0 32px 40px' }}>
          <div style={{ fontSize: '11px', color: '#000', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '600' }}>
            You may also like
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {youMayLike.map((item, i) => (
              <div
                key={i}
                onClick={() => { onClose(); setCurrentPath('/explore'); }}
                style={{ flex: 1, cursor: 'pointer' }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ marginTop: '8px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#000' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const NavBar = ({ currentPath, setCurrentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, toggleBag } = useApp();

  const isHome = currentPath === '/';
  const hasOverlay = isMenuOpen || isSearchOpen;

  // On home page with no overlays, navbar is transparent white text
  const isSolidBg = !isHome || hasOverlay;
  const color = isSolidBg ? '#000000' : '#ffffff';
  const bgColor = isSolidBg ? '#ffffff' : 'transparent';

  const handleToggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(prev => !prev);
  };

  const handleOpenMenu = () => {
    setIsSearchOpen(false);
    setIsMenuOpen(true);
  };

  return (
    <>
      {/* Top announcement bar — Dior style */}
      <div style={{
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        fontSize: '10px',
        letterSpacing: '2px',
        padding: '8px 0',
        textTransform: 'uppercase',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 51,
      }}>
        Complimentary Shipping &amp; Returns — Always
      </div>

      {/* Main Navbar */}
      <div style={{
        position: 'fixed', top: '33px', left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        backgroundColor: bgColor,
        transition: 'background-color 0.3s ease',
        boxShadow: isSolidBg ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}>
        {/* Main Menu Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 24px', position: 'relative' }}>

          {/* Left Controls: Hamburger + Search */}
          <div style={{ position: 'absolute', left: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
            {/* Hamburger */}
            <button
              onClick={handleOpenMenu}
              style={{
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                gap: '5px', background: 'none', border: 'none', padding: 0,
              }}
              aria-label="Open menu"
            >
              <div style={{ width: '22px', height: '1px', backgroundColor: color, transition: 'background-color 0.3s' }} />
              <div style={{ width: '22px', height: '1px', backgroundColor: color, transition: 'background-color 0.3s' }} />
            </button>

            {/* Search Icon */}
            <button
              onClick={handleToggleSearch}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
              aria-label="Search"
            >
              <svg
                style={{ transition: 'stroke 0.3s' }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div
            onClick={() => setCurrentPath('/')}
            style={{
              fontFamily: '"Playfair Display", serif', fontSize: '28px',
              fontWeight: '400', letterSpacing: '3px', cursor: 'pointer', color: color,
              transition: 'color 0.3s', userSelect: 'none',
            }}
          >
            Lumière
          </div>

          {/* Right Controls: Bag icon */}
          <div style={{ position: 'absolute', right: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleBag}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0 }}
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
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
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', fontWeight: '600', letterSpacing: 0,
                  transition: 'all 0.3s',
                  backgroundColor: isSolidBg ? '#000' : '#fff',
                  color: isSolidBg ? '#fff' : '#000',
                  border: `1.5px solid ${bgColor || '#fff'}`,
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drawers */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setCurrentPath={setCurrentPath} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} setCurrentPath={setCurrentPath} />
    </>
  );
};

export default NavBar;