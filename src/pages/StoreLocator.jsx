import { BOUTIQUES } from '../data/boutiques';

const StoreLocator = ({ setActiveTab }) => {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFFFF', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(40px, 7vw, 80px) 24px clamp(32px, 5vw, 56px)',
        borderBottom: '1px solid #EEEEEE',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Our Maisons
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: '400', letterSpacing: '3px', marginBottom: '16px',
        }}>
          Find a Boutique
        </h1>
        <p style={{ fontSize: '12px', color: '#757575', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8, letterSpacing: '0.3px' }}>
          Step into one of our boutiques and experience the world of MITU Maison with personalised client service.
        </p>
      </div>

      {/* Map Banner */}
      <div style={{
        position: 'relative', width: '100%',
        height: 'clamp(220px, 35vw, 420px)',
        overflow: 'hidden', backgroundColor: '#1a1a1a',
      }}>
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop"
          alt="Vietnam map — boutique locations"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55 }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '8px',
        }}>
          <div style={{ fontSize: '9px', letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
            Vietnam
          </div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 3vw, 28px)', color: '#fff', letterSpacing: '4px', fontWeight: '400' }}>
            2 Boutiques
          </div>
          {/* Location pins */}
          <div style={{ display: 'flex', gap: '60px', marginTop: '8px' }}>
            {BOUTIQUES.map(b => (
              <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div style={{ fontSize: '8px', letterSpacing: '1px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {b.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Boutique Cards */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: 'clamp(24px, 4vw, 48px)',
      }}>
        {BOUTIQUES.map((b) => (
          <div
            key={b.id}
            style={{
              border: '1px solid #EEEEEE',
              overflow: 'hidden',
              transition: 'box-shadow 0.3s',
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Boutique Image */}
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={b.image}
                alt={b.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                backgroundColor: '#000', color: '#fff',
                fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                padding: '5px 12px',
              }}>
                {b.city}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '28px 24px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                MITU Maison
              </div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '22px', fontWeight: '400', letterSpacing: '1px',
                marginBottom: '20px', color: '#000',
              }}>
                {b.name}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: '📍', label: b.address },
                  { icon: '🕐', label: b.hours },
                  { icon: '📞', label: b.phone },
                  { icon: '✉', label: b.email },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                    <span style={{ fontSize: '11px', color: '#757575', letterSpacing: '0.3px', lineHeight: 1.5 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveTab('/reserve')}
                  style={{
                    flex: 1, padding: '12px',
                    backgroundColor: '#000', color: '#fff',
                    border: '1px solid #000',
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`, '_blank')}
                  style={{
                    flex: 1, padding: '12px',
                    backgroundColor: '#fff', color: '#000',
                    border: '1px solid #E0E0E0',
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#000'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#E0E0E0'}
                >
                  Get Directions ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Services Banner */}
      <div style={{
        backgroundColor: '#0A0A0A', color: '#fff',
        textAlign: 'center',
        padding: 'clamp(40px, 6vw, 64px) 24px',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
          VIP Client Services
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '400', letterSpacing: '2px',
          marginBottom: '12px',
        }}>
          Beyond the Boutique
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.8 }}>
          For our most discerning clients, we offer private shopping evenings, home visits, and bespoke consultations.
        </p>
        <button
          onClick={() => setActiveTab('/contact')}
          style={{
            padding: '14px 40px', backgroundColor: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,0.4)',
            fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.25s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
        >
          Contact Client Relations
        </button>
      </div>
    </div>
  );
};

export default StoreLocator;
