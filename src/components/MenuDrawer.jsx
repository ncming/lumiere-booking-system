import React from 'react';

const MenuDrawer = ({ isOpen, onClose, setCurrentPath }) => {
  const menuItems = [
    { id: '/explore', label: "Gifts" },
    { id: '/explore', label: "Women's Fashion" },
    { id: '/explore', label: "Men's Fashion" },
    { id: '/explore', label: "Bags" },
    { id: '/explore', label: "Fragrance" },
    { id: '/explore', label: "Makeup" },
    { id: '/explore', label: "Skincare" },
    { id: '/explore', label: "Haute Couture" },
  ];

  const handleNavigate = (path) => {
    setCurrentPath(path);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#EEEEEE',
      zIndex: 100,
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      /* Hiệu ứng trượt mượt mà từ trái sang */
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      
      {/* Nút Đóng (Thay X bằng 2 gạch) */}
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#000' }}></div>
        </div>
        <span style={{ fontSize: '18px', fontWeight: '300' }}>Close</span>
      </div>

      {/* Danh sách Menu */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 24px' }}>
        {menuItems.map((item, index) => (
          <div key={index} onClick={() => handleNavigate(item.id)} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 0', fontSize: '20px', fontWeight: '300', color: '#222', cursor: 'pointer'
          }}>
            {item.label}
            <span style={{ fontSize: '16px', color: '#777' }}>&gt;</span>
          </div>
        ))}
      </div>

      {/* Thanh Toggle dưới cùng */}
      <div style={{ padding: '24px 20px', backgroundColor: '#E0E0E0' }}>
        <div style={{ display: 'flex', backgroundColor: '#BDBDBD', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ flex: 1, backgroundColor: '#ffffff', textAlign: 'center', padding: '16px', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }}>
            Fashion & Accessories
            </div>
            <div style={{ flex: 1, backgroundColor: 'transparent', color: '#ffffff', textAlign: 'center', padding: '16px', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }}>
            Fragrance & Beauty
            </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;