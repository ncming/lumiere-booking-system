const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active">
      <div className="nav">
        <span className="nav-brand">Lumière</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="search" placeholder="Search services..." style={{ width: '120px', fontSize: '12px' }} />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #B8855D 0%, #A0714D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>N</div>
        </div>
      </div>

      <div style={{ padding: '18px', background: 'linear-gradient(135deg, #F5EBE0 0%, #ECD9C6 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#B8855D', letterSpacing: '0.6px', marginBottom: '6px', textTransform: 'uppercase' }}>Featured This Month</div>
        <h2 style={{ fontSize: '26px', fontWeight: '600', color: '#1A1410', lineHeight: '1.3', marginBottom: '10px' }}>Skin Rejuvenation</h2>
        <div style={{ fontSize: '13px', color: '#7A6F68', marginBottom: '14px', fontWeight: '400' }}>Advanced RF Microneedling Technology</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn-primary" style={{ fontSize: '13px', padding: '9px 16px' }} onClick={() => setActiveTab('/booking')}>
            Book Now
          </button>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#B8855D' }}>680,000₫</span>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div className="section-title">Popular Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <div className="service-card">
            <div className="service-img">RF</div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Microneedling</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>680,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">V</div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Vitamin C</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>450,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">H</div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Hydrating</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>380,000₫</div>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">A</div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Anti-Aging</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>520,000₫</div>
            </div>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: '18px' }}>Best Sellers</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #B8855D 0%, #A0714D 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#fff', fontSize: '12px', flexShrink: 0 }}>SERUM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Premium HA+ Serum</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>Hyaluronic Acid Complex</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#B8855D', marginTop: '4px' }}>320,000₫</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #F5EBE0 0%, #E8D5C0 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#B8855D', fontSize: '12px', flexShrink: 0 }}>SPF50</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>Sunscreen SPF 50</div>
              <div style={{ fontSize: '11px', color: '#7A6F68', marginTop: '2px' }}>Daily UV Protection</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#B8855D', marginTop: '4px' }}>250,000₫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;