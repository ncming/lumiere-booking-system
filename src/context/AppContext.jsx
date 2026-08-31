import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // ─── Toast (defined first so other callbacks can depend on it) ────
  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 1800);
  }, []);

  // ─── Cart ──────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mitu-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('mitu-cart', JSON.stringify(cartItems)); }
    catch { /* quota exceeded */ }
  }, [cartItems]);

  const addToCart = useCallback((product, selectedOption) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedOption === selectedOption
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], qty: updated[existingIndex].qty + 1 };
        return updated;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum || 0,
        image: product.image,
        category: product.category,
        selectedOption,
        qty: 1,
      }];
    });
    showToast(`"${product.name}" added to your Shopping Bag`);
  }, [showToast]);

  const removeFromCart = useCallback((productId, selectedOption) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.selectedOption === selectedOption))
    );
  }, []);

  const updateQty = useCallback((productId, selectedOption, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId && item.selectedOption === selectedOption) {
          const newQty = item.qty + delta;
          return newQty <= 0 ? null : { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    try { localStorage.removeItem('mitu-cart'); } catch { /* ignore */ }
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

  // ─── Wishlist ──────────────────────────────────────────────────────
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mitu-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('mitu-wishlist', JSON.stringify(wishlistItems)); }
    catch { /* quota exceeded */ }
  }, [wishlistItems]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum || 0,
        image: product.image,
        category: product.category,
      }];
    });
    // showToast is defined before this callback — safe to call
    showToast(`"${product.name}" saved to Wishlist`);
  }, [showToast]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(p => p.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  // ─── Pending Search (NavBar → Explore) ───────────────────────────
  const [pendingSearch, setPendingSearch] = useState('');

  // ─── Bag drawer ───────────────────────────────────────────────────
  const [isBagOpen, setIsBagOpen] = useState(false);
  const toggleBag = useCallback(() => setIsBagOpen(prev => !prev), []);
  const closeBag = useCallback(() => setIsBagOpen(false), []);

  return (
    <AppContext.Provider value={{
      // Cart
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateQty, clearCart,
      // Wishlist
      wishlistItems, wishlistCount,
      addToWishlist, removeFromWishlist, isInWishlist,
      // Bag drawer
      isBagOpen, toggleBag, closeBag,
      // Toast
      toast, showToast,
      // Search
      pendingSearch, setPendingSearch,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
