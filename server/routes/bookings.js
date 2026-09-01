// Bookings Routes
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middleware/auth.js';
// Redis service sẽ được import sau khi tạo
// import { holdSlot, releaseSlot, checkSlotAvailability } from '../services/redis.js';
// import { sendBookingConfirmation } from '../services/email.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/bookings/availability
 * Kiểm tra khung giờ có sẵn
 */
router.get('/availability', async (req, res) => {
  try {
    const { boutiqueId, date } = req.query;
    
    if (!boutiqueId || !date) {
      return res.status(400).json({ 
        error: 'Missing required parameters: boutiqueId and date' 
      });
    }
    
    // Lấy tất cả bookings cho boutique và ngày đó
    const bookings = await prisma.booking.findMany({
      where: {
        boutiqueId,
        date: new Date(date),
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      },
      select: {
        timeSlot: true
      }
    });
    
    const bookedSlots = bookings.map(b => b.timeSlot);
    
    // Danh sách tất cả time slots (match với frontend)
    const allTimeSlots = [
      '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30'
    ];
    
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.json({
      date,
      boutiqueId,
      availableSlots,
      bookedSlots
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/bookings
 * Tạo booking mới (yêu cầu authentication)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { 
      boutiqueId, 
      boutiqueName,
      stylistId, 
      stylistName,
      date, 
      timeSlot, 
      occasion 
    } = req.body;
    
    const userId = req.user.userId;
    
    // Validation
    if (!boutiqueId || !stylistId || !date || !timeSlot) {
      return res.status(400).json({ 
        error: 'Missing required fields: boutiqueId, stylistId, date, timeSlot' 
      });
    }
    
    // TODO: Implement Redis lock để ngăn race condition
    // await holdSlot(boutiqueId, date, timeSlot, userId);
    
    // Kiểm tra slot availability trong database
    const existingBooking = await prisma.booking.findFirst({
      where: {
        boutiqueId,
        date: new Date(date),
        timeSlot,
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      }
    });
    
    if (existingBooking) {
      // TODO: Release Redis lock
      // await releaseSlot(boutiqueId, date, timeSlot);
      
      return res.status(400).json({ 
        error: 'Time slot unavailable',
        message: 'This time slot has already been booked. Please select another time.' 
      });
    }
    
    // Tạo booking trong transaction
    const booking = await prisma.booking.create({
      data: {
        userId,
        boutiqueId,
        boutiqueName: boutiqueName || boutiqueId,
        stylistId,
        stylistName: stylistName || stylistId,
        date: new Date(date),
        timeSlot,
        occasion: occasion || null,
        status: 'CONFIRMED'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    // TODO: Release Redis lock
    // await releaseSlot(boutiqueId, date, timeSlot);
    
    // TODO: Gửi email xác nhận
    // await sendBookingConfirmation(booking);
    
    res.status(201).json({ 
      message: 'Booking created successfully',
      booking 
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ 
      error: 'Failed to create booking',
      message: error.message 
    });
  }
});

/**
 * GET /api/bookings/my-bookings
 * Lấy danh sách bookings của user hiện tại
 */
router.get('/my-bookings', authenticate, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { 
        userId: req.user.userId 
      },
      orderBy: { 
        date: 'desc' 
      }
    });
    
    res.json({ bookings });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/bookings/:id
 * Lấy chi tiết booking
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Kiểm tra quyền truy cập
    if (booking.userId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }
    
    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/bookings/:id/status
 * Cập nhật status booking (Admin only hoặc user cancel)
 */
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Lấy booking
    const booking = await prisma.booking.findUnique({
      where: { id }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Kiểm tra quyền: user chỉ có thể cancel booking của mình
    if (req.user.role !== 'ADMIN') {
      if (booking.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      if (status !== 'CANCELLED') {
        return res.status(403).json({ 
          error: 'Users can only cancel their own bookings' 
        });
      }
    }
    
    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        ...(notes && { notes })
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    res.json({ 
      message: 'Booking status updated',
      booking: updatedBooking 
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/bookings/:id
 * Xóa booking (Admin only)
 */
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.booking.delete({
      where: { id }
    });
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
