import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isBagOpen, setIsBagOpen] = useState(false);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 1800);
  }, []);

  const addToCart = useCallback((product, selectedOption) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedOption === selectedOption
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceNum: product.priceNum || 0,
          image: product.image,
          category: product.category,
          selectedOption,
          qty: 1,
        },
      ];
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

  const toggleBag = useCallback(() => setIsBagOpen(prev => !prev), []);
  const closeBag = useCallback(() => setIsBagOpen(false), []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

  return (
    <AppContext.Provider value={{
      cartItems,
      toast,
      isBagOpen,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      toggleBag,
      closeBag,
      clearCart,
      showToast,
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
