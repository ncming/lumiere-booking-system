import { useState, useEffect } from 'react';

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'New Collection',
    title: 'AUTOMNE 2025',
    cta: 'Discover the Collection',
  },
  {
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'Exclusive Campaign',
    title: 'FEMME ÉTERNELLE',
    cta: 'Explore Now',
  },
  {
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'Resort 2025',
    title: 'LUMIÈRE DU SUD',
    cta: 'View Lookbook',
  },
];

const editorialGrid = [
  {
    img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=900&auto=format&fit=crop',
    label: 'Iconic Handbags',
    sub: 'The new classics',
    tall: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=900&auto=format&fit=crop',
    label: 'Rouge Lumière',
    sub: 'The art of color',
    tall: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=900&auto=format&fit=crop',
    label: 'Fine Jewelry',
    sub: 'Timeless adornment',
    tall: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=900&auto=format&fit=crop',
    label: "Women's Fashion",
    sub: 'Ready-to-wear',
    tall: true,
  },
];

const categories = [
  { label: "Women's", img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop' },
  { label: "Men's", img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
  { label: "Bags", img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' },
  { label: "Jewelry", img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop' },
  { label: "Beauty", img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop' },
];

const Home = ({ setActiveTab }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [hoveredCat, setHoveredCat] = useState(null);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeroIndex(prev => (prev + 1) % heroSlides.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx) => {
    if (idx === heroIndex) return;
    setFade(false);
    setTimeout(() => { setHeroIndex(idx); setFade(true); }, 300);
  };

  const slide = heroSlides[heroIndex];

  return (
    <div style={{ width: '100%', backgroundColor: '#FFFFFF', paddingTop: '33px' }}>

      {/* ─── 1. HERO FULLSCREEN SLIDER ─────────────────────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '580px',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
      }}>
        {/* Image */}
        <img
          key={heroIndex}
          src={slide.img}
          alt={slide.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)',
        }} />

        {/* Hero text */}
        <div style={{
          position: 'absolute', bottom: '80px', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          padding: '0 24px',
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <div style={{
            fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)', marginBottom: '14px', fontFamily: 'inherit',
          }}>
            {slide.subtitle}
          </div>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: '400', color: '#fff', letterSpacing: '6px',
            marginBottom: '32px', lineHeight: '1.1',
          }}>
            {slide.title}
          </h1>
          <button
            onClick={() => setActiveTab('/explore')}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.8)',
              color: '#fff', padding: '14px 40px',
              fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
          >
            {slide.cta}
          </button>
        </div>

        {/* Slide dots */}
        <div style={{
          position: 'absolute', bottom: '32px', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: '10px',
        }}>
          {heroSlides.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === heroIndex ? '28px' : '6px',
                height: '1px',
                backgroundColor: i === heroIndex ? '#fff' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '60px', right: '32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ fontSize: '8px', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
            Scroll
          </div>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
        </div>
      </div>

      {/* ─── 2. MARQUEE / ANNOUNCEMENT ─────────────────────── */}
      <div style={{
        borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0',
        padding: '14px 0', overflow: 'hidden', position: 'relative',
        backgroundColor: '#fff',
      }}>
        <div style={{
          display: 'flex', gap: '80px', width: 'max-content',
          animation: 'marquee 24s linear infinite',
        }}>
          {[...Array(4)].flatMap(() => [
            'Complimentary Shipping & Returns',
            '✦',
            'New Arrivals — Automne 2025',
            '✦',
            'Exclusive Boutique Appointments',
            '✦',
          ]).map((text, i) => (
            <span key={i} style={{
              fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#000', whiteSpace: 'nowrap',
              fontWeight: text === '✦' ? '400' : '400',
            }}>{text}</span>
          ))}
        </div>
      </div>

      {/* ─── 3. CATEGORY QUICK LINKS ────────────────────────── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 20px',
      }}>
        <div style={{
          display: 'flex', gap: '12px', overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}>
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => setActiveTab('/explore')}
              onMouseOver={() => setHoveredCat(i)}
              onMouseOut={() => setHoveredCat(null)}
              style={{
                flexShrink: 0,
                width: 'clamp(100px, 16vw, 180px)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                backgroundColor: '#F5F5F5',
              }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: hoveredCat === i ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>
              <div style={{
                marginTop: '12px', textAlign: 'center',
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                color: '#000',
              }}>
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4. EDITORIAL GRID ──────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
            Collections
          </div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '400', letterSpacing: '3px',
          }}>
            Curated for You
          </h2>
        </div>

        {/* Asymmetric editorial grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '16px',
        }}>
          {/* Left tall item */}
          <div
            onClick={() => setActiveTab('/explore')}
            style={{ cursor: 'pointer', gridRow: '1 / 3' }}
          >
            <div style={{ width: '100%', aspectRatio: '3/5', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <img
                src={editorialGrid[0].img}
                alt={editorialGrid[0].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '400' }}>
                {editorialGrid[0].label}
              </div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>
                {editorialGrid[0].sub}
              </div>
            </div>
          </div>

          {/* Top-right */}
          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <img
                src={editorialGrid[1].img}
                alt={editorialGrid[1].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>{editorialGrid[1].label}</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>{editorialGrid[1].sub}</div>
            </div>
          </div>

          {/* Bottom-right */}
          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <img
                src={editorialGrid[2].img}
                alt={editorialGrid[2].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>{editorialGrid[2].label}</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>{editorialGrid[2].sub}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. FULL-WIDTH EDITORIAL BANNER ─────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(380px, 55vw, 700px)', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop"
          alt="Women's Fashion"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: 'clamp(32px, 8vw, 100px)',
          transform: 'translateY(-50%)',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '16px' }}>
            Women's Fashion
          </div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: '400', color: '#fff',
            letterSpacing: '3px', marginBottom: '32px', maxWidth: '500px', lineHeight: '1.2',
          }}>
            The Art of<br />Haute Couture
          </h2>
          <button
            onClick={() => setActiveTab('/explore')}
            style={{
              background: '#fff', border: '1px solid #fff',
              color: '#000', padding: '14px 36px',
              fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
          >
            Explore Women's
          </button>
        </div>
      </div>

      {/* ─── 6. BOUTIQUE APPOINTMENT CTA ─────────────────────── */}
      <div style={{
        textAlign: 'center', padding: 'clamp(60px, 8vw, 100px) 24px',
        backgroundColor: '#FAFAFA', borderTop: '1px solid #EEEEEE',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#757575', marginBottom: '16px' }}>
          Personalized Service
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: '400', letterSpacing: '2px', marginBottom: '16px',
        }}>
          Book a Boutique Appointment
        </h2>
        <p style={{ fontSize: '13px', color: '#757575', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.8', letterSpacing: '0.3px' }}>
          Experience the world of Lumière with a private appointment at your nearest boutique. Our advisors are at your disposal.
        </p>
        <button
          onClick={() => setActiveTab('/reserve')}
          style={{
            background: '#000', border: '1px solid #000', color: '#fff',
            padding: '16px 48px', fontSize: '10px', letterSpacing: '3px',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#222'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#000'; }}
        >
          Book an Appointment
        </button>
      </div>

      {/* Marquee keyframes injected */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;