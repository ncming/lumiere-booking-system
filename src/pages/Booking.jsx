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
        