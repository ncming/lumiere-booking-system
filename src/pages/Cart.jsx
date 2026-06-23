import { useApp } from '../context/AppContext';

const formatPrice = (num) =>
  num === 0 ? '—' : num.toLocaleString('vi-VN') + '₫';

const Cart = ({ setActiveTab }) => {
  const { cartItems, cartTotal, removeFromCart, updateQty, showToast, clearCart } = useApp();

  const handleCheckout = () => {
    showToast('Purchase confirmed. Your order is on its way.');
    setTimeout(() => {
      clearCart();
      setActiveTab('/');
    }, 1200);
  };

  return (
    <div className="screen active" style={{ paddingBottom: '80px', width: '100%', paddingTop: '80px' }}>

      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #EEEEEE' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px' }}>SHOPPING BAG</h2>
        {cartItems.length > 0 && (
          <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '1px', marginTop: '6px' }}>
            {cartItems.reduce((s, i) => s + i.qty, 0)} {cartItems.reduce((s, i) => s + i.qty, 0) === 1 ? 'item' : 'items'}
          </div>
        )}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px' }}>

        {cartItems.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1" style={{ marginBottom: '20px' }}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Your bag is empty</div>
            <div style={{ fontSize: '11px', color: '#757575', marginBottom: '28px' }}>Discover our new collections</div>
            <button onClick={() => setActiveTab('/explore')} style={{ padding: '14px 32px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Explore Collections
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div style={{ marginBottom: '32px' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedOption}`} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: '1px solid #EEEEEE', alignItems: 'flex-start' }}>

                  {/* Thumbnail */}
                  <div style={{ width: '70px', height: '90px', flexShrink: 0, backgroundColor: '#F9F9F9', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#757575', textTransform: 'uppercase', marginBottom: '4px' }}>{item.category}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '10px', color: '#757575', marginBottom: '12px' }}>{item.selectedOption}</div>

                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0' }}>
                        <button onClick={() => updateQty(item.id, item.selectedOption, -1)} style={{ width: '30px', height: '30px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#000' }}>−</button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '12px' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.selectedOption, 1)} style={{ width: '30px', height: '30px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#000' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.selectedOption)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BDBDBD', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', padding: 0 }}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', flexShrink: 0, textAlign: 'right' }}>
                    {formatPrice(item.priceNum * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Complimentary note */}
            <div style={{ backgroundColor: '#F9F9F9', padding: '14px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '0.5px', lineHeight: 1.6, textAlign: 'center' }}>
                Complimentary gift wrapping · Free delivery on all orders
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ borderTop: '1px solid #000', paddingTop: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>
                <span>TOTAL</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div style={{ fontSize: '9px', color: '#BDBDBD', letterSpacing: '0.5px', marginTop: '8px' }}>
                Tax included · Customs duties may apply for international orders
              </div>
            </div>

            {/* Book appointment CTA */}
            <div style={{ border: '1px solid #EEEEEE', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Personal Styling Session</div>
                <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '0.5px' }}>Book a private appointment at our Flagship Store</div>
              </div>
              <button onClick={() => setActiveTab('/reserve')} style={{ padding: '10px 16px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Book →
              </button>
            </div>

            {/* Checkout */}
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '17px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer' }}
              onClick={handleCheckout}
            >
              COMPLETE PURCHASE
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;