# 🧪 Test Authentication Features - Quick Guide

## 🚀 Bắt Đầu Test

### 1. Start Application

```powershell
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend  
npm run dev
```

Mở browser: **http://localhost:5173**

---

## ✅ Test Checklist

### Test 1: User Menu (Not Logged In)

**Steps:**
1. Mở homepage
2. Click vào icon User (góc phải navbar)

**Expected:**
- ✓ Dropdown menu xuất hiện
- ✓ Hiển thị "Welcome to Lumiere"
- ✓ Có 2 buttons: "Sign In" và "Create Account"
- ✓ Click outside → menu đóng

---

### Test 2: Register New Account

**Steps:**
1. Click "Create Account" hoặc navigate to `/auth`
2. Điền form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 0901234567
   - Password: test123
3. Click "Create Account"

**Expected:**
- ✓ Loading state: button text → "Please wait..."
- ✓ Toast notification: "✦ Account created successfully"
- ✓ Auto-redirect về homepage
- ✓ User icon có green dot (indicator logged in)
- ✓ Click user icon → hiển thị user menu với "Test User"

**Errors to test:**
- Password < 6 chars → Error: "Password must be at least 6 characters"
- Email đã tồn tại → Error: "Email already registered"
- Missing fields → Error: "Please fill in all required fields"

---

### Test 3: Login

**Steps:**
1. Logout (click user icon → Sign Out)
2. Click user icon → Sign In
3. Điền credentials:
   - Email: test@example.com
   - Password: test123
4. Click "Sign In"

**Expected:**
- ✓ Toast: "✦ Welcome back"
- ✓ Redirect to homepage
- ✓ User logged in (green dot visible)

**Errors to test:**
- Wrong password → "Email or password is incorrect"
- Wrong email → "Email or password is incorrect"

---

### Test 4: User Menu (Logged In)

**Steps:**
1. Đảm bảo đã login
2. Click user icon

**Expected:**
- ✓ Hiển thị:
  - User name
  - Email address
  - My Bookings
  - My Orders
  - Wishlist
  - Account Settings
  - Sign Out

**Admin user thêm:**
- ✓ Admin badge (black)
- ✓ Admin Dashboard menu item

---

### Test 5: Create Booking (Not Logged In)

**Steps:**
1. Logout
2. Click "Reserve" trong navbar
3. Select boutique → Continue
4. Select stylist, date, time → Continue
5. Enter name & phone → Click "Confirm Appointment"

**Expected:**
- ✓ Toast: "✕ Please sign in to book an appointment"
- ✓ Redirect to `/auth`

---

### Test 6: Create Booking (Logged In)

**Steps:**
1. Login
2. Click "Reserve"
3. Select boutique: "Dong Khoi Flagship"
4. Select stylist: "Nguyễn Linh"
5. Select date: Tomorrow
6. Select time: "14:00"
7. Occasion: "Personal Styling"
8. Click Continue

**Expected:**
- ✓ Name & phone auto-filled từ profile
- ✓ Click "Confirm Appointment"
- ✓ Loading state: "Confirming..."
- ✓ Toast: "✦ Your appointment has been confirmed"
- ✓ Success page hiển thị appointment details

**Check Backend:**
```powershell
# Terminal backend should show:
✓ Booking created successfully
✓ Email notification sent (or logged if not configured)
```

---

### Test 7: My Bookings Page

**Steps:**
1. Click user icon → "My Bookings"

**Expected:**
- ✓ Navigate to `/my-bookings`
- ✓ Hiển thị appointment vừa tạo
- ✓ Status badge: CONFIRMED (green)
- ✓ Show all booking details:
  - Boutique name
  - Date & time
  - Stylist
  - Occasion

**Cancel Booking:**
1. Click "Cancel Appointment"
2. Confirm dialog
3. Expected:
   - ✓ Toast: "✦ Appointment cancelled"
   - ✓ Status badge → CANCELLED (red)
   - ✓ Cancel button disappeared

---

### Test 8: My Orders Page

**Steps:**
1. Click user icon → "My Orders"

**Expected (if no orders yet):**
- ✓ Navigate to `/my-orders`
- ✓ Empty state:
  - Icon ✦
  - "No orders yet"
  - "Explore Products" button

**With orders:**
- ✓ Order cards hiển thị:
  - Order # và date
  - Status badge
  - Items với images
  - Total amount
  - Cancel button (nếu PENDING/CONFIRMED)

---

### Test 9: Account Settings

**Steps:**
1. Click user icon → "Account Settings"

**Expected:**
- ✓ Navigate to `/account`
- ✓ Sidebar navigation:
  - Profile Information ✓ (active)
  - Security
  - Preferences

**Test Profile Edit:**
1. Click "Edit Profile"
2. Change name to "Updated User"
3. Change phone to "0987654321"
4. Click "Save Changes"
5. Expected:
   - ✓ Loading: "Saving..."
   - ✓ Toast: "✦ Profile updated successfully"
   - ✓ Form back to read-only mode
   - ✓ User menu shows updated name

**Test Change Password:**
1. Click "Security" in sidebar
2. Fill form:
   - Current: test123
   - New: newpass123
   - Confirm: newpass123
3. Click "Change Password"
4. Expected:
   - ✓ Toast: "✦ Password changed successfully"
   - ✓ Form cleared

**Errors:**
- Current password wrong → "Current password is incorrect"
- Passwords don't match → "Passwords do not match"
- New password < 6 chars → "Password must be at least 6 characters"

---

### Test 10: Protected Routes

**Test unauthorized access:**

1. Logout
2. Manually navigate to `/my-bookings`
   - ✓ Auto-redirect to `/auth`

3. Navigate to `/my-orders`
   - ✓ Auto-redirect to `/auth`

4. Navigate to `/account`
   - ✓ Auto-redirect to `/auth`

---

### Test 11: Sign Out

**Steps:**
1. Logged in
2. Click user icon → "Sign Out"

**Expected:**
- ✓ Toast: "✦ Signed out"
- ✓ Redirect to homepage
- ✓ Green dot disappeared
- ✓ User menu back to "Sign In / Create Account"
- ✓ localStorage cleared

---

## 🔍 Debug Checklist

### Backend Not Connecting?

```powershell
# Test health endpoint
curl http://localhost:3001/health

# Should return:
{"status":"OK","timestamp":"...","environment":"development"}
```

### Register Not Working?

1. Check backend terminal for errors
2. Check browser console (F12)
3. Verify DATABASE_URL in `.env`
4. Test database connection:
```powershell
npx prisma studio --schema=./server/prisma/schema.prisma
```

### Booking Not Creating?

1. Check if logged in (green dot)
2. Check backend logs for API errors
3. Verify Redis config (không bắt buộc, sẽ có warning)
4. Check database after booking:
```powershell
npx prisma studio --schema=./server/prisma/schema.prisma
# → Open "Booking" table → See new entry
```

### Token Expired?

1. Logout and login again
2. Token expires after 7 days
3. Check browser localStorage:
```javascript
// In browser console:
localStorage.getItem('authToken')
```

---

## 📊 Success Criteria

**All tests pass if:**

✅ Register works → User created in database  
✅ Login works → Token stored, user menu updated  
✅ Booking requires login → Redirect to /auth  
✅ Booking creation → Saved to database  
✅ My Bookings shows data → From database  
✅ My Orders accessible → Protected route works  
✅ Account Settings → Profile editable  
✅ Change Password → Updates in database  
✅ Sign Out → Clears auth, redirects home  
✅ Protected routes → Redirect when not auth  

---

## 🎯 Quick Test (1 minute)

```
1. Open http://localhost:5173
2. Click user icon → Create Account
3. Register: test@example.com / test123
4. ✓ Should login automatically
5. Click Reserve → Fill form → Confirm
6. ✓ Should create booking
7. Click user icon → My Bookings
8. ✓ Should see booking
9. Click user icon → Sign Out
10. ✓ Should logout
```

**All pass? → System working! 🎉**

---

## 📸 Screenshots to Verify

1. **User Menu (Not Logged In)**
   - Shows "Sign In" / "Create Account"

2. **User Menu (Logged In)**
   - Shows user name & email
   - Green dot indicator

3. **My Bookings**
   - Booking card với status badge

4. **Account Settings**
   - Sidebar navigation
   - Profile form

5. **Reserve (Logged In)**
   - Name & phone pre-filled

---

**Ready to test? Start với Test 1! 🚀**
