import { useState } from 'react';

const Explore = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 1, name: 'Microneedling RF', price: '680,000₫', description: 'Anti-aging treatment' },
    { id: 2, name: 'Vitamin C Facial', price: '450,000₫', description: 'Brightening boost' },
    { id: 3, name: 'Hydrating Mask', price: '380,000₫', description: 'Deep moisture therapy' },
    { id: 4, name: 'Anti-Aging Protocol', price: '520,000₫', description: 'Complete renewal' },
    { id: 5, name: 'Chemical Peel', price: '580,000₫', description: 'Skin resurfacing' },
    { id: 6, name: 'Collagen Boost', price: '620,000₫', description: 'Firming treatment' },
  ];

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="screen active" style={{ paddingBottom: '80px' }}>
      <div className="nav">
        <span className="nav-brand">Services</span>
        <input 
          type="search" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100px', fontSize: '12px' }}
        />
      </div>

      <div style={{ padding: '16px' }}>
        <div className="section-title">All Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="service-card"
              onClick={() => setActiveTab('/booking')}
            >
              <div className="service-img">{service.name.charAt(0)}</div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1410' }}>{service.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{service.description}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', marginTop: '6px' }}>{service.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;