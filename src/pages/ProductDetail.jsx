import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useApp } from '../context/AppContext';

const ProductDetail = ({ productId, setActiveTab }) => {
  const product = PRODUCTS.find(p => p.id === productId);
  const { addToCart, toggleBag } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [activeTab, setActiveInfoTab] = useState('desc');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#757575', marginBottom: '16px' }}>PRODUCT NOT FOUND</div>
          <button onClick={() => setActiveTab('/explore')} style={{ padding: '12px 28px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const initialOption = product.options[0];
  const currentOption = selectedOption || initialOption;

  // "Complete The Look" — filter out self, limit to 3
  const lookProducts = (product.completeLook || [])
    .filter(id => id !== product.id)
    .slice(0, 3)
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToBag = () => {
    addToCart(product, currentOption);
    toggleBag();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Breadcrumb */}
      <div style={{ padding: '20px clamp(16px, 4vw, 60px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          onClick={() => setActiveTab('/')}
          style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', cursor: 'pointer' }}
          onMouseOver={e => e.target.style.color = '#000'}
          onMouseOut={e => e.target.style.color = '#BDBDBD'}
        >
          Home
        </span>
        <span style={{ fontSize: '9px', color: '#BDBDBD' }}>—</span>
        <span
          onClick={() => setActiveTab(`/category/${product.category}`)}
          style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', cursor: 'pointer' }}
          onMouseOver={e => e.target.style.color = '#000'}
          onMouseOut={e => e.target.style.color = '#BDBDBD'}
        >
          {product.category}
        </span>
        <span style={{ fontSize: '9px', color: '#BDBDBD' }}>—</span>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
          {product.name}
        </span>
      </div>

      {/* Main 2-col layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: '0',
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 60px)',
      }}>

        {/* LEFT: Gallery */}
        <div style={{ paddingRight: 'clamp(0px, 3vw, 48px)' }}>
          {/* Main Image with Zoom */}
          <div
            style={{
              width: '100%',
              aspectRatio: '4/5',
              backgroundColor: '#F9F9F9',
              overflow: 'hidden',
              cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              position: 'relative',
              marginBottom: '12px',
            }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
              }}
            />
            {/* Zoom hint */}
            {!isZoomed && (
              <div style={{
                position: 'absolute', bottom: '12px', right: '12px',
                fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                backgroundColor: 'rgba(0,0,0,0.35)',
                padding: '5px 10px',
                backdropFilter: 'blur(4px)',
              }}>
                Hover to zoom
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  style={{
                    width: '72px',
                    height: '90px',
                    flexShrink: 0,
                    cursor: 'pointer',
                    border: `1px solid ${activeImageIndex === i ? '#000' : 'transparent'}`,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div style={{ paddingLeft: 'clamp(0px, 3vw, 48px)', paddingTop: 'clamp(24px, 3vw, 0px)' }}>

          {/* Category tag */}
          <div style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#757575', marginBottom: '12px' }}>
            {product.category}
          </div>

          {/* Product Name */}
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: '400',
            letterSpacing: '2px',
            lineHeight: 1.2,
            marginBottom: '16px',
            color: '#000',
            textTransform: 'none',
          }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '1px', marginBottom: '28px', color: '#000' }}>
            {product.price}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#EEEEEE', marginBottom: '28px' }} />

          {/* Option Selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#757575', marginBottom: '12px' }}>
              Select: <span style={{ color: '#000', fontWeight: '600' }}>{currentOption}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  style={{
                    padding: '10px 16px',
                    border: `1px solid ${currentOption === opt ? '#000' : '#E0E0E0'}`,
                    backgroundColor: currentOption === opt ? '#000' : '#FFFFFF',
                    color: currentOption === opt ? '#FFFFFF' : '#000',
                    fontSize: '10px', letterSpacing: '1px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag CTA */}
          <button
            onClick={handleAddToBag}
            style={{
              width: '100%', padding: '17px',
              backgroundColor: '#000', color: '#fff', border: '1px solid #000',
              fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
              cursor: 'pointer', marginBottom: '12px',
              transition: 'all 0.25s',
            }}
            onMouseOver={e => { e.target.style.backgroundColor = '#2A2A2A'; }}
            onMouseOut={e => { e.target.style.backgroundColor = '#000'; }}
          >
            Add To Shopping Bag
          </button>

          {/* Reserve Appointment */}
          <button
            onClick={() => setActiveTab('/reserve')}
            style={{
              width: '100%', padding: '15px',
              backgroundColor: '#FFFFFF', color: '#000', border: '1px solid #E0E0E0',
              fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
              cursor: 'pointer', marginBottom: '28px',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={e => { e.target.style.borderColor = '#000'; }}
            onMouseOut={e => { e.target.style.borderColor = '#E0E0E0'; }}
          >
            ✦ Book a Styling Session
          </button>

          {/* Trust badges */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px', marginBottom: '28px',
          }}>
            {[
              { icon: '🎁', label: 'Gift Wrapping' },
              { icon: '🚚', label: 'Free Delivery' },
              { icon: '↩', label: 'Easy Returns' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ textAlign: 'center', padding: '12px 4px', border: '1px solid #F2F2F2' }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{icon}</div>
                <div style={{ fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Info tabs */}
          <div style={{ borderTop: '1px solid #EEEEEE', paddingTop: '20px' }}>
            <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #EEEEEE', paddingBottom: '12px', marginBottom: '16px' }}>
              {['desc', 'details', 'care'].map(tab => (
                <span
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  style={{
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer',
                    color: activeTab === tab ? '#000' : '#BDBDBD',
                    fontWeight: activeTab === tab ? '600' : '400',
                    borderBottom: activeTab === tab ? '1px solid #000' : '1px solid transparent',
                    paddingBottom: '12px',
                    marginBottom: '-13px',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab === 'desc' ? 'Description' : tab === 'details' ? 'Details' : 'Care Guide'}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#757575', lineHeight: 1.8 }}>
              {activeTab === 'desc' && product.description}
              {activeTab === 'details' && product.details}
              {activeTab === 'care' && 'Store in the provided dust bag away from direct light. For leather goods, use a soft cloth. Avoid contact with water, cosmetics, and perfumes. Professional cleaning recommended.'}
            </div>
          </div>
        </div>
      </div>

      {/* "Complete The Look" */}
      {lookProducts.length > 0 && (
        <div style={{ maxWidth: '1300px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 60px)' }}>
          <div style={{ borderTop: '1px solid #EEEEEE', paddingTop: '48px', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#EEEEEE' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#757575', marginBottom: '4px' }}>
                Styled by Lumière
              </div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                fontWeight: '400', letterSpacing: '3px',
                textTransform: 'none', color: '#000',
              }}>
                Complete The Look
              </h2>
            </div>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#EEEEEE' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${lookProducts.length}, 1fr)`,
            gap: 'clamp(12px, 3vw, 32px)',
          }}>
            {lookProducts.map(p => (
              <div
                key={p.id}
                onClick={() => setActiveTab(`/product/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: '#F9F9F9', overflow: 'hidden', marginBottom: '12px' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ textAlign: 'center', padding: '0 4px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#BDBDBD', textTransform: 'uppercase', marginBottom: '4px' }}>{p.category}</div>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#000', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#757575' }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
