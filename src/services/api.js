// API Client - Frontend service để gọi Backend API
// Xử lý authentication, token management, và error handling

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  /**
   * Generic request wrapper
   */
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Token expired or invalid
          this.clearToken();
          throw new Error(data.message || 'Session expired. Please login again.');
        }

        throw new Error(data.message || data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      // Network errors
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }

      throw error;
    }
  }

  // ────────────────────────────────────────────────────────────
  // AUTHENTICATION
  // ────────────────────────────────────────────────────────────

  /**
   * Register new user
   */
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (data.token) {
      this.setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  /**
   * Login user
   */
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  /**
   * Get current user info
   */
  async getMe() {
    const data = await this.request('/auth/me');
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    const data = await this.request('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  /**
   * Logout
   */
  logout() {
    this.clearToken();
  }

  // ────────────────────────────────────────────────────────────
  // PRODUCTS
  // ────────────────────────────────────────────────────────────

  /**
   * Get products with filters
   */
  async getProducts(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/products?${query}`);
  }

  /**
   * Get product by slug
   */
  async getProduct(slug) {
    return this.request(`/products/${slug}`);
  }

  /**
   * Get categories
   */
  async getCategories() {
    return this.request('/products/categories');
  }

  /**
   * Create product (Admin only)
   */
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  /**
   * Update product (Admin only)
   */
  async updateProduct(productId, productData) {
    return this.request(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
  }

  /**
   * Delete product (Admin only)
   */
  async deleteProduct(productId) {
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // ────────────────────────────────────────────────────────────
  // BOOKINGS
  // ────────────────────────────────────────────────────────────

  /**
   * Check slot availability
   */
  async checkAvailability(boutiqueId, date) {
    const query = new URLSearchParams({ boutiqueId, date }).toString();
    return this.request(`/bookings/availability?${query}`);
  }

  /**
   * Create booking
   */
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  /**
   * Get my bookings
   */
  async getMyBookings() {
    return this.request('/bookings/my-bookings');
  }

  /**
   * Get booking by ID
   */
  async getBooking(bookingId) {
    return this.request(`/bookings/${bookingId}`);
  }

  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId, status, notes) {
    return this.request(`/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId, reason) {
    return this.updateBookingStatus(bookingId, 'CANCELLED', reason);
  }

  // ────────────────────────────────────────────────────────────
  // ORDERS
  // ────────────────────────────────────────────────────────────

  /**
   * Create order (Checkout)
   */
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  /**
   * Get my orders
   */
  async getMyOrders() {
    return this.request('/orders/my-orders');
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId, reason) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // ────────────────────────────────────────────────────────────
  // ADMIN
  // ────────────────────────────────────────────────────────────

  /**
   * Get dashboard stats
   */
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  /**
   * Get all bookings (Admin)
   */
  async getAdminBookings(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/admin/bookings?${query}`);
  }

  /**
   * Get all orders (Admin)
   */
  async getAdminOrders(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/admin/orders?${query}`);
  }

  /**
   * Get all users (Admin)
   */
  async getAdminUsers(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/admin/users?${query}`);
  }

  /**
   * Update user role (Admin)
   */
  async updateUserRole(userId, role) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  /**
   * Update order status (Admin)
   */
  async updateOrderStatus(orderId, status, trackingNumber) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, trackingNumber }),
    });
  }

  /**
   * Get revenue analytics (Admin)
   */
  async getRevenueAnalytics(year) {
    const query = year ? `?year=${year}` : '';
    return this.request(`/admin/analytics/revenue${query}`);
  }

  /**
   * Get booking analytics (Admin)
   */
  async getBookingAnalytics(period = 30) {
    return this.request(`/admin/analytics/bookings?period=${period}`);
  }
}

// Export singleton instance
export const api = new ApiClient();
export default api;
