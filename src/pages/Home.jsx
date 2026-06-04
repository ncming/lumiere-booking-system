const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active" style={{ width: '100%', paddingBottom: '20px' }}>
      
      {/* Header tối giản: Logo căn giữa */}
      <div className="nav" style={{ padding: '16px 20px', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #E0E0E0' }}>
        <span className="nav-brand" style={{ letterSpacing: '4px', fontSize: '20px' }}>Lumière</span>
        <div style={{ position: 'absolute', right: '20px', fontSize: '18px', cursor: 'pointer' }}>
          🔍
        </div>
      </div>

      {/* Hero Banner mang phong cách Tạp chí (Editorial) */}
      <div style={{ 
        height: '350px', 
        backgroundColor: '#F2F2F2', /* Giả lập một bức ảnh người mẫu trắng đen/high-fashion */
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px', color: '#757575', textTransform: 'uppercase' }}>
          La Collection
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '400', lineHeight: '1.2', marginBottom: '24px', letterSpacing: '2px' }}>
          THE ART OF<br/>SKINCARE
        </h2>
        <button className="btn-primary" style={{ padding: '12px 24px' }} onClick={() => setActiveTab('/booking')}>
          Book An Appointment
        </button>
      </div>

      <div style={{ padding: '30px 20px' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>Iconic Treatments</div>
        
        {/* Danh sách dịch vụ - Dạng lưới sắc nét */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0' }}>
          
          <div className="service-card" style={{ backgroundColor: '#fff', border: 'none', padding: '20px 10px', textAlign: 'center' }}>
            <div style={{ height: '100px', backgroundColor: '#F9F9F9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '24px', color: '#000' }}>RF</div>
            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Microneedling</div>
            <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>680,000₫</div>
          </div>

          <div className="service-card" style={{ backgroundColor: '#fff', border: 'none', padding: '20px 10px', textAlign: 'center' }}>
            <div style={{ height: '100px', backgroundColor: '#F9F9F9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '24px', color: '#000' }}>VC</div>
            <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Vitamin C</div>
            <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>450,000₫</div>
          </div>
          
        </div>

        <div className="section-title" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '24px' }}>Boutique</div>
        
        {/* Sản phẩm thiết kế đơn sắc */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ display: 'flex', gap: '16px', border: '1px solid #EEEEEE', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '100px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', letterSpacing: '1px' }}>SERUM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium HA+</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '4px' }}>Hyaluronic Acid Complex</div>
              <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '12px' }}>320,000₫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;