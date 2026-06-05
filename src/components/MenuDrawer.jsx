import React from 'react';

const MenuDrawer = ({ isOpen, onClose, setCurrentPath }) => {
  // Phân chia dữ liệu theo các nhóm mặt hàng
  const menuCategories = [
    {
      title: 'FASHION',
      items: [
        { id: '/explore', label: "Women's Ready-To-Wear" },
        { id: '/explore', label: "Men's Ready-To-Wear" },
      ]
    },
    {
      title: 'BAGS & ACCESSORIES',
      items: [
        { id: '/explore', label: "Handbags & Totes" },
        { id: '/explore', label: "Small Leather Goods" },
        { id: '/explore', label: "Jewelry" },
      ]
    },
    {
      title: 'BEAUTY',
      items: [
        { id: '/explore', label: "Fragrance" },
        { id: '/explore', label: "Makeup" },
        { id: '/explore', label: "Skincare" },
      ]
    }
  ];

  const handleNavigate = (path) => {
    setCurrentPath(path);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#FFFFFF',
      zIndex: 100,
      display: 'flex', flexDirection: 'column',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #EEEEEE' }} onClick={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
        </div>
        <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Close</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {menuCategories.map((category, idx) => (
          <div key={idx} style={{ marginBottom: '32px' }}>
            {/* Tiêu đề nhóm */}
            <div style={{ fontSize: '11px', color: '#757575', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
              {category.title}
            </div>
            {/* Các mặt hàng trong nhóm */}
            {category.items.map((item, index) => (
              <div key={index} onClick={() => handleNavigate(item.id)} style={{
                fontSize: '18px', fontWeight: '400', color: '#000', cursor: 'pointer', 
                marginBottom: '16px', letterSpacing: '0.5px'
              }}>
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDrawer;