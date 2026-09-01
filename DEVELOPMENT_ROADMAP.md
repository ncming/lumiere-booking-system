# 🚀 Lộ trình phát triển Lumiere Booking System

## 📋 Mục tiêu: Chuyển từ Frontend Demo → Production-ready Fullstack App (0 đồng)

---

## GIAI ĐOẠN 1: Thiết lập Backend Foundation (Tuần 1-2)

### 1.1. Cài đặt công cụ bắt buộc

```bash
# Kiểm tra Node.js version (cần >= 18.x)
node --version

# Kiểm tra Git
git --version

# Cài Prisma CLI (ORM quản lý database)
npm install -D prisma @prisma/client

# Cài Express.js (Backend API)
npm install express cors dotenv cookie-parser express-rate-limit
npm install -D nodemon
```

### 1.2. Tạo cấu trúc thư mục Backend

```
lumiere-booking-system/
├── src/                    # Frontend (đã có)
├── server/                 # Backend mới (tạo thêm)
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── routes/
│   │   ├── auth.js         # API đăng nhập/đăng ký
│   │   ├── products.js     # API sản phẩm
│   │   ├── bookings.js     # API đặt lịch
│   │   └── admin.js        # API quản trị
│   ├── middleware/
│   │   ├── auth.js         # Xác thực JWT
│   │   └── rbac.js         # Phân quyền Role
│   ├── services/
│   │   ├── redis.js        # Kết nối Upstash Redis
│   │   ├── email.js        # Gửi email qua Resend
│   │   └── cloudinary.js   # Upload ảnh
│   └── index.js            # Entry point Express
└── .env                    # Cấu hình môi trường
```

### 1.3. Đăng ký dịch vụ Cloud (100% miễn phí)

| Dịch vụ | Link đăng ký | Gói miễn phí | Mục đích |
|---------|--------------|--------------|----------|
| **Neon (PostgreSQL)** | https://neon.tech | 500MB | Database chính |
| **Upstash (Redis)** | https://upstash.com | 10k req/day | Khóa giữ chỗ booking |
| **Cloudinary** | https://cloudinary.com | 25GB/tháng | Lưu trữ hình ảnh |
| **Resend** | https://resend.com | 3k email/tháng | Email xác nhận |
| **Vercel** | https://vercel.com | Unlimited | Deploy fullstack |

### 1.4. Thiết kế Database Schema

Tạo file `server/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── USER & AUTH ──
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  phone         String?
  passwordHash  String
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  bookings      Booking[]
  orders        Order[]
}

enum Role {
  USER
  ADMIN
  STYLIST
}

// ── PRODUCTS ──
model Product {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  description String
  category    String
  price       Float
  images      String[]  // JSON array
  variants    Variant[]
  inStock     Boolean   @default(true)
  createdAt   DateTime  @default(now())
  orderItems  OrderItem[]
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  size      String  // "XS", "S", "M", "L", "XL"
  stock     Int     @default(0)
}

// ── BOOKINGS (Đặt lịch tư vấn) ──
model Booking {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  boutiqueId  String   // Liên kết với BOUTIQUES trong data/boutiques.js
  stylistId   String
  date        DateTime
  timeSlot    String   // "10:00", "14:30"...
  occasion    String?
  status      BookingStatus @default(PENDING)
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([date])
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

// ── ORDERS (Đơn hàng) ──
model Order {
  id            String      @id @default(cuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  items         OrderItem[]
  totalAmount   Float
  status        OrderStatus @default(PENDING)
  paymentMethod String?
  paymentId     String?     // ID từ payment gateway
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  @@index([userId])
  @@index([status])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float   // Giá tại thời điểm mua
  size      String?
}
```

### 1.5. Khởi tạo Database

```bash
# Tạo file .env
echo "DATABASE_URL=postgresql://..." > .env

# Migrate database
npx prisma migrate dev --name init

# Mở Prisma Studio để xem database
npx prisma studio
```

---

## GIAI ĐOẠN 2: Xây dựng Backend API (Tuần 3-4)

### 2.1. API Routes cần thiết

**File `server/index.js`** (Entry point):

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import bookingRoutes from './routes/bookings.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Rate limiting (chống spam API)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100 // Max 100 requests/IP
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✦ Server running on http://localhost:${PORT}`);
});
```

### 2.2. Authentication (JWT)

**File `server/routes/auth.js`**:

```javascript
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
    
    // Kiểm tra email đã tồn tại
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Tạo user
    const user = await prisma.user.create({
      data: { email, name, phone, passwordHash, role: 'USER' }
    });
    
    // Tạo JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user.id, email, name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

Cài thêm dependencies:

```bash
npm install bcryptjs jsonwebtoken
```

### 2.3. Middleware xác thực & phân quyền

**File `server/middleware/auth.js`**:

```javascript
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

### 2.4. Booking API với Redis Lock

**File `server/services/redis.js`**:

```javascript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
});

// Khóa giữ chỗ (10 phút)
export async function holdSlot(boutiqueId, date, timeSlot, userId) {
  const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
  const existing = await redis.get(key);
  
  if (existing && existing !== userId) {
    throw new Error('Time slot already held by another user');
  }
  
  // Set với TTL 10 phút (600 giây)
  await redis.set(key, userId, { ex: 600 });
  return true;
}

// Giải phóng khóa khi confirm booking
export async function releaseSlot(boutiqueId, date, timeSlot) {
  const key = `booking:${boutiqueId}:${date}:${timeSlot}`;
  await redis.del(key);
}

export default redis;
```

Cài dependency:

```bash
npm install @upstash/redis
```

**File `server/routes/bookings.js`**:

```javascript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';
import { holdSlot, releaseSlot } from '../services/redis.js';
import { sendBookingConfirmation } from '../services/email.js';

const router = express.Router();
const prisma = new PrismaClient();

// Tạo booking mới
router.post('/', authenticate, async (req, res) => {
  try {
    const { boutiqueId, stylistId, date, timeSlot, occasion } = req.body;
    const userId = req.user.userId;
    
    // 1. Kiểm tra Redis lock
    await holdSlot(boutiqueId, date, timeSlot, userId);
    
    // 2. Kiểm tra database không có booking trùng
    const existing = await prisma.booking.findFirst({
      where: {
        boutiqueId,
        date: new Date(date),
        timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] }
      }
    });
    
    if (existing) {
      await releaseSlot(boutiqueId, date, timeSlot);
      return res.status(400).json({ error: 'Time slot unavailable' });
    }
    
    // 3. Tạo booking (Transaction)
    const booking = await prisma.booking.create({
      data: {
        userId,
        boutiqueId,
        stylistId,
        date: new Date(date),
        timeSlot,
        occasion,
        status: 'CONFIRMED'
      },
      include: {
        user: { select: { name: true, email: true, phone: true } }
      }
    });
    
    // 4. Giải phóng Redis lock
    await releaseSlot(boutiqueId, date, timeSlot);
    
    // 5. Gửi email xác nhận
    await sendBookingConfirmation(booking);
    
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách booking của user
router.get('/my-bookings', authenticate, async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(bookings);
});

export default router;
```

### 2.5. Email Service (Resend)

**File `server/services/email.js`**:

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking) {
  const { user, boutiqueId, date, timeSlot } = booking;
  
  await resend.emails.send({
    from: 'Lumiere <noreply@yourdomain.com>',
    to: user.email,
    subject: '✦ Your Appointment at Lumiere',
    html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="font-family: 'Playfair Display', serif; font-weight: 300; letter-spacing: 2px;">
          Appointment Confirmed
        </h2>
        <p>Dear ${user.name},</p>
        <p>Your private styling session has been confirmed:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${timeSlot}</li>
          <li><strong>Boutique:</strong> ${boutiqueId}</li>
        </ul>
        <p style="color: #757575; font-size: 11px;">
          Complimentary tea service will be arranged. We look forward to welcoming you.
        </p>
      </div>
    `
  });
}
```

Cài dependency:

```bash
npm install resend
```

---

## GIAI ĐOẠN 3: Kết nối Frontend với Backend (Tuần 5)

### 3.1. Cấu hình API Client

Tạo file `src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
  
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }
    
    return response.json();
  }
  
  // Auth
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.token);
    return data;
  }
  
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    this.setToken(data.token);
    return data;
  }
  
  // Bookings
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }
  
  async getMyBookings() {
    return this.request('/bookings/my-bookings');
  }
  
  // Products (fetch từ database thay vì file tĩnh)
  async getProducts(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/products?${query}`);
  }
}

export const api = new ApiClient();
```

### 3.2. Cập nhật AppContext

Sửa file `src/context/AppContext.jsx` để thêm auth state:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  
  // Load user từ token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode JWT để lấy user info (hoặc gọi API /auth/me)
      // Simplified: giả sử decode thành công
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(userData);
    }
  }, []);
  
  const login = async (email, password) => {
    const data = await api.login(email, password);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    showToast('✦ Welcome back');
  };
  
  const logout = () => {
    api.clearToken();
    setUser(null);
    localStorage.removeItem('user');
    showToast('✦ Signed out');
  };
  
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };
  
  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      cart,
      setCart,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
```

### 3.3. Tạo trang Login/Register

Tạo file `src/pages/Auth.jsx`:

```javascript
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Auth = ({ setActiveTab }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const { login, showToast } = useApp();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        // Register logic
      }
      setActiveTab('/');
    } catch (error) {
      showToast('✕ ' + error.message);
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%', border: '1px solid #E0E0E0', padding: '40px' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', marginBottom: '32px', textAlign: 'center' }}>
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ padding: '12px', border: '1px solid #E0E0E0', fontSize: '11px' }}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: '12px', border: '1px solid #E0E0E0', fontSize: '11px' }}
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ padding: '12px', border: '1px solid #E0E0E0', fontSize: '11px' }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
            style={{ padding: '12px', border: '1px solid #E0E0E0', fontSize: '11px' }}
          />
          
          <button
            type="submit"
            style={{ padding: '14px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', color: '#757575' }}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: '#000', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
```

---

## GIAI ĐOẠN 4: Admin Dashboard (Tuần 6)

### 4.1. Tạo layout Admin

Tạo file `src/pages/admin/Dashboard.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const [statsData, bookingsData] = await Promise.all([
      api.request('/admin/stats'),
      api.request('/admin/bookings')
    ]);
    setStats(statsData);
    setBookings(bookingsData);
  };
  
  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', marginBottom: '32px' }}>
        Admin Dashboard
      </h1>
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard label="Total Bookings" value={stats?.totalBookings || 0} />
        <StatCard label="Revenue" value={`$${stats?.revenue || 0}`} />
        <StatCard label="Active Users" value={stats?.activeUsers || 0} />
        <StatCard label="Products" value={stats?.totalProducts || 0} />
      </div>
      
      {/* Bookings Table */}
      <div style={{ border: '1px solid #E0E0E0' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E0E0E0', fontWeight: '600' }}>
          Recent Bookings
        </div>
        <table style={{ width: '100%', fontSize: '11px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9F9F9' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Client</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Time</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Boutique</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                <td style={{ padding: '12px' }}>{booking.user.name}</td>
                <td style={{ padding: '12px' }}>{new Date(booking.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>{booking.timeSlot}</td>
                <td style={{ padding: '12px' }}>{booking.boutiqueId}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: booking.status === 'CONFIRMED' ? '#E8F5E9' : '#FFF3E0',
                    color: booking.status === 'CONFIRMED' ? '#2E7D32' : '#E65100',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ fontSize: '9px', padding: '4px 8px', cursor: 'pointer' }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={{ border: '1px solid #E0E0E0', padding: '24px', textAlign: 'center' }}>
    <div style={{ fontSize: '9px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
      {label}
    </div>
    <div style={{ fontSize: '28px', fontWeight: '300' }}>
      {value}
    </div>
  </div>
);

export default AdminDashboard;
```

---

## GIAI ĐOẠN 5: Deploy lên Production (Tuần 7)

### 5.1. Cấu hình Environment Variables

Tạo file `.env.production`:

```env
# Database
DATABASE_URL=postgresql://...  # Từ Neon

# Redis
UPSTASH_REDIS_URL=https://...  # Từ Upstash
UPSTASH_REDIS_TOKEN=...

# Email
RESEND_API_KEY=re_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# JWT
JWT_SECRET=your-super-secret-key-change-this

# URLs
FRONTEND_URL=https://yourdomain.vercel.app
```

### 5.2. Deploy lên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**File `vercel.json`** (cấu hình routing):

```json
{
  "version": 2,
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" },
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.js" },
    { "src": "/(.*)", "dest": "/dist/$1" }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 📊 Timeline tổng quan

| Giai đoạn | Thời gian | Mục tiêu chính |
|-----------|-----------|----------------|
| 1 | Tuần 1-2 | Setup backend, database schema, ORM |
| 2 | Tuần 3-4 | API routes, auth, Redis lock, email |
| 3 | Tuần 5 | Kết nối frontend, API client, auth UI |
| 4 | Tuần 6 | Admin dashboard, quản lý bookings/orders |
| 5 | Tuần 7 | Testing, deploy production, monitoring |

---

## ✅ Checklist hoàn thành

- [ ] Đăng ký tất cả dịch vụ cloud (Neon, Upstash, Resend, Cloudinary, Vercel)
- [ ] Thiết kế & migrate database schema
- [ ] Xây dựng Auth API (JWT)
- [ ] Xây dựng Booking API với Redis lock
- [ ] Xây dựng Order API với transaction
- [ ] Tích hợp email service
- [ ] Kết nối frontend với backend API
- [ ] Tạo trang Login/Register
- [ ] Xây dựng Admin Dashboard
- [ ] Viết tests cho critical paths
- [ ] Deploy lên Vercel
- [ ] Setup monitoring & error tracking

---

## 🆘 Tài nguyên hỗ trợ

- [Prisma Documentation](https://www.prisma.io/docs)
- [Upstash Redis Guide](https://docs.upstash.com/redis)
- [Resend Email API](https://resend.com/docs)
- [Vercel Deploy Guide](https://vercel.com/docs)
- [JWT Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

---

**Lưu ý quan trọng:**
1. Luôn validate input ở cả client & server
2. Sử dụng HTTPS cho production
3. Rate limit tất cả public endpoints
4. Log tất cả transactions quan trọng
5. Backup database định kỳ (Neon có auto backup)
6. Setup error monitoring (Sentry free tier)
