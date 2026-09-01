// My Bookings Page - View user's appointment history
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const MyBookings = ({ setActiveTab }) => {
  const { user, isAuthenticated, showToast } = useApp();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveTab('/auth');
      return;
    }

    loadBookings();
  }, [isAuthenticated, setActiveTab]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyBookings();
      setBookings(data.bookings || []);
    } catch (error) {
      showToast('✕ Failed to load bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await api.cancelBooking(bookingId, 'Cancelled by user');
      showToast('✦ Appointment cancelled');
      loadBookings(); // Reload
    } catch (error) {
      showToast('✕ Failed to cancel appointment');
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return { bg: '#E8F5E9', color: '#2E7D32' };
      case 'PENDING':
        return { bg: '#FFF3E0', color: '#E65100' };
      case 'COMPLETED':
        return { bg: '#E3F2FD', color: '#1565C0' };
      case 'CANCELLED':
        return { bg: '#FFEBEE', color: '#C62828' };
      default:
        return { bg: '#F5F5F5', color: '#757575' };
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to auth
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '68px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Your Appointments
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '400', letterSpacing: '3px', marginBottom: '12px' }}>
          My Bookings
        </h1>
        <p style={{ fontSize: '11px', color: '#757575', letterSpacing: '0.5px' }}>
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#757575', fontSize: '11px', letterSpacing: '1px' }}>
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.3 }}>✦</div>
            <div style={{ fontSize: '13px', color: '#757575', marginBottom: '8px' }}>
              No appointments yet
            </div>
            <div style={{ fontSize: '11px', color: '#BDBDBD', marginBottom: '32px' }}>
              Book a private styling session at your preferred boutique
            </div>
            <button
              onClick={() => setActiveTab('/reserve')}
              style={{ padding: '14px 40px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bookings.map(booking => {
              const statusStyle = getStatusColor(booking.status);
              const bookingDate = new Date(booking.date);
              const isPast = bookingDate < new Date();

              return (
                <div
                  key={booking.id}
                  style={{
                    border: '1px solid #E0E0E0',
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '4px' }}>
                        {booking.boutiqueName || booking.boutiqueId}
                      </div>
                      <div style={{ fontSize: '11px', color: '#757575' }}>
                        {bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      fontSize: '9px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      {booking.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', marginBottom: '4px' }}>
                        Time
                      </div>
                      <div style={{ fontSize: '13px', color: '#000' }}>
                        {booking.timeSlot}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', marginBottom: '4px' }}>
                        Stylist
                      </div>
                      <div style={{ fontSize: '13px', color: '#000' }}>
                        {booking.stylistName || 'Personal Stylist'}
                      </div>
                    </div>

                    {booking.occasion && (
                      <div>
                        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', marginBottom: '4px' }}>
                          Occasion
                        </div>
                        <div style={{ fontSize: '13px', color: '#000' }}>
                          {booking.occasion}
                        </div>
                      </div>
                    )}
                  </div>

                  {booking.status === 'CONFIRMED' && !isPast && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      style={{
                        padding: '8px 20px',
                        backgroundColor: '#FFFFFF',
                        color: '#C62828',
                        border: '1px solid #FFCDD2',
                        fontSize: '9px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
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
                      Cancel Appointment
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Back Button */}
        {bookings.length > 0 && (
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
                cursor: 'pointer'
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

export default MyBookings;
