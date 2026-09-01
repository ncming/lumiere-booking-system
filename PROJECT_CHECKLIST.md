# ✅ Project Checklist - Lumiere Booking System

## 📦 Phase 1: Setup & Infrastructure (Tuần 1-2)

### Môi trường phát triển
- [ ] Cài đặt Node.js >= 18.x
- [ ] Cài đặt Git
- [ ] Cài đặt VS Code + Extensions (Prettier, ESLint, Prisma)
- [ ] Cài đặt Postman hoặc Thunder Client

### Dịch vụ Cloud (100% miễn phí)
- [ ] Đăng ký Neon (PostgreSQL) → Lấy DATABASE_URL
- [ ] Đăng ký Upstash (Redis) → Lấy URL + Token
- [ ] Đăng ký Resend (Email) → Lấy API Key
- [ ] Đăng ký Cloudinary (Images) → Lấy Cloud Name, API Key, Secret
- [ ] Đăng ký Vercel (Hosting) với GitHub

### Backend Setup
- [ ] Tạo cấu trúc thư mục `server/`
- [ ] Cài đặt dependencies: `express`, `prisma`, `bcryptjs`, `jsonwebtoken`, etc.
- [ ] Tạo file `.env` với tất cả credentials
- [ ] Thêm `.env` vào `.gitignore`
- [ ] Cấu hình Prisma schema
- [ ] Chạy migration đầu tiên: `npx prisma migrate dev --name init`
- [ ] Test Prisma Studio: `npx prisma studio`

---

## 🔐 Phase 2: Authentication & Authorization (Tuần 3)

### Backend Auth
- [ ] Tạo `server/routes/auth.js`
- [ ] Implement `/api/auth/register` (hash password với bcrypt)
- [ ] Implement `/api/auth/login` (return JWT token)
- [ ] Tạo `server/middleware/auth.js` (verify JWT)
- [ ] Tạo `server/middleware/rbac.js` (check role: USER/ADMIN)
- [ ] Test auth endpoints với Postman

### Frontend Auth
- [ ] Tạo `src/services/api.js` (API client với JWT handling)
- [ ] Tạo `src/pages/Auth.jsx` (Login/Register UI)
- [ ] Cập nhật `src/context/AppContext.jsx` (thêm user state)
- [ ] Thêm route `/auth` trong `App.jsx`
- [ ] Implement logout functionality
- [ ] Test đăng ký → đăng nhập → lưu token → logout

---

## 📅 Phase 3: Booking System với Redis Lock (Tuần 4)

### Redis Integration
- [ ] Tạo `server/services/redis.js`
- [ ] Implement `holdSlot()` function (TTL 10 phút)
- [ ] Implement `releaseSlot()` function
- [ ] Test Redis connection

### Booking API
- [ ] Tạo `server/routes/bookings.js`
- [ ] Implement `POST /api/bookings` với logic:
  - [ ] Check Redis lock
  - [ ] Check database conflicts
  - [ ] Create booking trong transaction
  - [ ] Release Redis lock
  - [ ] Send confirmation email
- [ ] Implement `GET /api/bookings/my-bookings`
- [ ] Implement `PATCH /api/bookings/:id/status` (Admin only)
- [ ] Test race condition: 2 users book cùng slot

### Frontend Booking
- [ ] Cập nhật `src/pages/Reserve.jsx`:
  - [ ] Require authentication trước khi book
  - [ ] Gọi `api.createBooking()` thay vì localStorage
  - [ ] Hiển thị loading state
  - [ ] Handle errors (slot unavailable, etc.)
- [ ] Tạo trang `src/pages/MyBookings.jsx` (history)

---

## 🛍️ Phase 4: Products & Orders (Tuần 5)

### Products API
- [ ] Migrate data từ `src/data/products.js` → Database
- [ ] Tạo `server/routes/products.js`
- [ ] Implement `GET /api/products` (filter, search, pagination)
- [ ] Implement `GET /api/products/:slug`
- [ ] Implement `POST /api/products` (Admin only)
- [ ] Implement `PATCH /api/products/:id` (Admin only)
- [ ] Implement inventory check

### Orders API
- [ ] Tạo `server/routes/orders.js`
- [ ] Implement `POST /api/orders` với logic:
  - [ ] Validate stock availability
  - [ ] Create order + order items trong transaction
  - [ ] Decrease product stock
  - [ ] Send order confirmation email
- [ ] Implement `GET /api/orders/my-orders`
- [ ] Implement `PATCH /api/orders/:id/status` (Admin)

### Frontend Products
- [ ] Cập nhật `src/pages/Explore.jsx` → fetch từ API
- [ ] Cập nhật `src/pages/ProductDetail.jsx` → fetch từ API
- [ ] Cập nhật `src/pages/Cart.jsx`:
  - [ ] Validate stock trước checkout
  - [ ] Gọi `api.createOrder()`
  - [ ] Clear cart sau success

---

## ✉️ Phase 5: Email Notifications (Tuần 5)

### Email Service
- [ ] Tạo `server/services/email.js`
- [ ] Implement `sendBookingConfirmation(booking)`
- [ ] Implement `sendOrderConfirmation(order)`
- [ ] Implement `sendOrderStatusUpdate(order)`
- [ ] Design email templates (HTML)
- [ ] Test email delivery

---

## 👨‍💼 Phase 6: Admin Dashboard (Tuần 6)

### Admin Backend
- [ ] Tạo `server/routes/admin.js`
- [ ] Implement `GET /api/admin/stats` (dashboard metrics)
- [ ] Implement `GET /api/admin/bookings` (all bookings với filters)
- [ ] Implement `GET /api/admin/orders` (all orders)
- [ ] Implement `GET /api/admin/users` (user management)
- [ ] Protect tất cả routes với `requireAdmin` middleware

### Admin Frontend
- [ ] Tạo `src/pages/admin/Dashboard.jsx`
- [ ] Stats cards: Total bookings, Revenue, Active users, Products
- [ ] Bookings table với filter by status, date
- [ ] Orders table với filter by status
- [ ] Status update buttons (Pending → Confirmed → Completed)
- [ ] User list với role management
- [ ] Products management (CRUD)

---

## 🖼️ Phase 7: Image Upload (Tuần 6)

### Cloudinary Integration
- [ ] Tạo `server/services/cloudinary.js`
- [ ] Implement upload function
- [ ] Tạo endpoint `POST /api/upload` (Admin only)
- [ ] Add image optimization (auto WebP, quality 80%)

### Frontend Upload
- [ ] Tạo component `ImageUpload.jsx`
- [ ] Implement drag & drop
- [ ] Implement preview
- [ ] Integrate vào admin product form

---

## 🧪 Phase 8: Testing (Tuần 7)

### Unit Tests
- [ ] Setup Jest hoặc Vitest
- [ ] Test auth functions (register, login, JWT)
- [ ] Test Redis lock logic
- [ ] Test order transaction logic

### Integration Tests
- [ ] Test booking flow end-to-end
- [ ] Test order flow end-to-end
- [ ] Test race conditions

### Manual Testing
- [ ] Test trên Chrome, Firefox, Safari
- [ ] Test mobile responsive
- [ ] Test slow network (throttling)
- [ ] Test edge cases (invalid inputs, expired tokens, etc.)

---

## 🚀 Phase 9: Production Deployment (Tuần 7)

### Pre-deployment
- [ ] Set `NODE_ENV=production`
- [ ] Enable rate limiting
- [ ] Setup error logging (Sentry free tier)
- [ ] Review security checklist:
  - [ ] HTTPS only
  - [ ] CORS configured correctly
  - [ ] No sensitive data in logs
  - [ ] Input validation everywhere
  - [ ] SQL injection prevention (Prisma handles this)
  - [ ] XSS prevention
- [ ] Generate strong JWT_SECRET

### Vercel Deployment
- [ ] Tạo file `vercel.json`
- [ ] Cấu hình `vercel-build` script
- [ ] Push code lên GitHub
- [ ] Link GitHub repo với Vercel
- [ ] Add environment variables trên Vercel dashboard
- [ ] Deploy test: `vercel`
- [ ] Test staging deployment
- [ ] Deploy production: `vercel --prod`

### Post-deployment
- [ ] Test production URL
- [ ] Verify email delivery từ production
- [ ] Check database connections
- [ ] Monitor Redis usage
- [ ] Setup uptime monitoring (UptimeRobot free)

---

## 🎨 Phase 10: Polish & Optimization (Tuần 8)

### Performance
- [ ] Implement image lazy loading
- [ ] Add loading skeletons
- [ ] Optimize bundle size (code splitting)
- [ ] Add service worker for offline support (optional)
- [ ] Setup CDN for static assets

### UX Improvements
- [ ] Add loading states cho tất cả async actions
- [ ] Improve error messages
- [ ] Add empty states
- [ ] Add confirmation dialogs cho destructive actions
- [ ] Implement search debouncing
- [ ] Add filters animation

### SEO (Optional)
- [ ] Add meta tags
- [ ] Add Open Graph tags
- [ ] Generate sitemap
- [ ] Setup Google Analytics

---

## 📊 Success Metrics

### Technical KPIs
- [ ] Page load time < 2s
- [ ] API response time < 200ms (p95)
- [ ] Zero race conditions trong booking
- [ ] 99.9% uptime
- [ ] Mobile responsive score > 95/100

### Business KPIs
- [ ] User registration conversion
- [ ] Booking completion rate
- [ ] Order completion rate
- [ ] Average order value
- [ ] Customer retention

---

## 🔧 Maintenance Checklist

### Daily
- [ ] Check error logs
- [ ] Monitor Upstash Redis usage (10k limit)
- [ ] Check email delivery rate

### Weekly
- [ ] Review and respond to user feedback
- [ ] Check database size (Neon 500MB limit)
- [ ] Backup critical data

### Monthly
- [ ] Review performance metrics
- [ ] Update dependencies
- [ ] Security audit
- [ ] Database optimization (vacuum, reindex)

---

## 📝 Documentation Checklist

- [ ] README.md cập nhật với instructions mới
- [ ] API documentation (Swagger/Postman collection)
- [ ] Environment variables list
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Architecture diagram
- [ ] Database schema diagram

---

## 🎯 MVP Definition (Minimum Viable Product)

Để launch MVP, cần hoàn thành:

**Core Features (Must Have):**
- ✅ User authentication (register, login, logout)
- ✅ Browse products
- ✅ Book appointment với Redis lock
- ✅ Email confirmation
- ✅ Admin dashboard basic (view bookings)
- ✅ Deploy to production

**Nice to Have (Phase 2):**
- Order products (e-commerce)
- Payment integration
- Advanced admin features
- Image upload
- Search & filters

---

## 🚦 Current Status

**Đang ở giai đoạn:** Frontend-only prototype  
**Tiếp theo:** Phase 1 - Setup & Infrastructure  
**ETA MVP:** 7-8 tuần (part-time work)

---

**Lưu ý:** Đánh dấu ✅ mỗi task khi hoàn thành. Update file này thường xuyên để track progress.
