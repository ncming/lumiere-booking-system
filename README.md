# ✦ LUMIERE — Luxury Booking System

A **production-ready fullstack** luxury fashion e-commerce and appointment booking system.

Browse curated collections, book private styling sessions, and manage appointments with real-time availability checking.

## 🌟 Features

### Frontend (User Experience)
- **Curated Homepage** — Hero slider, editorial grids, category navigation
- **Product Catalogue** — Advanced search, filters, quick-view modals
- **Product Detail** — Image zoom, size selector, recommendations
- **Shopping Bag** — Persistent cart with localStorage + future order system
- **Appointment Booking** — Multi-step flow with real-time slot availability
- **User Authentication** — Register, login, profile management
- **My Bookings** — View appointment history, cancel bookings
- **Wishlist** — Save favorite items
- **Responsive Design** — Mobile-first, adaptive layouts

### Backend (API & Services)
- **RESTful API** — Express.js with JWT authentication
- **Database** — PostgreSQL (Neon) with Prisma ORM
- **Redis Locking** — Prevent double-booking with Upstash Redis
- **Email Notifications** — Resend API for booking/order confirmations
- **Image Storage** — Cloudinary for product images
- **Role-Based Access** — USER, ADMIN, STYLIST roles
- **Admin Dashboard** — Manage bookings, orders, users, analytics
- **Rate Limiting** — DDoS protection
- **CORS Security** — Configured for production

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + Vite | SPA with instant navigation |
| **Backend** | Express.js + Node.js | RESTful API server |
| **Database** | PostgreSQL (Neon) | Primary data store |
| **ORM** | Prisma | Type-safe database client |
| **Cache** | Redis (Upstash) | Slot locking, caching |
| **Auth** | JWT + bcrypt | Secure authentication |
| **Email** | Resend | Transactional emails |
| **Storage** | Cloudinary | Image CDN |
| **Hosting** | Vercel | Serverless deployment |

### Database Schema

```
┌─────────┐    ┌──────────┐    ┌─────────┐
│  User   │───<│ Booking  │───>│ Stylist │
│ (Auth)  │    │(Appt)    │    │ (Data)  │
└─────────┘    └──────────┘    └─────────┘
     │
     │         ┌─────────┐    ┌─────────┐
     └────────<│ Order   │───>│ Product │
               │(E-com)  │    │(Catalog)│
               └─────────┘    └─────────┘
                    │              │
                    v              v
               ┌──────────┐  ┌─────────┐
               │OrderItem │  │ Variant │
               └──────────┘  └─────────┘
```

## 🚀 Quick Start

**Prerequisites:**
- Node.js >= 18.x
- Git

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
# Copy environment templates
copy .env.example .env
copy .env.local.example .env.local

# Edit .env and fill in your credentials (see QUICK_START.md)
```

**Required Services (All FREE tiers):**
- [Neon](https://neon.tech) - PostgreSQL database
- [Upstash](https://upstash.com) - Redis cache
- [Resend](https://resend.com) - Email service
- [Cloudinary](https://cloudinary.com) - Image storage

### 3. Initialize Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Development

```bash
# Run frontend + backend together
npm run dev:all

# Or separately:
npm run dev          # Frontend only (port 5173)
npm run dev:server   # Backend only (port 3001)
```

Visit: **http://localhost:5173**

📖 **Detailed setup guide:** [QUICK_START.md](./QUICK_START.md)

---

## 📁 Project Structure

```
lumiere-booking-system/
├── src/                        # Frontend (React)
│   ├── components/            # Reusable UI components
│   │   ├── NavBar.jsx
│   │   ├── CartDrawer.jsx
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── Auth.jsx          # Login/Register
│   │   ├── Reserve.jsx        # Booking flow
│   │   ├── MyBookings.jsx     # User's appointments
│   │   └── ...
│   ├── context/              # React Context
│   │   └── AppContext.jsx    # Global state + auth
│   ├── services/             # API clients
│   │   └── api.js            # Backend API wrapper
│   ├── data/                 # Static data
│   └── utils/                # Utilities
│
├── server/                    # Backend (Express.js)
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication
│   │   ├── products.js       # Product CRUD
│   │   ├── bookings.js       # Appointment system
│   │   ├── orders.js         # E-commerce
│   │   └── admin.js          # Admin dashboard
│   ├── middleware/           # Express middleware
│   │   └── auth.js           # JWT verification + RBAC
│   ├── services/             # Business logic
│   │   ├── redis.js          # Slot locking
│   │   ├── email.js          # Email notifications
│   │   └── cloudinary.js     # Image upload
│   ├── prisma/               # Database
│   │   └── schema.prisma     # Database schema
│   └── index.js              # Server entry point
│
├── public/                    # Static assets
├── .env.example              # Environment template
├── vercel.json               # Deployment config
├── package.json              # Dependencies + scripts
├── QUICK_START.md            # 5-minute setup guide
├── DEVELOPMENT_ROADMAP.md    # Full development plan
└── README.md                 # This file
```

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register     # Create account
POST   /api/auth/login        # Login
GET    /api/auth/me           # Get current user
PATCH  /api/auth/profile      # Update profile
POST   /api/auth/change-password
```

### Products
```
GET    /api/products          # List products (with filters)
GET    /api/products/:slug    # Get product detail
POST   /api/products          # Create product (Admin)
PATCH  /api/products/:id      # Update product (Admin)
DELETE /api/products/:id      # Delete product (Admin)
```

### Bookings
```
GET    /api/bookings/availability  # Check time slots
POST   /api/bookings              # Create booking
GET    /api/bookings/my-bookings  # User's bookings
GET    /api/bookings/:id          # Booking detail
PATCH  /api/bookings/:id/status   # Update status
```

### Orders
```
POST   /api/orders              # Create order (Checkout)
GET    /api/orders/my-orders    # User's orders
GET    /api/orders/:id          # Order detail
POST   /api/orders/:id/cancel   # Cancel order
```

### Admin
```
GET    /api/admin/stats         # Dashboard stats
GET    /api/admin/bookings      # All bookings
GET    /api/admin/orders        # All orders
GET    /api/admin/users         # All users
PATCH  /api/admin/users/:id/role
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Frontend only
npm run dev:server       # Backend only
npm run dev:all          # Frontend + Backend

# Production
npm run build            # Build frontend
npm run server           # Start production server

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:push      # Push schema (no migration)

# Deployment
npm run vercel-build     # Build for Vercel
```

---

## 🚢 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Visit https://vercel.com
2. Import your GitHub repository
3. Add environment variables:
   - DATABASE_URL
   - UPSTASH_REDIS_URL
   - UPSTASH_REDIS_TOKEN
   - RESEND_API_KEY
   - CLOUDINARY_*
   - JWT_SECRET
   - FRONTEND_URL (your vercel domain)
   - VITE_API_URL (your vercel domain + /api)

4. Deploy! 🎉

Your app will be live at: `https://your-project.vercel.app`

---

## 🔐 Security Features

- **JWT Authentication** — Secure token-based auth
- **Password Hashing** — bcrypt with salt rounds
- **CORS Protection** — Configured whitelist
- **Rate Limiting** — 100 requests per 15 minutes
- **SQL Injection Prevention** — Prisma parameterized queries
- **XSS Protection** — React auto-escaping
- **Environment Variables** — Secrets never in code

---

## 📊 Database Models

### User
- Authentication & profile
- Roles: USER, ADMIN, STYLIST

### Product
- Catalog with variants (size, color)
- Stock management
- Image gallery

### Booking
- Appointment system
- Boutique + Stylist + Time slot
- Status tracking (PENDING → CONFIRMED → COMPLETED)
- Redis lock for concurrency control

### Order
- E-commerce transactions
- Order items with snapshots
- Status workflow
- Stock deduction in transaction

---

## 🎨 Design System

**Typography:**
- Headers: Playfair Display (serif)
- Body: Helvetica Neue, Lato

**Colors:**
- Primary: `#000000`
- Background: `#FFFFFF`
- Secondary: `#757575`
- Border: `#E0E0E0`

**Spacing:**
- Base unit: 4px
- Consistent padding/margin scale

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)** - Full development plan (7 weeks)
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed step-by-step guide
- **[PROJECT_CHECKLIST.md](./PROJECT_CHECKLIST.md)** - Progress tracking

---

## 🤝 Contributing

This is a demonstration project showcasing fullstack architecture patterns.

---

## 📝 License

This is a demonstration project. All product imagery from [Unsplash](https://unsplash.com).

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Prisma](https://www.prisma.io)
- [Neon](https://neon.tech)
- [Upstash](https://upstash.com)
- [Resend](https://resend.com)
- [Cloudinary](https://cloudinary.com)
- [Vercel](https://vercel.com)

---

**Built with ✦ by the Lumiere team**
