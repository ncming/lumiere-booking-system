import React from 'react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active">
      <div className="nav">
        <span className="nav-brand">✦ Lumière</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Tìm kiếm...</span>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F5E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>N</div>
        </div>
      </div>

      <div style={{ padding: '14px', background: 'linear-gradient(135deg,#F5EBE0,#ECD9C6)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: '#A85520', letterSpacing: '.5px', marginBottom: '4px' }}>DỊCH VỤ NỔI BẬT THÁNG NÀY</div>
        <div style={{ fontSize: '20px', fontWeight: '500', color: '#1A1410', lineHeight: '1.3', marginBottom: '8px' }}>Trẻ hóa da<br />chuyên sâu ✨</div>
        <div style={{ fontSize: '12px', color: '#7A5A40', marginBottom: '12px' }}>Công nghệ RF Microneedling thế hệ mới</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Gọi hàm chuyển tab khi click */}
          <button className="btn-primary" style={{ fontSize: '12px', padding: '7px 14px' }} onClick={() => setActiveTab('booking')}>
            Đặt lịch ngay
          </button>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#A85520' }}>680,000₫</span>
        </div>
      </div>

      {/* Tương tự cho phần "Dịch vụ hot" và "Sản phẩm bán chạy" ở dưới... */}
      {/* Thay onClick="showTab('booking')" thành onClick={() => setActiveTab('booking')} */}
    </div>
  );
};

export default Home;