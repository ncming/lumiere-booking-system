// Email Service - Resend API
// Gửi email xác nhận booking, order, và notifications

import { Resend } from 'resend';

// Khởi tạo Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.EMAIL_FROM || 'Lumiere <noreply@lumiere.com>';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Kiểm tra email service configuration
 */
export function checkEmailService() {
  if (!resend) {
    console.warn('⚠️  Resend API key not configured. Email notifications disabled.');
    return false;
  }
  return true;
}

/**
 * Gửi email xác nhận booking
 * 
 * @param {Object} booking - Booking object từ database
 */
export async function sendBookingConfirmation(booking) {
  if (!resend) {
    console.warn('Email service not available, skipping booking confirmation');
    return;
  }
  
  try {
    const { user, boutiqueId, boutiqueName, stylistName, date, timeSlot, occasion } = booking;
    
    const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: '✦ Your Appointment at Lumiere',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e0e0e0; }
    .header { padding: 40px; text-align: center; border-bottom: 1px solid #e0e0e0; }
    .header h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 300; letter-spacing: 2px; margin: 0; }
    .content { padding: 40px; }
    .label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #999; margin-bottom: 4px; }
    .value { font-size: 14px; color: #000; margin-bottom: 20px; font-weight: 500; }
    .divider { height: 1px; background: #e0e0e0; margin: 30px 0; }
    .note { background: #f9f9f9; padding: 20px; border-left: 2px solid #000; font-size: 11px; color: #666; line-height: 1.8; }
    .footer { padding: 30px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✦ LUMIERE</h1>
      <p style="font-size: 10px; letter-spacing: 3px; color: #999; margin-top: 10px;">APPOINTMENT CONFIRMED</p>
    </div>
    
    <div class="content">
      <p style="font-size: 14px; margin-bottom: 30px;">Dear ${user.name},</p>
      
      <p style="font-size: 13px; color: #666; line-height: 1.8; margin-bottom: 30px;">
        Your private styling session has been confirmed. We look forward to welcoming you.
      </p>
      
      <div class="label">Boutique</div>
      <div class="value">${boutiqueName || boutiqueId}</div>
      
      <div class="label">Date & Time</div>
      <div class="value">${formattedDate} at ${timeSlot}</div>
      
      <div class="label">Your Stylist</div>
      <div class="value">${stylistName || 'Personal Stylist'}</div>
      
      ${occasion ? `
      <div class="label">Occasion</div>
      <div class="value">${occasion}</div>
      ` : ''}
      
      <div class="divider"></div>
      
      <div class="note">
        <strong style="font-size: 10px; letter-spacing: 1px; color: #000;">INCLUDED IN YOUR VISIT</strong><br><br>
        Private fitting salon · Curated selection prepared · Complimentary tea service · Personalised lookbook
      </div>
      
      <p style="font-size: 11px; color: #999; margin-top: 30px; line-height: 1.8;">
        Should you need to modify or cancel your appointment, please contact us at least 24 hours in advance.
      </p>
    </div>
    
    <div class="footer">
      <p>LUMIERE MAISON DE HAUTE COUTURE</p>
      <p style="margin-top: 10px;">
        <a href="${FRONTEND_URL}" style="color: #000; text-decoration: none;">View My Bookings</a>
      </p>
    </div>
  </div>
</body>
</html>
      `
    });
    
    console.log(`✓ Booking confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Send booking confirmation error:', error);
  }
}

/**
 * Gửi email xác nhận order
 * 
 * @param {Object} order - Order object từ database
 */
export async function sendOrderConfirmation(order) {
  if (!resend) {
    console.warn('Email service not available, skipping order confirmation');
    return;
  }
  
  try {
    const { user, items, totalAmount, createdAt } = order;
    
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${item.productName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-align: center;">${item.size || '-'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: '✦ Order Confirmation - Lumiere',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e0e0e0; }
    .header { padding: 40px; text-align: center; border-bottom: 1px solid #e0e0e0; }
    .content { padding: 40px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { text-align: left; padding: 10px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #999; }
    .total { font-size: 18px; font-weight: 600; text-align: right; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 300; letter-spacing: 2px; margin: 0;">✦ LUMIERE</h1>
      <p style="font-size: 10px; letter-spacing: 3px; color: #999; margin-top: 10px;">ORDER CONFIRMATION</p>
    </div>
    
    <div class="content">
      <p>Dear ${user.name},</p>
      <p style="color: #666; line-height: 1.8;">Thank you for your order. Your items will be carefully prepared and shipped soon.</p>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align: center;">Size</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div class="total">Total: $${totalAmount.toFixed(2)}</div>
      
      <p style="font-size: 11px; color: #999; margin-top: 40px;">
        Order ID: ${order.id}<br>
        Date: ${new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
</body>
</html>
      `
    });
    
    console.log(`✓ Order confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Send order confirmation error:', error);
  }
}

/**
 * Gửi email thông báo thay đổi status order
 * 
 * @param {Object} order - Order object với updated status
 */
export async function sendOrderStatusUpdate(order) {
  if (!resend) return;
  
  try {
    const { user, status, trackingNumber } = order;
    
    const statusMessages = {
      CONFIRMED: 'Your order has been confirmed and is being prepared.',
      PROCESSING: 'Your order is currently being processed.',
      SHIPPED: `Your order has been shipped${trackingNumber ? ` with tracking number: ${trackingNumber}` : ''}.`,
      DELIVERED: 'Your order has been delivered. We hope you enjoy your purchase!',
      CANCELLED: 'Your order has been cancelled.',
      REFUNDED: 'Your order has been refunded.'
    };
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `Order Update: ${status}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 40px; background: #f9f9f9;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border: 1px solid #e0e0e0;">
    <h2 style="font-family: Georgia, serif; font-weight: 300;">Order Status Update</h2>
    <p>Dear ${user.name},</p>
    <p style="font-size: 14px; color: #666; line-height: 1.8;">${statusMessages[status]}</p>
    <p style="font-size: 11px; color: #999; margin-top: 30px;">Order ID: ${order.id}</p>
  </div>
</body>
</html>
      `
    });
    
    console.log(`✓ Order status update email sent to ${user.email}`);
  } catch (error) {
    console.error('Send order status update error:', error);
  }
}

/**
 * Gửi email welcome cho user mới
 */
export async function sendWelcomeEmail(user) {
  if (!resend) return;
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Welcome to Lumiere',
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 40px; background: #f9f9f9;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; text-align: center; border: 1px solid #e0e0e0;">
    <h1 style="font-family: Georgia, serif; font-size: 32px; font-weight: 300; letter-spacing: 2px;">Welcome to Lumiere</h1>
    <p style="font-size: 14px; color: #666; line-height: 1.8; margin: 30px 0;">
      Thank you for joining our maison. Discover our curated collections and book a private styling session at your preferred boutique.
    </p>
    <a href="${FRONTEND_URL}/reserve" style="display: inline-block; padding: 14px 40px; background: #000; color: #fff; text-decoration: none; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 20px;">
      Book an Appointment
    </a>
  </div>
</body>
</html>
      `
    });
    
    console.log(`✓ Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Send welcome email error:', error);
  }
}

export default resend;
