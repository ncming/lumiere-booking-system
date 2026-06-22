import { useState } from 'react';
import { PRODUCTS } from '../data/products';

const Explore = ({ selectedCategory = "ALL", setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); 
  const [activeTabDetail, setActiveTabDetail] = useState('desc'); 

  // 1. Lọc theo danh mục
  let filtered = PRODUCTS;
  if (selectedCategory !== "ALL") {
    filtered = PRODUCTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  // 2. Lọc theo từ khóa search
  if (searchQuery.trim() !== '') {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // 3. Nhóm sản phẩm theo từng Category
  const groupedProducts = filtered.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleOpenQuickView = (product) => {
    setActiveModalProduct(product);
    setSelectedOption(product.options[0]); 
  };

  const handleAddToCart = () => {
    alert(`✦ Added "${activeModalProduct.name} - ${selectedOption}" to your Shopping Bag.`);
    setActiveModalProduct(null); 
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%', paddingTop: '80px', backgroundColor: '#FFFFFF' }}>
      
      {/* Header Danh mục */}
      <div style={{ padding: '20px 20px 10px', borderBottom: '1px solid #EEEEEE', textAlign: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px', marginBottom: '20px' }}>
          {selectedCategory === "ALL" ? "THE COMPLETE CATALOGUE" : selectedCategory.toUpperCase()}
        </h2>
        <input 
          type="search" 
          placeholder={`SEARCH IN ${selectedCategory === "ALL" ? "ALL ITEMS" : selectedCategory.toUpperCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', fontSize: '10px', padding: '10px 0', border: 'none', borderBottom: '1px solid #000', backgroundColor: 'transparent', letterSpacing: '1px', textTransform: 'uppercase', outline: 'none' }}
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div style={{ padding: '30px max(20px, 4vw)', maxWidth: '1300px', margin: '0 auto' }}>
        {Object.keys(groupedProducts).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#757575', fontSize: '11px', letterSpacing: '1px' }}>NO PRODUCTS FOUND.</div>
        ) : (
          Object.keys(groupedProducts).map((catName) => (
            <div key={catName} style={{ marginBottom: '60px' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: '#000', borderBottom: '1px solid #000', paddingBottom: '8px', display: 'inline-block' }}>
                  {catName}
                </h3>
              </div>

              {/* GỌI CLASS "LUXURY-GRID" VỪA VIẾT Ở BƯỚC 1 */}
              <div className="luxury-grid">
                {groupedProducts[catName].map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => handleOpenQuickView(product)} 
                    style={{ 
                      backgroundColor: '#fff', cursor: 'pointer', display: 'flex', 
                      flexDirection: 'column', justifyContent: 'space-between',
                      /* Đã xóa maxWidth: 220px, cho phép thẻ tự động co giãn 100% theo ô lưới */
                      width: '100%' 
                    }}
                  >
                    {/* Khung ảnh với tỷ lệ cố định 4:5 (chuẩn chân dung người mẫu/túi xách) */}
                    <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: '#F9F9F9', overflow: 'hidden', marginBottom: '16px' }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '0 4px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '400', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', lineHeight: '1.4' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#757575' }}>
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>

      {/* MODAL XEM CHI TIẾT SẢN PHẨM (Giữ nguyên) */}
      {activeModalProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(3px)', padding: '16px' }}>
          <div style={{ width: 'min(100%, 480px)', maxHeight: '85vh', backgroundColor: '#FFFFFF', overflowY: 'auto', padding: '24px 20px', position: 'relative', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
            <div onClick={() => setActiveModalProduct(null)} style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '20px', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', borderRadius: '50%' }}>✕</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{activeModalProduct.category}</div>
              <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '400', letterSpacing: '2px', marginBottom: '12px', fontFamily: '"Playfair Display", serif' }}>{activeModalProduct.name}</h3>
              <div style={{ fontSize: '14px', marginBottom: '20px', color: '#000' }}>{activeModalProduct.price}</div>
              <div style={{ width: '100%', maxWidth: '320px', aspectRatio: '1', backgroundColor: '#F9F9F9', marginBottom: '24px' }}>
                <img src={activeModalProduct.image} alt={activeModalProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ width: '100%', marginBottom: '20px', textAlign: 'left' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', color: '#757575' }}>Select Option: <span style={{ color: '#000', fontWeight: '600' }}>{selectedOption}</span></div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {activeModalProduct.options.map((opt, i) => (
                    <button key={i} onClick={() => setSelectedOption(opt)} style={{ padding: '10px 14px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', border: selectedOption === opt ? '1px solid #000' : '1px solid #E0E0E0', backgroundColor: selectedOption === opt ? '#000' : '#fff', color: selectedOption === opt ? '#fff' : '#000', cursor: 'pointer', transition: 'all 0.2s' }}>{opt}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleAddToCart} style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #000', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '11px', cursor: 'pointer', marginBottom: '28px' }}>Add To Shopping Bag</button>
              <div style={{ width: '100%', borderTop: '1px solid #EEEEEE', paddingTop: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #EEEEEE', paddingBottom: '10px', marginBottom: '16px' }}>
                  <span onClick={() => setActiveTabDetail('desc')} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: activeTabDetail === 'desc' ? '700' : '400', color: activeTabDetail === 'desc' ? '#000' : '#757575' }}>Description</span>
                  <span onClick={() => setActiveTabDetail('det')} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: activeTabDetail === 'det' ? '700' : '400', color: activeTabDetail === 'det' ? '#000' : '#757575' }}>Details</span>
                </div>
                <div style={{ fontSize: '12px', color: '#757575', lineHeight: '1.6' }}>{activeTabDetail === 'desc' ? activeModalProduct.description : activeModalProduct.details}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Explore;