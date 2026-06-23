import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Footer = ({ setCurrentPath }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    showToast('✦ You are now subscribed to Lumière Maison');
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const socialIcons = [
    {
      label: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      label: 'Pinterest',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.15 1.22-5.15s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.1-2.37 3.1-5.17 0-2.14-1.44-3.63-3.51-3.63-2.39 0-3.79 1.79-3.79 3.65 0 .72.28 1.5.62 1.92a.25.25 0 01.06.24l-.23.95c-.04.14-.12.17-.28.1-1.04-.49-1.69-2.01-1.69-3.24 0-2.63 1.91-5.05 5.52-5.05 2.9 0 5.15 2.07 5.15 4.83 0 2.88-1.82 5.2-4.34 5.2-.85 0-1.64-.44-1.91-.96l-.52 1.94c-.19.72-.69 1.63-1.03 2.18.78.24 1.6.37 2.45.37 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: 'WeChat',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M9.5 3C5.36 3 2 6.13 2 10c0 2.08 1.02 3.94 2.64 5.22L4 18l3.07-1.53A8.2 8.2 0 009.5 17c4.14 0 7.5-3.13 7.5-7S13.64 3 9.5 3z"/>
          <path d="M20 21l-2.5-1.23A6.3 6.3 0 0116 20c-3.31 0-6-2.46-6-5.5s2.69-5.5 6-5.5 6 2.46 6 5.5a5.3 5.3 0 01-2 4.15L20 21z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>

      {/* Top section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 60px) clamp(40px, 6vw, 64px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(40px, 5vw, 60px)',
      }}>

        {/* Col 1 — Brand */}
        <div>
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '28px',
            fontWeight: '400',
            letterSpacing: '3px',
            marginBottom: '12px',
          }}>
            Lumière
          </div>
          <div style={{
            fontSize: '9px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '28px',
            lineHeight: 1.8,
          }}>
            Maison de Haute Couture<br />Since 1993
          </div>

          {/* Divider */}
          <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: '28px' }} />

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {socialIcons.map(({ label, icon }) => (
              <div
                key={label}
                title={label}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'color 0.25s',
                }}
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Col 2 — Newsletter */}
        <div>
          <div style={{
            fontSize: '8px', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            marginBottom: '16px',
          }}>
            Newsletter
          </div>
          <div style={{
            fontSize: '18px',
            fontFamily: '"Playfair Display", serif',
            fontWeight: '400',
            letterSpacing: '1px',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}>
            Receive exclusive news from the Maison
          </div>
          <div style={{
            fontSize: '10px', color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7, marginBottom: '24px',
          }}>
            New collections, private events, and client privileges — delivered first to you.
          </div>

          {subscribed ? (
            <div style={{
              padding: '14px 0',
              fontSize: '10px',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.6)',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}>
              ✦ Thank you for subscribing
            </div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.3)', marginBottom: '0' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    letterSpacing: '0.5px',
                    padding: '10px 0',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '10px 0 10px 16px',
                    whiteSpace: 'nowrap',
                    opacity: email ? 1 : 0.4,
                    transition: 'opacity 0.2s',
                  }}
                >
                  Subscribe →
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Col 3 — Client Services */}
        <div>
          <div style={{
            fontSize: '8px', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            marginBottom: '16px',
          }}>
            Client Services
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Hotline */}
            <div>
              <div style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
                VIP Hotline
              </div>
              <div style={{ fontSize: '13px', letterSpacing: '1px', fontFamily: '"Playfair Display", serif' }}>
                1800 ✦✦✦✦
              </div>
            </div>

            {/* Hours */}
            <div>
              <div style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
                Opening Hours
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Monday – Sunday<br />9:30 AM – 9:00 PM
              </div>
            </div>

            {/* Boutique Locator */}
            <div>
              <div
                onClick={() => setCurrentPath('/reserve')}
                style={{
                  fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  paddingTop: '4px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Find a Boutique
              </div>
            </div>

            {/* Book Appointment */}
            <div>
              <div
                onClick={() => setCurrentPath('/reserve')}
                style={{
                  fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book a Styling Session
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px clamp(20px, 5vw, 60px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
          © 2024 Lumière Maison. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Legal Mentions', 'Cookies', 'Accessibility'].map(link => (
            <span key={link} style={{
              fontSize: '9px', color: 'rgba(255,255,255,0.3)',
              letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
