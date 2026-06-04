import { useState, useEffect } from 'react';

const Booking = ({ setActiveTab }) => {
    const [selectedStaff, setSelectedStaff] = useState('auto');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [countdown, setCountdown] = useState(300);
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
        let timer;
        if (isHolding && countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isHolding, countdown]);

    useEffect(() => {
        if (countdown === 0 && isHolding) {
            setIsHolding(false); 
            setSelectedSlot(null);
            setCountdown(300);
            alert('Reservation time expired. Please select a time slot again.');
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
    <div className="screen active" style={{ padding: '0', paddingBottom: '80px', width: '100%' }}>
      
      {/* Tiêu đề trang */}
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #EEEEEE' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', letterSpacing: '2px' }}>RESERVATION</h2>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div className="section-title">Select Specialist</div>
        
        {/* Nhân viên - Dạng khối chữ nhật tối giản */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
          
          <div 
            onClick={() => setSelectedStaff('auto')}
            style={{ 
              minWidth: '100px', padding: '16px 10px', textAlign: 'center', cursor: 'pointer',
              border: selectedStaff === 'auto' ? '1px solid #000' : '1px solid #EEEEEE',
              backgroundColor: selectedStaff === 'auto' ? '#000' : '#fff',
              color: selectedStaff === 'auto' ? '#fff' : '#000',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Any</div>
            <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7 }}>Available</div>
          </div>

          <div 
            onClick={() => setSelectedStaff('1')}
            style={{ 
              minWidth: '100px', padding: '16px 10px', textAlign: 'center', cursor: 'pointer',
              border: selectedStaff === '1' ? '1px solid #000' : '1px solid #EEEEEE',
              backgroundColor: selectedStaff === '1' ? '#000' : '#fff',
              color: selectedStaff === '1' ? '#fff' : '#000',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Lan Anh</div>
            <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7 }}>Senior</div>
          </div>

        </div>

        <div className="section-title">Select Time</div>

        {/* Khung giờ - Viền mỏng, vuông vức */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '32px' }}>
          {['09:30', '10:00', '11:00', '11:30', '13:30', '14:00'].map((time) => (
            <div 
              key={time} 
              onClick={() => handleSelectSlot(time)}
              style={{
                padding: '12px 0', textAlign: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '500',
                border: selectedSlot === time ? '1px solid #000' : '1px solid #EEEEEE',
                backgroundColor: selectedSlot === time ? '#000' : '#fff',
                color: selectedSlot === time ? '#fff' : '#000',
              }}
            >
              {time}
            </div>
          ))}
          <div style={{ padding: '12px 0', textAlign: 'center', fontSize: '12px', border: '1px solid #EEEEEE', backgroundColor: '#F9F9F9', color: '#BDBDBD', cursor: 'not-allowed' }}>08:00</div>
        </div>

        {/* Cảnh báo giữ chỗ mang phong cách thanh lịch */}
        {isHolding && selectedSlot && (
          <div style={{ border: '1px solid #000', padding: '16px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Slot Reserved</div>
            <div style={{ fontSize: '13px' }}><strong>{selectedSlot}</strong> is temporarily held.</div>
            <div style={{ fontSize: '11px', color: '#757575', marginTop: '8px' }}>
              Expires in <span style={{ color: '#000', fontWeight: '600' }}>{formatTime(countdown)}</span>
            </div>
          </div>
        )}

        <button 
          className="btn-primary" 
          style={{ width: '100%', padding: '16px', opacity: selectedSlot ? 1 : 0.3 }} 
          disabled={!selectedSlot}
          onClick={() => setActiveTab('/cart')}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default Booking;