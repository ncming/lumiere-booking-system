import React from 'react';

const Cart = ({ setActiveTab }) => {
  // Hàm mô phỏng thanh toán
  const handleCheckout = () => {
    alert('Thanh toán thành công! Lịch hẹn đã được xác nhận.');
    // Thanh toán xong thì quay về trang chủ
    setActiveTab('home');
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px' }}>
      <div className="nav">
        <span style={{ fontSize: '13px', fontWeight: '500' }}>🛒 Giỏ hàng</span>
        <span className="chip chip-orange">3 mục</span>
      </div>
      
      <div style={{ padding: '14px' }}>
        <div className="section-title">Lịch hẹn đặt</div>
        <div className="card" style={{ marginBottom: '8px', borderLeft: '3px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>🧖 Chăm sóc da RF</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>T6, 05/06 · 11:30 · Lan Anh</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>680,000₫</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>đã khóa</div>
            </div>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: '14px' }}>Sản phẩm thêm kèm</div>
        <div className="card" style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '22px' }}>🧴</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>Serum HA+ Lumière</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>x1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>320,000₫</span>
              <span style={{ cursor: 'pointer', color: 'var(--color-text-danger)', fontSize: '16px' }}>×</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '22px' }}>☀️</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>Kem chống nắng SPF50</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>x1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>250,000₫</span>
              <span style={{ cursor: 'pointer', color: 'var(--color-text-danger)', fontSize: '16px' }}>×</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: '12px', marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}><span>Dịch vụ</span><span>680,000₫</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}><span>Sản phẩm</span><span>570,000₫</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '500', marginBottom: '14px' }}><span>Tổng cộng</span><span style={{ color: 'var(--accent)' }}>1,250,000₫</span></div>
          
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '10px', fontSize: '12px', marginBottom: '12px' }}>
            <div style={{ fontWeight: '500', marginBottom: '6px' }}>Xác nhận thông tin</div>
            <div style={{ color: 'var(--muted)' }}>📍 Nguyễn Văn A · 0912 345 678</div>
            <div style={{ color: 'var(--muted)' }}>✉️ nguyenvana@gmail.com</div>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', padding: '11px' }} onClick={handleCheckout}>
            Thanh toán · 1,250,000₫ →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;