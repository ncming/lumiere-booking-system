const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active" style={{ width: '100%' }}>
      <div className="nav" style={{ padding: '14px 20px' }}>
        <span className="nav-brand">Lumière</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input type="search" placeholder="Search services..." style={{ width: 'auto', minWidth: '100px', fontSize: '13px', padding: '8px 12px' }} />
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>N</div>
        </div>
      </div>

      <div style={{ padding: '20px', background: '#F9F9F9' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#B8855D', letterSpacing: '0.6px', marginBottom: '8px', textTransform: 'uppercase' }}>Featured This Month</div>
        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1A1410', lineHeight: '1.3', marginBottom: '12px' }}>Skin Rejuvenation</h2>
        <div style={{ fontSize: '14px', color: '#7A6F68', marginBottom: '16px', fontWeight: '400' }}>Advanced RF Microneedling Technology</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn-primary" style={{ fontSize: '14px', padding: '10px 18px' }} onClick={() => setActiveTab('/booking')}>
            Book Now
          </button>
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#B8855D' }}>680,000₫</span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div className="section-title">Popular Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          <div className="service-card">
            <div className="service-img">RF</div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Microneedling</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '4px' }}>680,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">V</div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Vitamin C</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '4px' }}>450,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">H</div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Hydrating</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '4px' }}>380,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">A</div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Anti-Aging</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '4px' }}>520,000₫</div>
            </div>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: '20px' }}>Best Sellers</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ display: 'flex', gap: '14px' }}>
            <div style={{ width: '56px', height: '56px', background:'#000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#fff', fontSize: '12px', flexShrink: 0 }}>SERUM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Premium HA+ Serum</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '2px' }}>Hyaluronic Acid Complex</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#B8855D', marginTop: '6px' }}>320,000₫</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '14px' }}>
            <div style={{ width: '56px', height: '56px', background:'#000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#fff', fontSize: '12px', flexShrink: 0 }}>SPF50</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Sunscreen SPF 50</div>
              <div style={{ fontSize: '12px', color: '#7A6F68', marginTop: '2px' }}>Daily UV Protection</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#B8855D', marginTop: '6px' }}>250,000₫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
