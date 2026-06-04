import { useState } from 'react';

const Explore = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Medium Lady Bag', price: '165,000,000₫', category: 'Bags' },
    { id: 2, name: 'Rouge Velvet Lipstick', price: '1,250,000₫', category: 'Makeup' },
    { id: 3, name: 'J`adore Eau de Parfum', price: '4,500,000₫', category: 'Fragrance' },
    { id: 4, name: 'Pleated Midi Skirt', price: '85,000,000₫', category: 'Ready-to-Wear' },
    { id: 5, name: 'Tribales Earrings', price: '18,500,000₫', category: 'Jewelry' },
    { id: 6, name: 'Prestige Rose Serum', price: '9,800,000₫', category: 'Skincare' },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%', paddingTop: '80px' }}>
      
      <div style={{ padding: '20px 20px 10px', borderBottom: '1px solid #EEEEEE' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px', textAlign: 'center', marginBottom: '20px' }}>BOUTIQUE CATALOGUE</h2>
        <input 
          type="search" 
          placeholder="SEARCH PRODUCTS..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', fontSize: '11px', padding: '10px 0', border: 'none', 
            borderBottom: '1px solid #000', backgroundColor: 'transparent',
            letterSpacing: '1px', textTransform: 'uppercase'
          }}
        />
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setActiveTab('/booking')}
              style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #EEEEEE', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <div style={{ width: '60px', height: '60px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#000' }}>
                {product.name.charAt(0)}
              </div>
              <div style={{ flex: 1, marginLeft: '16px' }}>
                <div style={{ fontSize: '9px', color: '#757575', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.name}</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '400', color: '#000' }}>{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;