# 🛠️ Hướng dẫn cài đặt chi tiết - Lumiere Booking System

## Bước 1: Kiểm tra môi trường

```powershell
# Kiểm tra Node.js (cần >= 18.x)
node --version

# Nếu chưa có, tải từ: https://nodejs.org/

# Kiểm tra npm
npm --version

# Kiểm tra Git
git --version
```

---

## Bước 2: Đăng ký các dịch vụ Cloud (100% miễn phí)

### 2.1. Neon (PostgreSQL Database)

1. Truy cập: https://neon.tech
2. Đăng ký bằng GitHub hoặc Google
3. Tạo project mới: **"lumiere-production"**
4. Chọn region gần nhất (Singapore cho VN)
5. Copy **Connection String**:
   ```
   postgresql://user:password@ep-xxx.region.neon.tech/neondb?sslmode=require
   ```

### 2.2. Upstash (Redis)

1. Truy cập: https://upstash.com
2. Đăng ký tài khoản
3. Tạo database Redis mới
4. Copy 2 thông tin:
   - **UPSTASH_REDIS_URL**: `https://xxx.upstash.io`
   - **UPSTASH_REDIS_TOKEN**: `Axxx...`

### 2.3. Resend (Email Service)

1. Truy cập: https://resend.com
2. Đăng ký tài khoản
3. Tạo API Key mới
4. Copy **API Key**: `re_xxx...`
5. (Tùy chọn) Verify domain riêng để gửi email từ `noreply@yourdomain.com`

### 2.4. Cloudinary (Image Storage)

1. Truy cập: https://cloudinary.com
2. Đăng ký tài khoản miễn phí
3. Vào Dashboard → Copy 3 thông tin:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2.5. Vercel (Hosting)

1. Truy cập: https://vercel.com
2. Đăng ký bằng GitHub
3. Không cần làm gì thêm, sẽ deploy sau

---

## Bước 3: Cài đặt Backend

### 3.1. Tạo cấu trúc thư mục

```powershell
# Trong thư mục project hiện tại
New-Item -ItemType Directory -Path server
New-Item -ItemType Directory -Path server\prisma
New-Item -ItemType Directory -Path server\routes
New-Item -ItemType Directory -Path server\middleware
New-Item -ItemType Directory -Path server\services
```

### 3.2. Cài đặt dependencies

```powershell
# Backend dependencies
npm install express cors dotenv cookie-parser express-rate-limit
npm install @prisma/client bcryptjs jsonwebtoken
npm install @upstash/redis resend cloudinary

# Dev dependencies
npm install -D prisma nodemon
```

### 3.3. Cập nhật package.json

Thêm scripts vào `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:server": "nodemon server/index.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:server\"",
    "build": "vite build",
    "preview": "vite preview",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:generate": "prisma generate"
  }
}
```

Cài thêm concurrently để chạy đồng thời frontend + backend:

```powershell
npm install -D concurrently
```

### 3.4. Tạo file .env

```powershell
# Tạo file .env
New-Item -ItemType File -Path .env
```

Nội dung file `.env`:

```env
# ── Database ──
DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/neondb?sslmode=require"

# ── Redis (Upstash) ──
UPSTASH_REDIS_URL="https://xxx.upstash.io"
UPSTASH_REDIS_TOKEN="Axxx..."

# ── Email (Resend) ──
RESEND_API_KEY="re_xxx..."

# ── Image Storage (Cloudinary) ──
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789"
CLOUDINARY_API_SECRET="xxx..."

# ── JWT Secret ──
JWT_SECRET="lumiere-super-secret-key-change-this-in-production-2024"

# ── URLs ──
FRONTEND_URL="http://localhost:5173"
PORT=3001
```

**⚠️ Lưu ý:** Thay thế tất cả giá trị `xxx...` bằng thông tin thực từ bước 2

### 3.5. Thêm .env vào .gitignore

```powershell
# Thêm vào file .gitignore
Add-Content -Path .gitignore -Value "`n# Environment variables`n.env`n.env.local"
```

---

## Bước 4: Thiết lập Database với Prisma

### 4.1. Khởi tạo Prisma

```powershell
npx prisma init
```

Lệnh này sẽ tạo:
- Thư mục `prisma/` với file `schema.prisma`
- File `.env` (nếu chưa có)

### 4.2. Di chuyển schema.prisma

```powershell
# Di chuyển vào thư mục server
Move-Item -Path prisma -Destination server\prisma
```

### 4.3. Copy nội dung Schema

Copy toàn bộ nội dung từ file `DEVELOPMENT_ROADMAP.md` (phần Database Schema) vào `server/prisma/schema.prisma`

### 4.4. Migrate Database

```powershell
# Chạy migration đầu tiên
npx prisma migrate dev --name init --schema=./server/prisma/schema.prisma

# Generate Prisma Client
npx prisma generate --schema=./server/prisma/schema.prisma
```

### 4.5. Mở Prisma Studio (Xem database)

```powershell
npx prisma studio --schema=./server/prisma/schema.prisma
```

Trình duyệt sẽ mở: http://localhost:5555

---

## Bước 5: Xây dựng Backend API

### 5.1. Tạo file server/index.js

Copy code từ `DEVELOPMENT_ROADMAP.md` → Phần "API Routes cần thiết"

### 5.2. Tạo các route files

```powershell
# Tạo các file routes
New-Item -ItemType File -Path server\routes\auth.js
New-Item -ItemType File -Path server\routes\products.js
New-Item -ItemType File -Path server\routes\bookings.js
New-Item -ItemType File -Path server\routes\orders.js
New-Item -ItemType File -Path server\routes\admin.js
```

Copy code từ roadmap vào từng file tương ứng.

### 5.3. Tạo middleware

```powershell
New-Item -ItemType File -Path server\middleware\auth.js
```

### 5.4. Tạo services

```powershell
New-Item -ItemType File -Path server\services\redis.js
New-Item -ItemType File -Path server\services\email.js
New-Item -ItemType File -Path server\services\cloudinary.js
```

### 5.5. Cấu hình ESM (ES Modules)

Thêm vào `package.json`:

```json
{
  "type": "module"
}
```

**Hoặc** đổi tên tất cả file `.js` → `.mjs`

---

## Bước 6: Kết nối Frontend với Backend

### 6.1. Tạo API Client

```powershell
New-Item -ItemType File -Path src\services\api.js
```

Copy code từ roadmap → Phần "Cấu hình API Client"

### 6.2. Cập nhật AppContext

Sửa file `src/context/AppContext.jsx` theo hướng dẫn trong roadmap.

### 6.3. Tạo trang Auth

```powershell
New-Item -ItemType File -Path src\pages\Auth.jsx
```

### 6.4. Cập nhật App.jsx

Thêm route Auth:

```javascript
// Trong App.jsx, thêm:
import Auth from './pages/Auth';

// Thêm vào phần renderPage:
if (activeTab === '/auth') return <Auth setActiveTab={setActiveTab} />;
```

### 6.5. Tạo file .env cho Vite

Tạo file `.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Bước 7: Chạy Development Server

### 7.1. Terminal 1 - Backend

```powershell
npm run dev:server
```

Hoặc:

```powershell
node server/index.js
```

### 7.2. Terminal 2 - Frontend

```powershell
npm run dev
```

### 7.3. Hoặc chạy cả hai cùng lúc

```powershell
npm run dev:all
```

Mở trình duyệt: http://localhost:5173

---

## Bước 8: Test các chức năng

### 8.1. Test Backend API (dùng Thunder Client hoặc Postman)

**Test Health Check:**
```
GET http://localhost:3001/health
```

**Test Register:**
```
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User",
  "phone": "0901234567",
  "password": "password123"
}
```

**Test Login:**
```
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy `token` từ response.

**Test Create Booking (cần token):**
```
POST http://localhost:3001/api/bookings
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "boutiqueId": "hcm-dong-khoi",
  "stylistId": "s1",
  "date": "2024-12-25",
  "timeSlot": "14:00",
  "occasion": "Personal Styling"
}
```

---

## Bước 9: Seed dữ liệu mẫu (Optional)

### 9.1. Tạo file seed

```powershell
New-Item -ItemType File -Path server\prisma\seed.js
```

Nội dung:

```javascript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Tạo Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lumiere.com' },
    update: {},
    create: {
      email: 'admin@lumiere.com',
      name: 'Lumiere Admin',
      passwordHash: adminPassword,
      role: 'ADMIN'
    }
  });
  
  // Tạo sản phẩm mẫu
  const products = [
    {
      slug: 'velvet-blazer',
      name: 'Velvet Blazer',
      description: 'Luxurious velvet evening blazer',
      category: 'Jackets',
      price: 2890,
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
      inStock: true
    },
    // Thêm sản phẩm khác...
  ];
  
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        variants: {
          create: [
            { size: 'XS', stock: 5 },
            { size: 'S', stock: 10 },
            { size: 'M', stock: 15 },
            { size: 'L', stock: 10 },
            { size: 'XL', stock: 5 }
          ]
        }
      }
    });
  }
  
  console.log('✅ Seed data created');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 9.2. Thêm script vào package.json

```json
{
  "prisma": {
    "seed": "node server/prisma/seed.js"
  },
  "scripts": {
    "seed": "node server/prisma/seed.js"
  }
}
```

### 9.3. Chạy seed

```powershell
npm run seed
```

---

## Bước 10: Deploy lên Production

### 10.1. Cài Vercel CLI

```powershell
npm install -g vercel
```

### 10.2. Login Vercel

```powershell
vercel login
```

### 10.3. Tạo file vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### 10.4. Thêm build script

Sửa `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate --schema=./server/prisma/schema.prisma && vite build"
  }
}
```

### 10.5. Deploy

```powershell
# Deploy test
vercel

# Deploy production
vercel --prod
```

### 10.6. Cấu hình Environment Variables trên Vercel

1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm TẤT CẢ biến từ file `.env` (trừ PORT):
   - `DATABASE_URL`
   - `UPSTASH_REDIS_URL`
   - `UPSTASH_REDIS_TOKEN`
   - `RESEND_API_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `JWT_SECRET`
   - `VITE_API_URL` (set = `https://yourdomain.vercel.app/api`)

3. Redeploy

---

## 🎉 Hoàn tất!

Bây giờ bạn có:

✅ Frontend React chạy trên Vercel  
✅ Backend API serverless trên Vercel  
✅ Database PostgreSQL trên Neon  
✅ Redis cache trên Upstash  
✅ Email service qua Resend  
✅ Image storage trên Cloudinary  

**Tất cả đều MIỄN PHÍ!**

---

## 🆘 Troubleshooting

### Lỗi: "Cannot find module '@prisma/client'"

```powershell
npx prisma generate --schema=./server/prisma/schema.prisma
```

### Lỗi: "CORS policy blocking"

Kiểm tra `FRONTEND_URL` trong `.env` khớp với URL frontend đang chạy.

### Lỗi: "Database connection failed"

- Kiểm tra `DATABASE_URL` trong `.env`
- Đảm bảo có `?sslmode=require` ở cuối connection string
- Test kết nối: `npx prisma db pull --schema=./server/prisma/schema.prisma`

### Lỗi: "Redis connection timeout"

- Kiểm tra `UPSTASH_REDIS_URL` và `UPSTASH_REDIS_TOKEN`
- Upstash có rate limit 10k requests/day, kiểm tra quota

### Frontend không connect được Backend

1. Kiểm tra backend đang chạy: http://localhost:3001/health
2. Kiểm tra `VITE_API_URL` trong `.env.local`
3. Restart Vite dev server sau khi thay đổi `.env.local`

---

## 📚 Tài nguyên học thêm

- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Authentication](https://jwt.io/introduction)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Redis Best Practices](https://redis.io/docs/management/optimization/)
