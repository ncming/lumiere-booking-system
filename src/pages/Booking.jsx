import React, { useState, useEffect } from 'react';

const Booking = ({ setActiveTab }) => {
    // Khai báo state 
    const [selectedStaff, setSelectedStaff] = useState('auto'); // Mặc định chọn 'Tự động'
    const [selectedDay, setSelectedDay] = useState(5);          // Mặc định chọn ngày 5
    const [selectedSlot, setSelectedSlot] = useState(null);     // Giờ đặt (ban đầu là null)

    //State phục vụ đếm ngược giữ chỗ
    const [countdown, setCountdown] = useState(300);            // 300 giây = 5 phút
    const [isHolding, setIsHolding] = useState(false);          // Đang có giữ chỗ hay không?

    //USE-EFFECT đếm ngược
    useEffect(() => {
        let timer;
    
    // Nếu đang giữ chỗ và thời gian > 0, bắt đầu đếm ngược
        if (isHolding && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevTime) => prevTime - 1);
            }, 1000); // trừ 1s sau mỗi 1000ms
        }
        //Nếu thời gian về 0
        else if (countdown === 0) {
            setIsHolding(false); 
            setSelectedSlot(null); // Hủy khung giờ đã chọn
            setCountdown(300); // Reset lại thời gian đếm ngược
            alert('Thời gian giữ chỗ đã hết. Vui lòng chọn lại khung giờ.');
        }

        // CLEANUP FUNCTION
        // Xóa interval cũ trước khi component re-render để tránh chông chéo nhiều đồng hồ
        return () => clearInterval(timer);
  }, [isHolding, countdown]);

  // Hàm phụ trợ: Chuyển đổi giây sang định dạng MM:SS (VD: 04:59)
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Hàm xử lý khi người dùng click vào một khung giờ
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setIsHolding(true);    // Kích hoạt trạng thái giữ chỗ
    setCountdown(300);     // Trả đồng hồ về lại 5 phút mỗi khi đổi giờ khác
  };

  return (
    <div className="screen active" style={{ padding: '14px', paddingBottom: '80px' }}>
      <div className="section-title" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
        Chọn nhân viên
      </div>
      
      {/* KHU VỰC CHỌN NHÂN VIÊN */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
        {/* Card: Tự động */}
        <div 
          className="card" 
          onClick={() => setSelectedStaff('auto')}
          style={{ 
            minWidth: '80px', textAlign: 'center', cursor: 'pointer',
            borderColor: selectedStaff === 'auto' ? 'var(--accent)' : 'var(--color-border-tertiary)',
            background: selectedStaff === 'auto' ? '#FDF7F2' : 'var(--color-background-primary)'
          }}
        >
          <div style={{ fontSize: '22px', marginBottom: '2px' }}>🎲</div>
          <div style={{ fontSize: '11px', fontWeight: '500', color: selectedStaff === 'auto' ? 'var(--accent)' : '' }}>Tự động</div>
        </div>

        {/* Card: Lan Anh */}
        <div 
          className="card" 
          onClick={() => setSelectedStaff('1')}
          style={{ 
            minWidth: '80px', textAlign: 'center', cursor: 'pointer',
            borderColor: selectedStaff === '1' ? 'var(--accent)' : 'var(--color-border-tertiary)',
            background: selectedStaff === '1' ? '#FDF7F2' : 'var(--color-background-primary)'
          }}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontWeight: '600', fontSize: '13px' }}>LA</div>
          <div style={{ fontSize: '11px', fontWeight: '500', color: selectedStaff === '1' ? 'var(--accent)' : '' }}>Lan Anh</div>
        </div>
      </div>

      <div className="section-title" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
        Khung giờ trống
      </div>

      {/* KHU VỰC CHỌN GIỜ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {/* Render danh sách các giờ trống bằng mảng */}
        {['09:30', '10:00', '11:00', '11:30', '13:30', '14:00'].map((time) => (
          <div 
            key={time} 
            className={`time-slot ${selectedSlot === time ? 'selected' : ''}`}
            onClick={() => handleSelectSlot(time)}
          >
            {time}
          </div>
        ))}
        {/* Các giờ đã có người đặt (disabled) */}
        <div className="time-slot disabled">08:00</div>
        <div className="time-slot disabled">08:30</div>
      </div>

      {/* HIỂN THỊ CẢNH BÁO GIỮ CHỖ NẾU CÓ CHỌN GIỜ */}
      {isHolding && selectedSlot && (
        <div style={{ background: '#FDF7F2', border: '0.5px solid #F0D8C0', borderRadius: 'var(--border-radius-md)', padding: '10px', marginBottom: '12px', fontSize: '12px', color: '#7A5A40' }}>
          🔒 <strong>{selectedSlot}</strong> đang được giữ cho bạn · Hết hạn sau <span style={{ fontWeight: '600', color: 'var(--accent)' }}>{formatTime(countdown)}</span>
        </div>
      )}

      {/* NÚT TIẾP TỤC */}
      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: selectedSlot ? 1 : 0.5 }} 
        disabled={!selectedSlot} // Khóa nút nếu chưa chọn giờ
        onClick={() => setActiveTab('cart')}
      >
        Thêm vào giỏ hàng →
      </button>
    </div>
  );
};

export default Booking;