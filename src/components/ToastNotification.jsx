import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const ToastNotification = () => {
  const { toast } = useApp();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (toast.visible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(true);
    } else {
      const t = setTimeout(() => setIsAnimating(false), 350);
      return () => clearTimeout(t);
    }
  }, [toast.visible]);

  if (!isAnimating && !toast.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 9999,
        padding: '12px 18px',
        minWidth: '200px',
        maxWidth: '320px',
        // Dark glass
        backgroundColor: 'rgba(28, 28, 28, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.22)',
        color: 'rgba(255, 255, 255, 0.88)',
        // Animation
        transform: toast.visible ? 'translateY(0)' : 'translateY(14px)',
        opacity: toast.visible ? 1 : 0,
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.3px',
        lineHeight: 1.5,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '300',
      }}>
        {toast.message}
      </div>
    </div>
  );
};

export default ToastNotification;
