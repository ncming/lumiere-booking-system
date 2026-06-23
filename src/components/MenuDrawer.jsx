import React from 'react';

const MenuDrawer = ({ isOpen, onClose, setCurrentPath }) => {
  const menuCategories = [
    {
      title: 'FASHION',
      items: [
        { label: "Women's Ready-To-Wear" },
        { label: "Men's Ready-To-Wear" },
      ]
    },
    {
      title: 'BAGS & ACCESSORIES',
      items: [
        { label: "Handbags & Totes" },
        { label: "Small Leather Goods" },
        { label: "Jewelry" },
      ]
    },
    {
      title: 'BEAUTY',
      items: [
        { label: "Fragrance" },
        { label: "Makeup" },
        { label: "Skincare" },
      ]
    }
  ];

  const handleNavigateCategory = (catLabel) => {
    setCurrentPath(`/category/${catLabel}`);
    onClose();
  };

  const handleNavigate = (path) => {
    setCurrentPath(path);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#FFFFFF', zIndex: 100, display: 'flex', flexDirection: 'column',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      {/* Header */}
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #EEEEEE' }} onClick={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
        </div>
        <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Close</span>
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {menuCategories.map((category, idx) => (
          <div key={idx} style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#757575', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{category.title}</div>
            {category.items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigateCategory(item.label)}
                style={{ fontSize: '18px', fontWeight: '400', color: '#000', cursor: 'pointer', marginBottom: '16px', letterSpacing: '0.5px', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#757575'}
                onMouseOut={e => e.currentTarget.style.color = '#000'}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#EEEEEE', marginBottom: '28px' }} />

        {/* Services Links */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#757575', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>CLIENT SERVICES</div>
          <div
            onClick={() => handleNavigate('/reserve')}
            style={{
              fontSize: '16px', fontWeight: '400', color: '#000', cursor: 'pointer',
              marginBottom: '16px', letterSpacing: '0.5px',
              display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.color = '#757575'}
            onMouseOut={e => e.currentTarget.style.color = '#000'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book a Boutique Visit
          </div>
          <div
            onClick={() => handleNavigate('/explore')}
            style={{
              fontSize: '16px', fontWeight: '400', color: '#000', cursor: 'pointer',
              marginBottom: '16px', letterSpacing: '0.5px',
              display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.color = '#757575'}
            onMouseOut={e => e.currentTarget.style.color = '#000'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            All Collections
          </div>
        </div>
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
  );
};

export default MenuDrawer;