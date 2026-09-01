// Authentication & Authorization Middleware
import jwt from 'jsonwebtoken';

/**
 * Middleware: Xác thực JWT token
 * Kiểm tra Authorization header và verify token
 * Thêm user info vào req.user
 */
export const authenticate = (req, res, next) => {
  try {
    // Lấy token từ Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please provide a valid token in Authorization header' 
      });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Thêm user info vào request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please login again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'The provided token is invalid.' 
      });
    }
    
    res.status(500).json({ error: 'Authentication error' });
  }
};

/**
 * Middleware: Yêu cầu role ADMIN
 * Phải chạy sau authenticate middleware
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required' 
    });
  }
  
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      error: 'Admin access required',
      message: 'You do not have permission to perform this action.' 
    });
  }
  
  next();
};

/**
 * Middleware: Yêu cầu role STYLIST hoặc ADMIN
 */
export const requireStylist = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required' 
    });
  }
  
  if (req.user.role !== 'STYLIST' && req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      error: 'Stylist access required' 
    });
  }
  
  next();
};

/**
 * Optional: Middleware kiểm tra ownership
 * Cho phép user truy cập resource của chính họ, hoặc admin truy cập tất cả
 */
export const requireOwnershipOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Admin có thể truy cập tất cả
    if (req.user.role === 'ADMIN') {
      return next();
    }
    
    // Kiểm tra ownership
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (resourceUserId !== req.user.userId) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You can only access your own resources.' 
      });
    }
    
    next();
  };
};
