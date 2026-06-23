import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const ToastNotification = () => {
  const { toast } = useApp();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (toast.visible) {
      setIsAnimating(true);
    } else {
      const t = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(t);
    }
  }, [toast.visible]);

  if (!isAnimating && !toast.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '14px 24px',
        minWidth: '280px',
        maxWidth: '380px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
        transform: toast.visible ? 'translateY(0)' : 'translateY(120%)',
        opacity: toast.visible ? 1 : 0,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
        pointerEvents: 'none',
      }}
    >
      {/* Decorative left bar */}
      <div style={{
        width: '2px',
        height: '36px',
        backgroundColor: '#FFFFFF',
        opacity: 0.4,
        flexShrink: 0,
      }} />

      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '8px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '4px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}>
          Lumière Maison
        </div>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.5px',
          fontWeight: '300',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          lineHeight: 1.4,
        }}>
          {toast.message}
        </div>
      </div>

      {/* Checkmark icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" style={{ flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

export default ToastNotification;
