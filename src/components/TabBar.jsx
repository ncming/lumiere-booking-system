import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Đổi id thành đường dẫn (path) thực tế
  const tabs = [
    { id: '/', label: '🏠 Trang chủ' },
    { id: '/explore', label: '🔍 Khám phá' },
    { id: '/booking', label: '📅 Đặt lịch' },
    { id: '/cart', label: '🛒 Giỏ hàng' },
    { id: '/admin', label: '⚙️ Admin' },
    { id: '/appointments', label: '📋 Lịch hẹn' }
  ];

  return (
    <div className="tab-bar" style={{ overflowX: 'auto', padding: '0 14px', gap: '4px', flexShrink: 0 }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${location.pathname === tab.id ? 'active' : ''}`}
          onClick={() => navigate(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabBar;