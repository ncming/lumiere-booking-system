import { useState, useEffect, useRef } from 'react';
import MenuDrawer from './MenuDrawer';
import { useApp } from '../context/AppContext';

/* ─── Search Panel ──────────────────────────────────────────────── */
const SearchPanel = ({ isOpen, onClose, setCurrentPath, setPendingSearch }) => {
  const inputRef = useRef(null);
  const suggestions = ['Wallet', 'Lady bag', 'Lady', 'Card holder', 'Earrings'];
  const youMayLike = [
    { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', label: 'Earrings' },
    { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', label: 'Sneakers' },
    { img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop', label: 'Bag' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // FIX BUG-01: Capture input value, store as pending search, then navigate
  const doSearch = (query) => {
    const q = query ?? inputRef.current?.value ?? '';
    setPendingSearch(q.trim());
    onClose();
    setCurrentPath('/explore');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') doSearch();
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
              onKeyDown={handleKeyDown}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: '14px', color: '#000', background: 'transparent',
                fontFamily: 'inherit', letterSpacing: '0.2px',
              }}
            />
            {/* Arrow — submit search */}
            <svg
              onClick={() => doSearch()}
              style={{ cursor: 'pointer' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5"
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>

          <div style={{ textAlign: 'right', marginTop: '12px', fontSize: '12px', color: '#757575' }}>
            Search for <span
              onClick={() => doSearch('Fragrance')}
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
              onClick={() => doSearch(s)}
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
                onClick={() => doSearch(item.label)}
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

/* ─── User Menu Dropdown ──────────────────────────────────────────── */
const UserMenu = ({ isOpen, onClose, user, isAuthenticated, logout, setCurrentPath }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigation = (path) => {
    setCurrentPath(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    setCurrentPath('/');
  };

  if (!isAuthenticated) {
    // Not logged in - show login/register
    return (
      <div
        ref={menuRef}
        style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          right: 0,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0E0E0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          minWidth: '240px',
          zIndex: 1000,
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Welcome to Lumiere
          </div>
          <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.6 }}>
            Sign in to access your account
          </div>
        </div>

        <div style={{ padding: '12px 0' }}>
          <button
            onClick={() => handleNavigation('/auth')}
            style={{
              width: '100%',
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              fontSize: '12px',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              color: '#000',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#F9F9F9'}
            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavigation('/auth')}
            style={{
              width: '100%',
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              fontSize: '12px',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              color: '#000',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#F9F9F9'}
            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  // Logged in - show user menu
  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        right: 0,
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        minWidth: '260px',
        zIndex: 1000,
      }}
    >
      {/* User Info */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '4px' }}>
          {user?.name || 'User'}
        </div>
        <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.4 }}>
          {user?.email}
        </div>
        {user?.role === 'ADMIN' && (
          <div style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 8px',
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '8px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Admin
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div style={{ padding: '8px 0' }}>
        <MenuItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
          label="My Bookings"
          onClick={() => handleNavigation('/my-bookings')}
        />
        <MenuItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
          }
          label="My Orders"
          onClick={() => handleNavigation('/my-orders')}
        />
        <MenuItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          }
          label="Wishlist"
          onClick={() => handleNavigation('/wishlist')}
        />
        
        <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '8px 0' }} />
        
        <MenuItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }
          label="Account Settings"
          onClick={() => handleNavigation('/account')}
        />
        
        {user?.role === 'ADMIN' && (
          <>
            <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '8px 0' }} />
            <MenuItem
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              }
              label="Admin Dashboard"
              onClick={() => handleNavigation('/admin')}
            />
          </>
        )}
        
        <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '8px 0' }} />
        
        <MenuItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          }
          label="Sign Out"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '12px 24px',
      border: 'none',
      background: 'none',
      textAlign: 'left',
      fontSize: '12px',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      color: '#000',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}
    onMouseEnter={e => e.target.style.backgroundColor = '#F9F9F9'}
    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
  >
    {icon}
    {label}
  </button>
);

/* ─── NavBar ────────────────────────────────────────────────────── */
const NavBar = ({ currentPath, setCurrentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, cartCount, wishlistCount, toggleBag, setPendingSearch } = useApp();

  // Auto-hide navbar on scroll down, show on scroll up
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 80);
        if (currentY < 60) {
          setVisible(true);
        } else if (currentY > lastScrollY.current + 4) {
          setVisible(false);
        } else if (currentY < lastScrollY.current - 4) {
          setVisible(true);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPath === '/';
  const hasOverlay = isMenuOpen || isSearchOpen;
  const navVisible = visible || hasOverlay;

  const useDarkIcons = !isHome || scrolled || hasOverlay;
  const color = useDarkIcons ? '#000000' : '#ffffff';

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
      {/* Main Navbar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        backgroundColor: 'transparent',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}>
        {/* Main Menu Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 24px', position: 'relative' }}>

          {/* Left: Hamburger */}
          <div style={{ position: 'absolute', left: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <button
              onClick={handleOpenMenu}
              style={{
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                gap: '5px', background: 'none', border: 'none',
                padding: '14px 16px',   /* large hit area ~50×48px */
                margin: '-14px -16px',  /* pull back so visual position unchanged */
              }}
              aria-label="Open menu"
            >
              <div style={{ width: '22px', height: '1px', backgroundColor: color, transition: 'background-color 0.3s' }} />
              <div style={{ width: '22px', height: '1px', backgroundColor: color, transition: 'background-color 0.3s' }} />
            </button>
          </div>

          {/* Logo */}
          <div
            onClick={() => setCurrentPath('/')}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: '400',
              letterSpacing: 'clamp(3px, 0.6vw, 10px)',
              cursor: 'pointer', color: color,
              transition: 'color 0.3s', userSelect: 'none',
            }}
          >
            MITU
          </div>

          {/* Right: Search + User + Wishlist + Bag */}
          <div style={{ position: 'absolute', right: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>

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

            {/* User Icon */}
            <button
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0 }}
              aria-label="Account"
              title={isAuthenticated ? user?.name : 'Sign In'}
            >
              <svg
                width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke={color} strokeWidth="1.5"
                style={{ transition: 'stroke 0.3s' }}
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {isAuthenticated && (
                <div style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  border: `2px solid ${useDarkIcons ? '#fff' : '#000'}`,
                }} />
              )}
              {/* User Menu Dropdown */}
              <UserMenu
                isOpen={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
                user={user}
                isAuthenticated={isAuthenticated}
                logout={logout}
                setCurrentPath={setCurrentPath}
              />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setCurrentPath('/wishlist')}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0 }}
              aria-label="Wishlist"
              title="Wishlist"
            >
              <svg
                width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke={color} strokeWidth="1.5"
                style={{ transition: 'stroke 0.3s' }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {wishlistCount > 0 && (
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', fontWeight: '600', letterSpacing: 0,
                  transition: 'all 0.3s',
                  backgroundColor: useDarkIcons ? '#000' : '#fff',
                  color: useDarkIcons ? '#fff' : '#000',
                }}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </div>
              )}
            </button>

            {/* Bag Icon */}
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

              {cartCount > 0 && (
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', fontWeight: '600', letterSpacing: 0,
                  transition: 'all 0.3s',
                  backgroundColor: useDarkIcons ? '#000' : '#fff',
                  color: useDarkIcons ? '#fff' : '#000',
                  border: `1.5px solid transparent`,
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
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setCurrentPath={setCurrentPath}
        setPendingSearch={setPendingSearch}
      />
    </>
  );
};

export default NavBar;