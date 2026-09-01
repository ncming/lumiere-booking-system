# 🚀 Quick Start Guide - Lumiere Booking System

## ⚡ Khởi động nhanh (5 phút)

### Bước 1: Clone và Install

```bash
# Clone repository (nếu từ git)
git clone <your-repo-url>
cd lumiere-booking-system

# Install dependencies
npm install
```

### Bước 2: Đăng ký Cloud Services (100% FREE)

Mở 5 tabs và đăng ký nhanh các dịch vụ sau:

1. **Neon** (Database): https://neon.tech
   - Tạo project → Copy connection string

2. **Upstash** (Redis): https://upstash.com
   - Tạo database → Copy URL và Token

3. **Resend** (Email): https://resend.com
   - Tạo API key

4. **Cloudinary** (Images): https://cloudinary.com
   - Copy Cloud Name, API Key, API Secret từ Dashboard

5. **Vercel** (Hosting): https://vercel.com
   - Connect với GitHub (để deploy sau)

### Bước 3: Setup Environment Variables

```bash
# Copy template files
copy .env.example .env
copy .env.local.example .env.local

# Mở file .env và điền tất cả credentials từ Bước 2
# Nhớ generate JWT_SECRET: openssl rand -base64 32
```

**File `.env` (Backend)**:
```env
DATABASE_URL="postgresql://..." # Từ Neon
UPSTASH_REDIS_URL="https://..." # Từ Upstash
UPSTASH_REDIS_TOKEN="AXxx..."   # Từ Upstash
RESEND_API_KEY="re_xxx..."      # Từ Resend
CLOUDINARY_CLOUD_NAME="..."     # Từ Cloudinary
CLOUDINARY_API_KEY="..."        # Từ Cloudinary
CLOUDINARY_API_SECRET="..."     # Từ Cloudinary
JWT_SECRET="random-32-char-string"
PORT=3001
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

**File `.env.local` (Frontend)**:
```env
VITE_API_URL="http://localhost:3001/api"
```

### Bước 4: Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run first migration
npm run prisma:migrate

# (Optional) Open Prisma Studio để xem database
npm run prisma:studio
```

### Bước 5: Start Development Server

```bash
# Chạy cả Frontend + Backend cùng lúc
npm run dev:all

# Hoặc chạy riêng (2 terminals):
# Terminal 1 - Backend:
npm run dev:server

# Terminal 2 - Frontend:
npm run dev
```

🎉 **Xong!** Mở trình duyệt: http://localhost:5173

---

## 📋 Checklist hoàn thành

- [ ] Đã install dependencies: `npm install`
- [ ] Đã đăng ký 4 cloud services (Neon, Upstash, Resend, Cloudinary)
- [ ] Đã copy `.env.example` → `.env` và điền credentials
- [ ] Đã copy `.env.local.example` → `.env.local`
- [ ] Đã chạy `npm run prisma:generate`
- [ ] Đã chạy `npm run prisma:migrate`
- [ ] Đã start server: `npm run dev:all`
- [ ] Frontend đang chạy tại http://localhost:5173
- [ ] Backend đang chạy tại http://localhost:3001

---

## 🧪 Test hệ thống

### 1. Test Backend Health Check

Mở trình duyệt: http://localhost:3001/health

Kết quả mong đợi:
```json
{
  "status": "OK",
  "timestamp": "2024-...",
  "environment": "development"
}
```

### 2. Test Authentication

1. Mở frontend: http://localhost:5173
2. Click vào icon User (góc trên phải)
3. Đăng ký tài khoản mới:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Sau khi đăng ký thành công, sẽ tự động login

### 3. Test Booking System

1. Đã login → Click "Reserve" trên NavBar
2. Chọn Boutique
3. Chọn Stylist, Date, Time
4. Click "Continue" → "Confirm Appointment"
5. Kiểm tra console backend → phải thấy log "Booking created"
6. Check email (nếu đã config Resend) → nhận confirmation email

### 4. Test Database (Prisma Studio)

```bash
npm run prisma:studio
```

Mở http://localhost:5555 → Xem tables: User, Booking, Product, etc.

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Frontend only (Vite)
npm run dev:server       # Backend only (Node + Nodemon)
npm run dev:all          # Frontend + Backend cùng lúc

# Production Build
npm run build            # Build frontend
npm run server           # Start production backend

# Database (Prisma)
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:push      # Push schema to DB (no migration)
npm run prisma:seed      # Seed database với sample data

# Deployment
npm run vercel-build     # Build cho Vercel (auto run)

# Code Quality
npm run lint             # Run ESLint
```

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module '@prisma/client'"

```bash
npm run prisma:generate
```

### Lỗi: "Database connection failed"

- Kiểm tra `DATABASE_URL` trong `.env`
- Đảm bảo có `?sslmode=require` ở cuối connection string
- Test connection: `npm run prisma:studio`

### Lỗi: "CORS policy blocking"

- Kiểm tra `FRONTEND_URL` trong `.env` khớp với frontend URL
- Restart backend server

### Lỗi: "Redis connection timeout"

- Kiểm tra `UPSTASH_REDIS_URL` và `UPSTASH_REDIS_TOKEN`
- Redis không bắt buộc cho development, hệ thống vẫn chạy được

### Frontend không connect được Backend

1. Kiểm tra backend đang chạy: http://localhost:3001/health
2. Kiểm tra `VITE_API_URL` trong `.env.local`
3. Restart Vite dev server (Ctrl+C → `npm run dev`)

---

## 📚 Tài liệu chi tiết

- **DEVELOPMENT_ROADMAP.md** - Lộ trình phát triển đầy đủ
- **SETUP_GUIDE.md** - Hướng dẫn setup từng bước
- **PROJECT_CHECKLIST.md** - Checklist theo dõi tiến độ
- **README.md** - Tổng quan dự án

---

## 🚀 Next Steps

Sau khi chạy thành công local, bạn có thể:

1. **Seed sample data**: Tạo products, users mẫu
2. **Build Admin Dashboard**: Quản lý bookings, orders
3. **Deploy to Production**: Follow SETUP_GUIDE.md phần Deploy

---

## 💡 Pro Tips

1. **Sử dụng Prisma Studio** để debug database:
   ```bash
   npm run prisma:studio
   ```

2. **Monitor Redis** trên Upstash Dashboard để xem slot locks

3. **Test Email** bằng Resend Dashboard → "Logs"

4. **Check Backend Logs** trong terminal để debug API calls

5. **Use Thunder Client** (VS Code extension) để test API endpoints

---

## 🆘 Support

Nếu gặp vấn đề:

1. Kiểm tra tất cả environment variables đã điền đúng
2. Kiểm tra Node.js version >= 18: `node --version`
3. Xóa `node_modules` và reinstall: `rm -rf node_modules && npm install`
4. Check file SETUP_GUIDE.md phần Troubleshooting

Happy coding! ✦
