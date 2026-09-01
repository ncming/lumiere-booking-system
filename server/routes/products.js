// Products Routes
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/products
 * Lấy danh sách sản phẩm (có filter, search, pagination)
 */
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      featured,
      inStock,
      page = 1, 
      limit = 20 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const where = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (inStock === 'true') {
      where.inStock = true;
    }
    
    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          variants: {
            select: {
              id: true,
              size: true,
              color: true,
              stock: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.product.count({ where })
    ]);
    
    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/products/categories
 * Lấy danh sách categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category']
    });
    
    res.json({ 
      categories: categories.map(c => c.category) 
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/products/:slug
 * Lấy chi tiết sản phẩm
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          select: {
            id: true,
            size: true,
            color: true,
            stock: true
          }
        }
      }
    });
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found' 
      });
    }
    
    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/products
 * Tạo sản phẩm mới (Admin only)
 */
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { 
      slug, 
      name, 
      description, 
      category, 
      price, 
      images,
      featured,
      variants 
    } = req.body;
    
    // Validation
    if (!slug || !name || !description || !category || price === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    // Kiểm tra slug đã tồn tại
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ 
        error: 'Product slug already exists' 
      });
    }
    
    // Tạo product với variants
    const product = await prisma.product.create({
      data: {
        slug,
        name,
        description,
        category,
        price: parseFloat(price),
        images: images || [],
        featured: featured || false,
        variants: {
          create: variants || []
        }
      },
      include: {
        variants: true
      }
    });
    
    res.status(201).json({ 
      message: 'Product created successfully',
      product 
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/products/:id
 * Cập nhật sản phẩm (Admin only)
 */
router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      category, 
      price, 
      images,
      featured,
      inStock
    } = req.body;
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(images && { images }),
        ...(featured !== undefined && { featured }),
        ...(inStock !== undefined && { inStock })
      },
      include: {
        variants: true
      }
    });
    
    res.json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/products/:id
 * Xóa sản phẩm (Admin only)
 */
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id }
    });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/products/:id/variants/:variantId
 * Cập nhật stock của variant (Admin only)
 */
router.patch('/:id/variants/:variantId', authenticate, requireAdmin, async (req, res) => {
  try {
    const { variantId } = req.params;
    const { stock } = req.body;
    
    if (stock === undefined) {
      return res.status(400).json({ error: 'Stock value required' });
    }
    
    const variant = await prisma.variant.update({
      where: { id: variantId },
      data: { stock: parseInt(stock) }
    });
    
    res.json({ 
      message: 'Variant stock updated',
      variant 
    });
  } catch (error) {
    console.error('Update variant error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
