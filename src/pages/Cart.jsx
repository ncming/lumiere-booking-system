const Cart = ({ setActiveTab }) => {
  const handleCheckout = () => {
    alert('Payment successful! Your appointment has been confirmed.');
    setActiveTab('/');
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%' }}>
      
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #EEEEEE' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px' }}>SHOPPING BAG</h2>
      </div>
      
      <div style={{ padding: '24px 20px' }}>
        
        {/* Lịch hẹn */}
        <div className="section-title">Appointment</div>
        <div style={{ border: '1px solid #000', padding: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>RF Microneedling</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>Fri, Jun 05 · 11:30 · Lan Anh</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', fontWeight: '600' }}>680,000₫</div>
              <div style={{ fontSize: '9px', color: '#BDBDBD', marginTop: '4px', textTransform: 'uppercase' }}>Reserved</div>
            </div>
          </div>
        </div>

        {/* Sản phẩm đi kèm */}
        <div className="section-title">Boutique Items</div>
        
        <div style={{ borderBottom: '1px solid #EEEEEE', paddingBottom: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '80px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', letterSpacing: '1px', color: '#000' }}>SERUM</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>HA+ Serum</div>
                <div style={{ fontSize: '11px', color: '#757575', marginTop: '4px' }}>Qty: 1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>320,000₫</span>
              <span style={{ cursor: 'pointer', color: '#000', fontSize: '16px' }}>✕</span>
            </div>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #000', paddingBottom: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '80px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', letterSpacing: '1px', color: '#000' }}>SPF50</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Sunscreen SPF 50</div>
                <div style={{ fontSize: '11px', color: '#757575', marginTop: '4px' }}>Qty: 1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>250,000₫</span>
              <span style={{ cursor: 'pointer', color: '#000', fontSize: '16px' }}>✕</span>
            </div>
          </div>
        </div>

        {/* Tổng kết thanh toán */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#757575', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Services</span>
            <span>680,000₫</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#757575', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Products</span>
            <span>570,000₫</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', marginBottom: '32px', letterSpacing: '1px' }}>
            <span>TOTAL</span>
            <span>1,250,000₫</span>
          </div>
          
          <div style={{ backgroundColor: '#F9F9F9', padding: '16px', fontSize: '11px', marginBottom: '24px', border: '1px solid #EEEEEE' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Details</div>
            <div style={{ color: '#757575', lineHeight: '1.6' }}>
              Nguyễn Văn A<br/>
              0912 345 678<br/>
              nguyenvana@gmail.com
            </div>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', padding: '16px' }} onClick={handleCheckout}>
            COMPLETE PURCHASE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;