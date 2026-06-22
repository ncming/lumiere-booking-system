import { useState } from 'react';
import { PRODUCTS } from '../data/products';

const Explore = ({ selectedCategory = "ALL", setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // STATE KÍCH HOẠT BƯỚC 1: Lưu trữ sản phẩm đang được bấm vào để mở Modal
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); // Lưu màu sắc/dung tích khách chọn
  const [activeTabDetail, setActiveTabDetail] = useState('desc'); // Accordion trong modal

  // 1. Lọc theo danh mục từ Menu truyền sang
  let filtered = PRODUCTS;
  if (selectedCategory !== "ALL") {
    filtered = PRODUCTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  // 2. Lọc tiếp theo từ khóa gõ vào ô search
  if (searchQuery.trim() !== '') {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Khi bấm vào 1 card -> Mở Modal thay vì nhảy sang Cart
  const handleOpenQuickView = (product) => {
    setActiveModalProduct(product);
    setSelectedOption(product.options[0]); // Mặc định chọn option đầu tiên
  };

  const handleAddToCart = () => {
    alert(`✦ Added "${activeModalProduct.name} - ${selectedOption}" to your Shopping Bag.`);
    setActiveModalProduct(null); // Đóng modal
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%', paddingTop: '80px', backgroundColor: '#FFFFFF' }}>
      
      {/* Header hiển thị tên Danh mục đang xem */}
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

      {/* Lưới sản phẩm */}
      <div style={{ padding: '30px 20px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#757575', fontSize: '11px', letterSpacing: '1px' }}>NO PRODUCTS FOUND IN THIS CATEGORY.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '2px', backgroundColor: '#EEEEEE', border: '1px solid #EEEEEE' }}>
            {filtered.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleOpenQuickView(product)} /* BẤM VÀO MỞ MODAL */
                style={{ backgroundColor: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#F9F9F9', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '400', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{product.name}</div>
                  <div style={{ fontSize: '11px', color: '#757575' }}>{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL XEM CHI TIẾT SẢN PHẨM (BƯỚC 1) ================= */}
      {activeModalProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backdropFilter: 'blur(2px)' }}>
          
          {/* Khối nội dung trượt từ dưới lên */}
          <div style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', backgroundColor: '#FFFFFF', overflowY: 'auto', padding: '30px 20px', position: 'relative', borderTop: '1px solid #000', animation: 'slideUp 0.3s ease-out' }}>
            
            {/* Nút X đóng Modal */}
            <div onClick={() => setActiveModalProduct(null)} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>✕</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{activeModalProduct.category}</div>
              <h3 style={{ fontSize: '24px', fontWeight: '400', letterSpacing: '2px', marginBottom: '12px', fontFamily: '"Playfair Display", serif' }}>{activeModalProduct.name}</h3>
              <div style={{ fontSize: '14px', marginBottom: '24px', color: '#000' }}>{activeModalProduct.price}</div>

              {/* Khung ảnh to trong Modal */}
              <div style={{ width: '100%', maxWidth: '320px', aspectRatio: '1', backgroundColor: '#F9F9F9', marginBottom: '30px' }}>
                <img src={activeModalProduct.image} alt={activeModalProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Chọn Option (Màu / Size) */}
              <div style={{ width: '100%', marginBottom: '30px', textAlign: 'left' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', color: '#757575' }}>Select Option: <span style={{ color: '#000', fontWeight: '600' }}>{selectedOption}</span></div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {activeModalProduct.options.map((opt, i) => (
                    <button 
                      key={i} onClick={() => setSelectedOption(opt)}
                      style={{ padding: '10px 18px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', border: selectedOption === opt ? '1px solid #000' : '1px solid #E0E0E0', backgroundColor: selectedOption === opt ? '#000' : '#fff', color: selectedOption === opt ? '#fff' : '#000', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nút THÊM VÀO GIỎ HÀNG */}
              <button 
                onClick={handleAddToCart}
                style={{ width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', border: '1px solid #000', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '11px', cursor: 'pointer', marginBottom: '40px' }}
              >
                Add To Shopping Bag
              </button>

              {/* Mini Accordion Tabs */}
              <div style={{ width: '100%', borderTop: '1px solid #EEEEEE', paddingTop: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #EEEEEE', paddingBottom: '10px', marginBottom: '16px' }}>
                  <span onClick={() => setActiveTabDetail('desc')} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: activeTabDetail === 'desc' ? '700' : '400', color: activeTabDetail === 'desc' ? '#000' : '#757575' }}>Description</span>
                  <span onClick={() => setActiveTabDetail('det')} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: activeTabDetail === 'det' ? '700' : '400', color: activeTabDetail === 'det' ? '#000' : '#757575' }}>Details</span>
                </div>
                <div style={{ fontSize: '12px', color: '#757575', lineHeight: '1.6' }}>
                  {activeTabDetail === 'desc' ? activeModalProduct.description : activeModalProduct.details}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Explore;