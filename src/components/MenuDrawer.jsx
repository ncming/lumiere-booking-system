import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeMenuTab, setActiveMenuTab] = React.useState('fashion');

  const fashionCategories = [
    { label: "Gifts",                        path: '/explore' },
    { label: "What's New",                   path: '/explore' },
    { label: "Women's Fashion",              path: "/category/Women's Ready-To-Wear" },
    { label: "Men's Fashion",                path: "/category/Men's Ready-To-Wear" },
    { label: "Bags",                          path: '/category/Handbags & Totes' },
    { label: "Jewelry & Timepieces",         path: '/category/Jewelry' },
    { label: "Kids & Baby",                  path: '/category/Kids & Baby' },
    { label: "Haute Couture",                path: '/category/Haute Couture' },
    { label: "MITU World & Fashion Shows",   path: '/category/MITU World & Fashion Shows' },
  ];

  const beautyCategories = [
    { label: "Fragrance",    path: "/category/Fragrance" },
    { label: "Makeup",       path: "/category/Makeup" },
    { label: "Skincare",     path: "/category/Skincare" },
    { label: "Gifts & Sets", path: "/explore" },
  ];

  const serviceLinks = [
    { label: "Contact",                           path: '/contact' },
    { label: "Your Boutique Appointment",         path: '/reserve' },
    { label: "Find your closest boutique",        path: '/store-locator' },
    { label: "Change country/region: Vietnam (English)" },
  ];

  const displayedCategories = activeMenuTab === 'fashion' ? fashionCategories : beautyCategories;

  const go = (path) => {
    navigate(path ?? '/explore');
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
          zIndex: 99, opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease, backdrop-filter 0.4s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 'clamp(280px, 38vw, 480px)',
        backgroundColor: '#FFFFFF', zIndex: 100,
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isOpen ? '4px 0 40px rgba(0,0,0,0.12)' : 'none',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #EEEEEE', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1,
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

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EEEEEE' }}>
          {[
            { id: 'fashion', label: 'Fashion & Accessories' },
            { id: 'beauty',  label: 'Fragrance & Beauty' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveMenuTab(id)}
              style={{
                flex: 1, padding: '14px 12px',
                fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
                fontWeight: activeMenuTab === id ? '600' : '400',
                color: activeMenuTab === id ? '#000' : '#757575',
                background: 'none', border: 'none',
                borderBottom: activeMenuTab === id ? '2px solid #000' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ flex: 1, padding: '0 0 16px 0' }}>
          {displayedCategories.map((item) => (
            <div
              key={item.label}
              onClick={() => go(item.path)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 24px', fontSize: '14px', letterSpacing: '0.2px', color: '#000',
                cursor: 'pointer', borderBottom: '1px solid #F5F5F5', transition: 'background 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}

          <div style={{ height: '1px', backgroundColor: '#E0E0E0', margin: '16px 0' }} />

          {serviceLinks.map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.path && go(item.path)}
              style={{
                padding: '12px 24px', fontSize: '13px',
                color: idx === 3 ? '#757575' : '#000',
                cursor: item.path ? 'pointer' : 'default',
                letterSpacing: '0.1px', transition: 'color 0.15s',
              }}
              onMouseOver={e => item.path && (e.currentTarget.style.color = '#757575')}
              onMouseOut={e => item.path && (e.currentTarget.style.color = '#000')}
            >
              {idx === 3
                ? <><span style={{ color: '#BDBDBD', fontSize: '11px' }}>Change country/region: </span>Vietnam (English)</>
                : item.label}
            </div>
          ))}
        </div>

        {/* Drawer footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #EEEEEE', backgroundColor: '#FAFAFA' }}>
          <div style={{ fontSize: '9px', color: '#BDBDBD', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
            VIP Client Services
          </div>
          <div style={{ fontSize: '11px', color: '#000', letterSpacing: '1px' }}>0339 708 788</div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;
