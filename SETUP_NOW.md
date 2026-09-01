# 🚀 Setup Lumiere Booking System - NGAY BÂY GIỜ

## ✅ Đã Hoàn Thành Tự Động

- ✅ Đã tạo file `.env` với tất cả credentials của bạn
- ✅ Đã tạo file `.env.local` cho frontend
- ✅ Tất cả code đã sẵn sàng

## 📋 Bạn Cần Chạy 3 Lệnh (5 phút)

### Bước 1: Fix Prisma Version (nếu cần)

Prisma version hiện tại có vấn đề. Chạy lệnh này để cài lại:

```powershell
npm uninstall prisma @prisma/client
npm install -D prisma@5.22.0
npm install @prisma/client@5.22.0
```

### Bước 2: Generate Prisma Client

```powershell
npx prisma generate --schema=./server/prisma/schema.prisma
```

Kết quả mong đợi:
```
✔ Generated Prisma Client (version X.X.X) to ./node_modules/@prisma/client
```

### Bước 3: Chạy Database Migration

```powershell
npx prisma migrate dev --name init --schema=./server/prisma/schema.prisma
```

Lệnh này sẽ:
- Tạo tất cả tables trong database Neon
- Tạo file migration
- Generate Prisma Client

Kết quả mong đợi:
```
✔ Database synchronized with schema
✔ Migration applied successfully
```

### Bước 4: Start Application

**Option A - Chạy cả Frontend + Backend cùng lúc:**
```powershell
npm run dev:all
```

**Option B - Chạy riêng (dùng 2 terminals):**

Terminal 1 (Backend):
```powershell
npm run dev:server
```

Terminal 2 (Frontend):
```powershell
npm run dev
```

---

## 🎯 Test Hệ Thống

### 1. Test Backend (mở browser)
http://localhost:3001/health

Kết quả:
```json
{
  "status": "OK",
  "timestamp": "2026-09-01T...",
  "environment": "development"
}
```

### 2. Test Frontend
http://localhost:5173

- Click icon User (góc phải)
- Register tài khoản mới:
  - Name: Test User
  - Email: test@example.com
  - Password: test123
- Sau khi đăng ký → tự động login
- Thử book appointment trong Reserve page

### 3. Xem Database (optional)
```powershell
npx prisma studio --schema=./server/prisma/schema.prisma
```
Mở: http://localhost:5555

---

## ⚠️ Nếu Gặp Lỗi

### Lỗi: "Prisma Client is not generated"
```powershell
npx prisma generate --schema=./server/prisma/schema.prisma
```

### Lỗi: "Can't reach database server"
Kiểm tra file `.env`:
- DATABASE_URL phải có `?sslmode=require`
- Không có khoảng trắng thừa

### Lỗi: "Port 3001 already in use"
```powershell
# Tìm process đang dùng port 3001
netstat -ano | findstr :3001

# Kill process (thay PID bằng số thực tế)
taskkill /PID <PID> /F
```

### Lỗi: "CORS policy blocking"
- Restart backend server
- Check FRONTEND_URL trong `.env` = `http://localhost:5173`

---

## 📊 Credentials Của Bạn (Đã Setup)

✅ **Database (Neon)**
- Connection: Đã config trong .env

✅ **Redis (Upstash)**
- URL: https://desired-squid-27088.upstash.io
- Token: Đã config

✅ **Email (Resend)**
- API Key: Đã config

✅ **Images (Cloudinary)**
- Cloud: wflzuuom
- API: Đã config

---

## 🎉 Sau Khi Chạy Xong

Bạn sẽ có:

✅ Backend API running tại http://localhost:3001
✅ Frontend running tại http://localhost:5173
✅ Database với 7 tables đã tạo
✅ Authentication hoạt động
✅ Booking system hoạt động
✅ Email notifications (check console logs)

---

## 📚 Next Steps

1. **Test chức năng**:
   - Register/Login
   - Book appointment
   - View My Bookings
   - Cancel booking

2. **Thêm sample data**:
   - Tạo products trong database
   - Hoặc dùng static data hiện tại

3. **Deploy** (khi sẵn sàng):
   - Push lên GitHub
   - Connect với Vercel
   - Add environment variables
   - Deploy!

---

## 💡 Quick Commands Reference

```powershell
# Development
npm run dev:all          # Frontend + Backend
npm run dev              # Frontend only
npm run dev:server       # Backend only

# Database
npx prisma studio --schema=./server/prisma/schema.prisma  # GUI
npx prisma migrate dev --schema=./server/prisma/schema.prisma  # Migration
npx prisma generate --schema=./server/prisma/schema.prisma     # Generate client

# Production
npm run build            # Build frontend
npm run server           # Start production server
```

---

**Chúc bạn thành công! 🚀✦**

Nếu gặp vấn đề, check lại:
1. Node.js version: `node --version` (cần >= 18)
2. All environment variables in `.env`
3. Database connection trong Prisma Studio
