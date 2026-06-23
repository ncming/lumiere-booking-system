import React, { useEffect } from 'react';

const MenuDrawer = ({ isOpen, onClose, setCurrentPath }) => {
  const [activeMenuTab, setActiveMenuTab] = React.useState('fashion');

  const fashionCategories = [
    { label: "Gifts", hasArrow: true, path: '/explore' },
    { label: "What's New", hasArrow: true, path: '/explore' },
    { label: "Women's Fashion", hasArrow: true, path: "/category/Women's Ready-To-Wear" },
    { label: "Men's Fashion", hasArrow: true, path: "/category/Men's Ready-To-Wear" },
    { label: "Bags", hasArrow: true, path: '/category/Handbags & Totes' },
    { label: "Jewelry & Timepieces", hasArrow: true, path: '/category/Jewelry' },
    { label: "Kids & Baby", hasArrow: true, path: '/explore' },
    { label: "Haute Couture", hasArrow: true, path: '/explore' },
    { label: "Lumière World & Fashion Shows", hasArrow: true, path: '/explore' },
  ];

  const beautyCategories = [
    { label: "Fragrance", hasArrow: true, path: "/category/Fragrance" },
    { label: "Makeup", hasArrow: true, path: "/category/Makeup" },
    { label: "Skincare", hasArrow: true, path: "/category/Skincare" },
    { label: "Gifts & Sets", hasArrow: true, path: "/explore" },
  ];

  const displayedCategories = activeMenuTab === 'fashion' ? fashionCategories : beautyCategories;

  const serviceLinks = [
    { label: "Contact" },
    { label: "Your Boutique Appointment", path: '/reserve' },
    { label: "Find your closest boutique" },
    { label: "Change country/region: Vietnam (English)" },
  ];

  const handleNavigate = (path) => {
    if (path) setCurrentPath(path);
    else setCurrentPath('/explore');
    onClose();
  };

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay with blur */}
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

      {/* Side Panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 'clamp(280px, 38vw, 480px)',
        backgroundColor: '#FFFFFF',
        zIndex: 100,
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isOpen ? '4px 0 40px rgba(0,0,0,0.12)' : 'none',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
        </div>

        {/* Tab Bar - Fashion & Accessories / Fragrance & Beauty */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EEEEEE' }}>
          <button
            onClick={() => setActiveMenuTab('fashion')}
            style={{
              flex: 1, padding: '14px 12px',
              fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
              fontWeight: activeMenuTab === 'fashion' ? '600' : '400',
              color: activeMenuTab === 'fashion' ? '#000' : '#757575',
              background: 'none', border: 'none',
              borderBottom: activeMenuTab === 'fashion' ? '2px solid #000' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            Fashion &amp; Accessories
          </button>
          <button
            onClick={() => setActiveMenuTab('beauty')}
            style={{
              flex: 1, padding: '14px 12px',
              fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
              fontWeight: activeMenuTab === 'beauty' ? '600' : '400',
              color: activeMenuTab === 'beauty' ? '#000' : '#757575',
              background: 'none', border: 'none',
              borderBottom: activeMenuTab === 'beauty' ? '2px solid #000' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            Fragrance &amp; Beauty
          </button>
        </div>

        {/* Main Category Links */}
        <div style={{ flex: 1, padding: '0 0 16px 0' }}>
          {displayedCategories.map((item, idx) => (
            <div
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 24px',
                fontSize: '14px', letterSpacing: '0.2px', color: '#000',
                cursor: 'pointer', borderBottom: '1px solid #F5F5F5',
                transition: 'background 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{item.label}</span>
              {item.hasArrow && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </div>
          ))}

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#E0E0E0', margin: '16px 0' }} />

          {/* Service Links */}
          {serviceLinks.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigate(item.path || '/explore')}
              style={{
                padding: '12px 24px',
                fontSize: '13px', color: idx === 3 ? '#757575' : '#000',
                cursor: 'pointer', letterSpacing: '0.1px',
                transition: 'color 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.color = '#757575'}
              onMouseOut={e => e.currentTarget.style.color = idx === 3 ? '#757575' : '#000'}
            >
              {idx === 3 ? <><span style={{ color: '#BDBDBD', fontSize: '11px' }}>Change country/region: </span>Vietnam (English)</> : item.label}
            </div>
          ))}
        </div>

        {/* Footer inside drawer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #EEEEEE', backgroundColor: '#FAFAFA' }}>
          <div style={{ fontSize: '9px', color: '#BDBDBD', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
            VIP Client Services
          </div>
          <div style={{ fontSize: '11px', color: '#000', letterSpacing: '1px' }}>
            1800 ✦✦✦✦
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;