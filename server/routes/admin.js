// Admin Routes
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Tất cả routes dưới đây yêu cầu Admin role
router.use(authenticate, requireAdmin);

/**
 * GET /api/admin/stats
 * Dashboard statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalBookings,
      totalOrders,
      pendingBookings,
      pendingOrders,
      revenue
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.booking.count(),
      prisma.order.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        where: { status: { in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
        _sum: { totalAmount: true }
      })
    ]);
    
    res.json({
      totalUsers,
      totalProducts,
      totalBookings,
      totalOrders,
      pendingBookings,
      pendingOrders,
      revenue: revenue._sum.totalAmount || 0
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/bookings
 * Lấy tất cả bookings với filters
 */
router.get('/bookings', async (req, res) => {
  try {
    const { 
      status, 
      boutiqueId, 
      date,
      page = 1, 
      limit = 50 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (boutiqueId) {
      where.boutiqueId = boutiqueId;
    }
    
    if (date) {
      where.date = new Date(date);
    }
    
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: { date: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.booking.count({ where })
    ]);
    
    res.json({
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/orders
 * Lấy tất cả orders với filters
 */
router.get('/orders', async (req, res) => {
  try {
    const { 
      status,
      page = 1, 
      limit = 50 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true
            }
          },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.order.count({ where })
    ]);
    
    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/users
 * Lấy danh sách users
 */
router.get('/users', async (req, res) => {
  try {
    const { 
      role,
      search,
      page = 1, 
      limit = 50 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              bookings: true,
              orders: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.user.count({ where })
    ]);
    
    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/admin/users/:id/role
 * Cập nhật role user
 */
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role || !['USER', 'ADMIN', 'STYLIST'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    res.json({ 
      message: 'User role updated',
      user 
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/analytics/revenue
 * Revenue analytics (theo tháng)
 */
router.get('/analytics/revenue', async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    // Lấy orders theo tháng trong năm
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${parseInt(year) + 1}-01-01`)
        },
        status: { in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'] }
      },
      select: {
        totalAmount: true,
        createdAt: true
      }
    });
    
    // Group by month
    const monthlyRevenue = Array(12).fill(0);
    
    orders.forEach(order => {
      const month = order.createdAt.getMonth();
      monthlyRevenue[month] += order.totalAmount;
    });
    
    res.json({
      year: parseInt(year),
      monthlyRevenue,
      total: monthlyRevenue.reduce((sum, val) => sum + val, 0)
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/analytics/bookings
 * Booking analytics
 */
router.get('/analytics/bookings', async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: { gte: startDate }
      },
      select: {
        status: true,
        boutiqueId: true
      }
    });
    
    // Group by status
    const byStatus = {};
    const byBoutique = {};
    
    bookings.forEach(booking => {
      byStatus[booking.status] = (byStatus[booking.status] || 0) + 1;
      byBoutique[booking.boutiqueId] = (byBoutique[booking.boutiqueId] || 0) + 1;
    });
    
    res.json({
      period: parseInt(period),
      total: bookings.length,
      byStatus,
      byBoutique
    });
  } catch (error) {
    console.error('Get booking analytics error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
