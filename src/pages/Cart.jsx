const Cart = ({ setActiveTab }) => {
  const handleCheckout = () => {
    alert('Payment successful! Your appointment has been confirmed.');
    setActiveTab('/');
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%' }}>
      <div className="nav">
        <span style={{ fontSize: '14px', fontWeight: '600' }}>Your Cart</span>
        <span className="chip chip-orange">3 items</span>
      </div>
      
      <div style={{ padding: '16px 20px' }}>
        <div className="section-title">Appointment</div>
        <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>RF Microneedling</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>Fri, Jun 05 · 11:30 · Lan Anh</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>680,000₫</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Locked</div>
            </div>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: '16px' }}>Add-on Products</div>
        <div className="card" style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #B8855D 0%, #A0714D 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#fff', fontSize: '11px', flexShrink: 0 }}>SERUM</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>HA+ Serum</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>x1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>320,000₫</span>
              <span style={{ cursor: 'pointer', color: 'var(--color-text-danger)', fontSize: '18px', fontWeight: '300', width: '24px', textAlign: 'center' }}>−</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #F5EBE0 0%, #E8D5C0 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#B8855D', fontSize: '11px', flexShrink: 0 }}>SPF50</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Sunscreen SPF 50</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>x1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>250,000₫</span>
              <span style={{ cursor: 'pointer', color: 'var(--color-text-danger)', fontSize: '18px', fontWeight: '300', width: '24px', textAlign: 'center' }}>−</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '14px', marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span>Service</span>
            <span>680,000₫</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            <span>Products</span>
            <span>570,000₫</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            <span>Total</span>
            <span style={{ color: 'var(--accent)' }}>1,250,000₫</span>
          </div>
          
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '12px', fontSize: '12px', marginBottom: '14px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1A1410' }}>Confirm Details</div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Address: Nguyễn Văn A · 0912 345 678
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              Email: nguyenvana@gmail.com
            </div>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', padding: '12px' }} onClick={handleCheckout}>
            Proceed to Payment · 1,250,000₫
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;