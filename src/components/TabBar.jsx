import React from 'react';

const TabBar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', label: 'Trang chủ' },
        { id: 'explore', label: 'Khám phá' },
        { id: 'booking', label: 'Đặt lịch' },
        { id: 'admin', label: 'Quản trị' },
        { id: 'appointments', label: 'Lịch hẹn' }
    ];

    return (
        <div className="tab-bar" style={{ overflowX: 'auto', padding: '0 14px', gap: '4px' }}>
            {tabs.map(tab => (
                <div
                    key={tab.id}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    );
};

export default TabBar;