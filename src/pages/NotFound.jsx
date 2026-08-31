const NotFound = ({ setActiveTab }) => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 40px',
      backgroundColor: '#FFFFFF',
    }}>
      {/* Large 404 */}
      <div style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(80px, 18vw, 180px)',
        fontWeight: '400',
        letterSpacing: '10px',
        color: '#F2F2F2',
        lineHeight: 1,
        marginBottom: '0',
        userSelect: 'none',
      }}>
        404
      </div>

      {/* Divider */}
      <div style={{ width: '48px', height: '1px', backgroundColor: '#000', margin: '0 auto 28px' }} />

      <div style={{
        fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase',
        color: '#757575', marginBottom: '16px',
      }}>
        Page Not Found
      </div>

      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(20px, 3vw, 30px)',
        fontWeight: '400',
        letterSpacing: '2px',
        color: '#000',
        marginBottom: '16px',
        lineHeight: 1.3,
      }}>
        This page has moved<br />or no longer exists
      </h1>

      <p style={{
        fontSize: '12px',
        color: '#757575',
        maxWidth: '380px',
        lineHeight: 1.8,
        marginBottom: '40px',
        letterSpacing: '0.3px',
      }}>
        You may have followed an outdated link, or the page has been relocated within our Maison.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveTab('/')}
          style={{
            padding: '14px 36px',
            backgroundColor: '#000', color: '#fff',
            border: '1px solid #000',
            fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.25s',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
        >
          Return to Home
        </button>
        <button
          onClick={() => setActiveTab('/explore')}
          style={{
            padding: '14px 36px',
            backgroundColor: '#fff', color: '#000',
            border: '1px solid #E0E0E0',
            fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.25s',
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = '#000'}
          onMouseOut={e => e.currentTarget.style.borderColor = '#E0E0E0'}
        >
          Explore Collections
        </button>
      </div>
    </div>
  );
};

export default NotFound;
