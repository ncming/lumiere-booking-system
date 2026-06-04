import { useState, useEffect } from 'react';

const Booking = ({ setActiveTab }) => {
    const [selectedStaff, setSelectedStaff] = useState('auto');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [countdown, setCountdown] = useState(300);
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
        let timer;
    
        if (isHolding && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isHolding, countdown]);

    useEffect(() => {
        if (countdown === 0 && isHolding) {
            const timer = setTimeout(() => {
                setIsHolding(false); 
                setSelectedSlot(null);
                setCountdown(300);
            }, 0);
            alert('Reservation time expired. Please select a time slot again.');
            return () => clearTimeout(timer);
        }
    }, [countdown, isHolding]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setIsHolding(true);
    setCountdown(300);
  };

  return (
    <div className="screen active" style={{ padding: '14px', paddingBottom: '80px' }}>
      <div className="section-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
        Select Therapist
      </div>
      
      {/* Select Therapist Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        <div 
          className="card" 
          onClick={() => setSelectedStaff('auto')}
          style={{ 
            minWidth: '90px', textAlign: 'center', cursor: 'pointer',
            borderColor: selectedStaff === 'auto' ? 'var(--accent)' : 'var(--color-border-tertiary)',
            background: selectedStaff === 'auto' ? '#F5EBE0' : 'var(--color-background-primary)',
            borderWidth: selectedStaff === 'auto' ? '2px' : '0.5px'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-secondary)' }}>Auto</div>
          <div style={{ fontSize: '11px', fontWeight: '500', color: selectedStaff === 'auto' ? 'var(--accent)' : 'var(--text-tertiary)' }}>Recommended</div>
        </div>

        <div 
          className="card" 
          onClick={() => setSelectedStaff('1')}
          style={{ 
            minWidth: '90px', textAlign: 'center', cursor: 'pointer',
            borderColor: selectedStaff === '1' ? 'var(--accent)' : 'var(--color-border-tertiary)',
            background: selectedStaff === '1' ? '#F5EBE0' : 'var(--color-background-primary)',
            borderWidth: selectedStaff === '1' ? '2px' : '0.5px'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #B8855D 0%, #A0714D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontWeight: '600', fontSize: '13px', color: '#fff' }}>LA</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: selectedStaff === '1' ? 'var(--accent)' : 'var(--text-primary)' }}>Lan Anh</div>
        </div>
      </div>

      <div className="section-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
        Available Times
      </div>

      {/* Time Slot Selection */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
        {['09:30', '10:00', '11:00', '11:30', '13:30', '14:00'].map((time) => (
          <div 
            key={time} 
            className={`time-slot ${selectedSlot === time ? 'selected' : ''}`}
            onClick={() => handleSelectSlot(time)}
          >
            {time}
          </div>
        ))}
        <div className="time-slot disabled">08:00</div>
        <div className="time-slot disabled">08:30</div>
      </div>

      {isHolding && selectedSlot && (
        <div style={{ background: '#F5EBE0', border: '1px solid #B8855D', borderRadius: 'var(--border-radius-md)', padding: '12px', marginBottom: '14px', fontSize: '13px', color: '#7A6F68' }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Time Slot Reserved</div>
          <div><strong>{selectedSlot}</strong> is held for you</div>
          <div style={{ marginTop: '4px' }}>Expires in <span style={{ fontWeight: '600', color: 'var(--accent)' }}>{formatTime(countdown)}</span></div>
        </div>
      )}

      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: selectedSlot ? 1 : 0.5, padding: '12px' }} 
        disabled={!selectedSlot}
        onClick={() => setActiveTab('/cart')}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Booking;