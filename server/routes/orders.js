// Orders Routes
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /api/orders
 * Tạo order mới (Checkout)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { 
      items,           // Array of { productId, size, color, quantity }
      shippingAddress,
      shippingPhone,
      paymentMethod 
    } = req.body;
    
    const userId = req.user.userId;
    
    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        error: 'Order must contain at least one item' 
      });
    }
    
    if (!shippingAddress || !shippingPhone) {
      return res.status(400).json({ 
        error: 'Shipping address and phone are required' 
      });
    }
    
    // Sử dụng transaction để đảm bảo data consistency
    const order = await prisma.$transaction(async (tx) => {
      // 1. Validate tất cả products và check stock
      const orderItemsData = [];
      let subtotal = 0;
      
      for (const item of items) {
        const { productId, size, color, quantity } = item;
        
        // Lấy product info
        const product = await tx.product.findUnique({
          where: { id: productId },
          include: { variants: true }
        });
        
        if (!product) {
          throw new Error(`Product ${productId} not found`);
        }
        
        if (!product.inStock) {
          throw new Error(`Product ${product.name} is out of stock`);
        }
        
        // Tìm variant
        const variant = product.variants.find(
          v => v.size === size && (!color || v.color === color)
        );
        
        if (!variant) {
          throw new Error(`Variant not found for ${product.name} (size: ${size})`);
        }
        
        // Kiểm tra stock
        if (variant.stock < quantity) {
          throw new Error(`Insufficient stock for ${product.name} (${size}). Available: ${variant.stock}`);
        }
        
        // Trừ stock
        await tx.variant.update({
          where: { id: variant.id },
          data: { stock: variant.stock - quantity }
        });
        
        // Prepare order item data
        const itemTotal = product.price * quantity;
        subtotal += itemTotal;
        
        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          size,
          color: color || null,
          quantity,
          price: product.price
        });
      }
      
      // 2. Calculate totals
      const shippingFee = subtotal >= 1000 ? 0 : 50; // Free shipping trên $1000
      const tax = subtotal * 0.1; // 10% VAT
      const totalAmount = subtotal + shippingFee + tax;
      
      // 3. Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          subtotal,
          shippingFee,
          tax,
          totalAmount,
          status: 'PENDING',
          paymentMethod: paymentMethod || null,
          shippingAddress,
          shippingPhone,
          items: {
            create: orderItemsData
          }
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  slug: true,
                  images: true
                }
              }
            }
          }
        }
      });
      
      return newOrder;
    });
    
    // TODO: Gửi email xác nhận order
    // await sendOrderConfirmation(order);
    
    res.status(201).json({ 
      message: 'Order created successfully',
      order 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error.message 
    });
  }
});

/**
 * GET /api/orders/my-orders
 * Lấy danh sách orders của user
 */
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/orders/:id
 * Lấy chi tiết order
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: true
              }
            }
          }
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Kiểm tra quyền truy cập
    if (order.userId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/orders/:id/status
 * Cập nhật status order (Admin only)
 */
router.patch('/:id/status', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updateData = { status };
    
    if (status === 'DELIVERED') {
      updateData.completedAt = new Date();
    }
    
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    
    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    // TODO: Gửi email thông báo status update
    // await sendOrderStatusUpdate(order);
    
    res.json({ 
      message: 'Order status updated',
      order 
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/orders/:id/cancel
 * Cancel order (User hoặc Admin)
 */
router.post('/:id/cancel', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Kiểm tra quyền
    if (order.userId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Chỉ cho phép cancel order đang PENDING hoặc CONFIRMED
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      return res.status(400).json({ 
        error: 'Cannot cancel order',
        message: 'Only pending or confirmed orders can be cancelled' 
      });
    }
    
    // Cancel order và hoàn trả stock
    await prisma.$transaction(async (tx) => {
      // Hoàn trả stock cho từng item
      for (const item of order.items) {
        const variant = await tx.variant.findFirst({
          where: {
            productId: item.productId,
            size: item.size,
            color: item.color
          }
        });
        
        if (variant) {
          await tx.variant.update({
            where: { id: variant.id },
            data: { stock: variant.stock + item.quantity }
          });
        }
      }
      
      // Update order status
      await tx.order.update({
        where: { id },
        data: { 
          status: 'CANCELLED',
          notes: reason || 'Cancelled by user'
        }
      });
    });
    
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
