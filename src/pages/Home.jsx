import { useState, useEffect } from 'react';

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'New Collection',
    title: 'AUTUMN 2025',
    cta: 'Discover the Collection',
  },
  {
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'Exclusive Campaign',
    title: 'THE ETERNAL WOMAN',
    cta: 'Explore Now',
  },
  {
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
    subtitle: 'Resort 2025',
    title: 'SOUTHERN LIGHT',
    cta: 'View Lookbook',
  },
];

const editorialGrid = [
  {
    img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=900&auto=format&fit=crop',
    label: 'Iconic Handbags',
    sub: 'The new classics',
    path: '/category/Handbags & Totes',
  },
  {
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=900&auto=format&fit=crop',
    label: 'MITU Red',
    sub: 'The art of color',
    path: '/category/Makeup',
  },
  {
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=900&auto=format&fit=crop',
    label: 'Fine Jewelry',
    sub: 'Timeless adornment',
    path: '/category/Jewelry',
  },
];

const categories = [
  { label: "Women's", img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop', path: "/category/Women's Ready-To-Wear" },
  { label: "Men's",   img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop', path: "/category/Men's Ready-To-Wear" },
  { label: "Bags",    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', path: '/category/Handbags & Totes' },
  { label: "Jewelry", img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop', path: '/category/Jewelry' },
  { label: "Beauty",  img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', path: '/category/Fragrance' },
];

const Home = ({ setActiveTab }) => {
  // Track which slide index each "layer" shows
  // We use two stacked <img> layers. The top layer fades out to reveal the bottom.
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [textVisible, setTextVisible] = useState(true);

  // Auto-advance with slow crossfade — no black flash
  useEffect(() => {
    const timer = setInterval(() => {
      // Start: pre-load next, text fades out
      setTextVisible(false);
      setNext((current + 1) % heroSlides.length);

      setTimeout(() => {
        // Crossfade starts — top image fades out over bottom
        setTransitioning(true);
      }, 300);

      setTimeout(() => {
        // Crossfade done — swap layers, reset
        setCurrent(prev => (prev + 1) % heroSlides.length);
        setTransitioning(false);
        setTextVisible(true);
      }, 1600); // 300ms text fade + 1300ms crossfade

    }, 8000); // 8s between slides (slower)
    return () => clearInterval(timer);
  }, [current]);

  const goToSlide = (idx) => {
    if (idx === current || transitioning) return;
    setTextVisible(false);
    setNext(idx);
    setTimeout(() => setTransitioning(true), 250);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
      setTextVisible(true);
    }, 1500);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#FFFFFF' }}>

      {/* ─── 1. HERO FULLSCREEN SLIDER ─────────────────────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '580px',
        overflow: 'hidden',
        // Background is always a solid dark — prevents any "black flash"
        backgroundColor: '#2a2624',
      }}>

        {/* Bottom layer: the NEXT image (always visible underneath) */}
        <img
          src={heroSlides[next].img}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
          }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* Top layer: current image — fades out during transition */}
        <img
          src={heroSlides[current].img}
          alt={heroSlides[current].title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: transitioning ? 0 : 1,
            transition: transitioning ? 'opacity 1.3s ease-in-out' : 'none',
          }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* Gradient overlay — always on top of images */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Hero text */}
        <div style={{
          position: 'absolute', bottom: '90px', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          padding: '0 24px',
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.72)', marginBottom: '14px',
          }}>
            {heroSlides[current].subtitle}
          </div>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: '400', color: '#fff', letterSpacing: '6px',
            marginBottom: '32px', lineHeight: '1.1',
          }}>
            {heroSlides[current].title}
          </h1>
          <button
            onClick={() => setActiveTab('/explore')}
            aria-label={heroSlides[current].cta}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.8)',
              color: '#fff', padding: '14px 40px',
              fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'auto',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            {heroSlides[current].cta}
          </button>
        </div>

        {/* Slide dots */}
        <div style={{
          position: 'absolute', bottom: '36px', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: '10px',
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '28px' : '6px',
                height: '1px',
                backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                border: 'none', padding: 0,
              }}
            />
          ))}
        </div>


      </div>

      {/* ─── 2. CATEGORY QUICK LINKS — responsive even grid ─── */}
      <div style={{
        padding: '64px 32px 20px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        {/* Responsive category grid — 2 col mobile, 3 col tablet, 5 col desktop */}
        <div className="category-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Browse ${cat.label}`}
              onClick={() => setActiveTab(cat.path)}
              onKeyDown={e => e.key === 'Enter' && setActiveTab(cat.path)}
              onMouseOver={() => setHoveredCat(i)}
              onMouseOut={() => setHoveredCat(null)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                backgroundColor: '#F2F2F2',
              }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.55s ease',
                    transform: hoveredCat === i ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <div style={{
                marginTop: '14px', textAlign: 'center',
                fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#000',
              }}>
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. EDITORIAL GRID ──────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
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

        {/* Responsive editorial grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="editorial-grid">
          {editorialGrid.map((item, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${item.label}`}
              onClick={() => setActiveTab(item.path)}
              onKeyDown={e => e.key === 'Enter' && setActiveTab(item.path)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                <img
                  src={item.img}
                  alt={item.label}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <div style={{ marginTop: '18px' }}>
                <div style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '400' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px' }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4. FULL-WIDTH EDITORIAL BANNER ─────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(380px, 55vw, 700px)', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop"
          alt="Women's Fashion editorial banner"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 60%)',
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
            onClick={() => setActiveTab("/category/Women's Ready-To-Wear")}
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

      {/* ─── 5. BOUTIQUE APPOINTMENT CTA ─────────────────────── */}
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
          Experience the world of MITU with a private appointment at your nearest boutique. Our advisors are at your disposal.
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
    </div>
  );
};

export default Home;