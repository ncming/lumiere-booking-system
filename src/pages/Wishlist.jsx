import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/format';
import { PRODUCTS } from '../data/products';

const Wishlist = ({ setActiveTab }) => {
  const { wishlistItems, removeFromWishlist, addToCart, toggleBag } = useApp();

  const handleMoveToCart = (item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      addToCart(product, product.options[0]);
      removeFromWishlist(item.id);
      toggleBag();
    }
  };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFFFF', paddingTop: '68px', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '32px 24px 20px',
        borderBottom: '1px solid #EEEEEE',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '8px' }}>
          My Selection
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 3vw, 32px)',
          fontWeight: '400', letterSpacing: '3px', marginBottom: '6px',
        }}>
          Wishlist
        </h1>
        {wishlistItems.length > 0 && (
          <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '1px' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </div>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        /* Empty State */
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '80px 24px', textAlign: 'center',
        }}>
          {/* Heart outline icon */}
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1" style={{ marginBottom: '24px' }}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000', marginBottom: '8px' }}>
            Your wishlist is empty
          </div>
          <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.7, maxWidth: '320px', marginBottom: '32px' }}>
            Save your favourite pieces to your wishlist and return to them whenever you like.
          </p>
          <button
            onClick={() => setActiveTab('/explore')}
            style={{
              padding: '14px 40px', backgroundColor: '#000', color: '#fff',
              border: '1px solid #000', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
          >
            Explore Collections
          </button>
        </div>
      ) : (
        /* Wishlist Grid */
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 60px)' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(20px, 3vw, 36px)',
          }}>
            {wishlistItems.map((item) => (
              <div key={item.id} style={{ position: 'relative' }}>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  style={{
                    position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                    width: '32px', height: '32px',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    border: '1px solid #E0E0E0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.querySelector('svg').style.stroke = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.92)'; e.currentTarget.querySelector('svg').style.stroke = '#000'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                {/* Image */}
                <div
                  onClick={() => setActiveTab(`/product/${item.id}`)}
                  style={{
                    width: '100%', aspectRatio: '4/5',
                    backgroundColor: '#F9F9F9', overflow: 'hidden',
                    marginBottom: '14px', cursor: 'pointer',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Info */}
                <div style={{ textAlign: 'center', padding: '0 4px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#BDBDBD', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.category}
                  </div>
                  <div
                    onClick={() => setActiveTab(`/product/${item.id}`)}
                    style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#000', marginBottom: '4px', cursor: 'pointer' }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#757575', marginBottom: '14px' }}>
                    {item.price}
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    style={{
                      width: '100%', padding: '11px',
                      backgroundColor: '#000', color: '#fff',
                      border: '1px solid #000',
                      fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
                  >
                    Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '40px', borderTop: '1px solid #EEEEEE' }}>
            <button
              onClick={() => setActiveTab('/explore')}
              style={{
                padding: '13px 40px', backgroundColor: '#fff', color: '#000',
                border: '1px solid #E0E0E0', fontSize: '10px', letterSpacing: '2px',
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#000'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#E0E0E0'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
