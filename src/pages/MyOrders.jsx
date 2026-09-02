// My Orders Page - View user's order history
import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const MyOrders = ({ setActiveTab }) => {
  const { isAuthenticated, showToast } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      showToast('✕ Failed to load orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveTab('/auth');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders();
  }, [isAuthenticated, setActiveTab, loadOrders]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      await api.cancelOrder(orderId, 'Cancelled by customer');
      showToast('✦ Order cancelled successfully');
      loadOrders();
    } catch (error) {
      showToast('✕ ' + (error.message || 'Failed to cancel order'));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PROCESSING':
        return { bg: '#FFF3E0', color: '#E65100' };
      case 'SHIPPED':
        return { bg: '#E3F2FD', color: '#1565C0' };
      case 'DELIVERED':
        return { bg: '#E8F5E9', color: '#2E7D32' };
      case 'CANCELLED':
      case 'REFUNDED':
        return { bg: '#FFEBEE', color: '#C62828' };
      default:
        return { bg: '#F5F5F5', color: '#757575' };
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '68px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Your Purchases
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '400', letterSpacing: '3px', marginBottom: '12px' }}>
          My Orders
        </h1>
        <p style={{ fontSize: '11px', color: '#757575', letterSpacing: '0.5px' }}>
          Track and manage your orders
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#757575', fontSize: '11px', letterSpacing: '1px' }}>
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.3 }}>✦</div>
            <div style={{ fontSize: '13px', color: '#757575', marginBottom: '8px' }}>
              No orders yet
            </div>
            <div style={{ fontSize: '11px', color: '#BDBDBD', marginBottom: '32px' }}>
              Start shopping to see your orders here
            </div>
            <button
              onClick={() => setActiveTab('/explore')}
              style={{ padding: '14px 40px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => {
              const statusStyle = getStatusColor(order.status);
              const orderDate = new Date(order.createdAt);

              return (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #E0E0E0',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {/* Order Header */}
                  <div style={{ 
                    padding: '20px 24px', 
                    backgroundColor: '#F9F9F9', 
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#BDBDBD', marginBottom: '4px' }}>
                        Order #{order.id.slice(-8)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#757575' }}>
                        Placed on {orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      fontSize: '9px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                    }}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: '24px' }}>
                    {order.items && order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          marginBottom: idx < order.items.length - 1 ? '16px' : '0',
                          paddingBottom: idx < order.items.length - 1 ? '16px' : '0',
                          borderBottom: idx < order.items.length - 1 ? '1px solid #F0F0F0' : 'none',
                        }}
                      >
                        {item.product?.images?.[0] && (
                          <div style={{ width: '80px', height: '80px', backgroundColor: '#F9F9F9', flexShrink: 0 }}>
                            <img
                              src={item.product.images[0]}
                              alt={item.productName}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                            {item.productName}
                          </div>
                          <div style={{ fontSize: '11px', color: '#757575', marginBottom: '8px' }}>
                            {item.size && `Size: ${item.size}`}
                            {item.color && ` • Color: ${item.color}`}
                          </div>
                          <div style={{ fontSize: '11px', color: '#000' }}>
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div style={{ 
                    padding: '20px 24px', 
                    backgroundColor: '#F9F9F9', 
                    borderTop: '1px solid #E0E0E0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}>
                    <div>
                      {order.trackingNumber && (
                        <div style={{ fontSize: '11px', color: '#757575', marginBottom: '4px' }}>
                          Tracking: <span style={{ color: '#000', fontWeight: '500' }}>{order.trackingNumber}</span>
                        </div>
                      )}
                      <div style={{ fontSize: '11px', color: '#757575' }}>
                        {order.shippingAddress && `Shipping to: ${order.shippingAddress.split(',')[0]}`}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#BDBDBD', marginBottom: '4px' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: '600' }}>
                        ${order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {['PENDING', 'CONFIRMED'].includes(order.status) && (
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #E0E0E0' }}>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#FFFFFF',
                          color: '#C62828',
                          border: '1px solid #FFCDD2',
                          fontSize: '9px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.target.style.backgroundColor = '#FFEBEE';
                          e.target.style.borderColor = '#C62828';
                        }}
                        onMouseLeave={e => {
                          e.target.style.backgroundColor = '#FFFFFF';
                          e.target.style.borderColor = '#FFCDD2';
                        }}
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Back Button */}
        {orders.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setActiveTab('/')}
              style={{
                padding: '12px 32px',
                backgroundColor: '#FFFFFF',
                color: '#000',
                border: '1px solid #E0E0E0',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
