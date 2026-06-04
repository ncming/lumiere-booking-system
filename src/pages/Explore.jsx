import { useState } from 'react';

const Explore = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 1, name: 'Microneedling RF', price: '680,000₫', category: 'Treatment' },
    { id: 2, name: 'Vitamin C Facial', price: '450,000₫', category: 'Brightening' },
    { id: 3, name: 'Hydrating Mask', price: '380,000₫', category: 'Moisture' },
    { id: 4, name: 'Anti-Aging Protocol', price: '520,000₫', category: 'Renewal' },
    { id: 5, name: 'Chemical Peel', price: '580,000₫', category: 'Resurfacing' },
    { id: 6, name: 'Collagen Boost', price: '620,000₫', category: 'Firming' },
  ];

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%' }}>
      
      {/* Header & Search tối giản */}
      <div style={{ padding: '20px 20px 10px', borderBottom: '1px solid #EEEEEE' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px', textAlign: 'center', marginBottom: '20px' }}>DISCOVER</h2>
        <input 
          type="search" 
          placeholder="SEARCH SERVICES..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', 
            fontSize: '11px', 
            padding: '10px 0', 
            border: 'none', 
            borderBottom: '1px solid #000', 
            backgroundColor: 'transparent',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        />
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setActiveTab('/booking')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px', 
                border: '1px solid #EEEEEE', 
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ width: '60px', height: '60px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#000' }}>
                {service.name.charAt(0)}
              </div>
              <div style={{ flex: 1, marginLeft: '16px' }}>
                <div style={{ fontSize: '9px', color: '#757575', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{service.category}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{service.name}</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '400', color: '#000' }}>{service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;