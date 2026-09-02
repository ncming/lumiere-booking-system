import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/format';

const CartDrawer = ({ setCurrentPath }) => {
  const { cartItems, cartTotal, cartCount, isBagOpen, closeBag, removeFromCart, updateQty } = useApp();

  const handleViewBag = () => {
    closeBag();
    setCurrentPath('/cart');
  };

  // FIX BUG-03: Checkout navigates to /cart (the checkout page in this SPA).
  // Both go to /cart, but semantically: View Bag = browse, Checkout = intent to pay.
  const handleCheckout = () => {
    closeBag();
    setCurrentPath('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeBag}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          zIndex: 150,
          opacity: isBagOpen ? 1 : 0,
          visibility: isBagOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
        }}
      />

      {/* Drawer Panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: 'min(420px, 92vw)',
        backgroundColor: '#FFFFFF',
        zIndex: 160,
        display: 'flex',
        flexDirection: 'column',
        transform: isBagOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #EEEEEE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#757575', marginBottom: '4px' }}>
              YOUR
            </div>
            <div style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '400' }}>
              Shopping Bag
              {cartCount > 0 && (
                <span style={{ marginLeft: '8px', fontSize: '10px', color: '#757575' }}>
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>
          </div>
          <button
            onClick={closeBag}
            aria-label="Close shopping bag"
            style={{ cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', padding: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '60%', gap: '16px', padding: '40px',
            }}>
              {/* Empty bag icon */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000', marginBottom: '8px' }}>
                  Your bag is empty
                </div>
                <div style={{ fontSize: '11px', color: '#757575', lineHeight: '1.6' }}>
                  Discover our new collections
                </div>
              </div>
              <button
                onClick={() => { closeBag(); setCurrentPath('/explore'); }}
                style={{
                  marginTop: '8px', padding: '12px 28px',
                  backgroundColor: '#000', color: '#fff', border: 'none',
                  fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedOption}`} style={{
                  display: 'flex', gap: '16px', padding: '20px 24px',
                  borderBottom: '1px solid #EEEEEE',
                  alignItems: 'flex-start',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: '70px', height: '90px', flexShrink: 0,
                    backgroundColor: '#F9F9F9', overflow: 'hidden',
                  }}>
                    <img src={item.image} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#757575', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px', lineHeight: 1.3 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#757575', marginBottom: '10px' }}>
                      {item.selectedOption}
                    </div>
                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0' }}>
                        <button onClick={() => updateQty(item.id, item.selectedOption, -1)} style={{ width: '28px', height: '28px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#000' }}>−</button>
                        <span style={{ width: '28px', textAlign: 'center', fontSize: '11px' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.selectedOption, 1)} style={{ width: '28px', height: '28px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#000' }}>+</button>
                      </div>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                      {formatPrice(item.priceNum * item.qty)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedOption)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BDBDBD', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', padding: 0 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid #EEEEEE', padding: '20px 24px', backgroundColor: '#FFFFFF' }}>
            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'baseline' }}>
              <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#757575' }}>Subtotal</span>
              <span style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* Service note */}
            <div style={{
              fontSize: '9px', color: '#757575', letterSpacing: '0.5px',
              textAlign: 'center', marginBottom: '16px', lineHeight: 1.6,
            }}>
              Complimentary shipping · Gift wrapping available
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleViewBag}
                style={{
                  flex: 1, padding: '13px', fontSize: '10px', letterSpacing: '2px',
                  textTransform: 'uppercase', border: '1px solid #000',
                  backgroundColor: '#fff', color: '#000', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => { e.target.style.backgroundColor = '#F9F9F9'; }}
                onMouseOut={e => { e.target.style.backgroundColor = '#fff'; }}
              >
                View Bag
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  flex: 1, padding: '13px', fontSize: '10px', letterSpacing: '2px',
                  textTransform: 'uppercase', border: '1px solid #000',
                  backgroundColor: '#000', color: '#fff', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => { e.target.style.backgroundColor = '#333'; }}
                onMouseOut={e => { e.target.style.backgroundColor = '#000'; }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
