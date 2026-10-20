import { useState, useEffect } from 'react';

// ─── Hero data ─────────────────────────────────────────────────────────────
// Unsplash responsive params:
//   w=   → width hint cho srcset
//   q=   → quality (80 cân bằng tốt giữa chất lượng và kích thước)
//   auto=format → Unsplash tự chọn WebP / AVIF nếu browser hỗ trợ
//   fit=crop + crop=entropy → crop thông minh vào vùng nổi bật nhất
const HERO_BASE = {
  s1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
  s2: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
  s3: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
};

function buildSrc(base, w) {
  return `${base}?q=80&w=${w}&auto=format&fit=crop&crop=entropy`;
}

// srcset: browser chọn ảnh phù hợp nhất theo DPR + viewport width
function buildSrcSet(base) {
  return [800, 1200, 1600, 1920]
    .map(w => `${buildSrc(base, w)} ${w}w`)
    .join(', ');
}

const heroSlides = [
  {
    base:     HERO_BASE.s1,
    src:      buildSrc(HERO_BASE.s1, 1600),
    srcSet:   buildSrcSet(HERO_BASE.s1),
    subtitle: 'New Collection',
    title:    'AUTUMN 2025',
    cta:      'Discover the Collection',
    // Kích thước thực tế của ảnh gốc (Unsplash) — ngăn CLS
    width:    1920,
    height:   1280,
  },
  {
    base:     HERO_BASE.s2,
    src:      buildSrc(HERO_BASE.s2, 1600),
    srcSet:   buildSrcSet(HERO_BASE.s2),
    subtitle: 'Exclusive Campaign',
    title:    'THE ETERNAL WOMAN',
    cta:      'Explore Now',
    width:    1920,
    height:   1280,
  },
  {
    base:     HERO_BASE.s3,
    src:      buildSrc(HERO_BASE.s3, 1600),
    srcSet:   buildSrcSet(HERO_BASE.s3),
    subtitle: 'Resort 2025',
    title:    'SOUTHERN LIGHT',
    cta:      'View Lookbook',
    width:    1920,
    height:   1280,
  },
];

// sizes: browser dùng cùng với srcSet để tính ảnh cần tải
// Hero luôn chiếm 100vw nên đơn giản là "100vw"
const HERO_SIZES = '100vw';

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
      <section aria-label="Hero slideshow" className="hero">

        {/* Bottom layer: slide tiếp theo — luôn visible bên dưới */}
        <img
          className="hero__img"
          src={heroSlides[next].src}
          srcSet={heroSlides[next].srcSet}
          sizes={HERO_SIZES}
          width={heroSlides[next].width}
          height={heroSlides[next].height}
          alt=""
          aria-hidden="true"
          /* fetchpriority="low" vì đây là layer bottom, không phải LCP */
          fetchPriority="low"
          decoding="async"
        />

        {/* Top layer: slide hiện tại — fade out khi chuyển */}
        <img
          className={`hero__img hero__img--top${transitioning ? ' is-transitioning' : ''}`}
          src={heroSlides[current].src}
          srcSet={heroSlides[current].srcSet}
          sizes={HERO_SIZES}
          width={heroSlides[current].width}
          height={heroSlides[current].height}
          alt={heroSlides[current].title}
          /* Slide đầu là LCP element — ưu tiên load cao nhất */
          fetchPriority={current === 0 ? 'high' : 'auto'}
          decoding={current === 0 ? 'sync' : 'async'}
        />

        {/* Gradient overlay */}
        <div className="hero__gradient" />

        {/* Text content */}
        <div className={`hero__content${textVisible ? '' : ' is-hidden'}`}>
          <p className="hero__subtitle">
            {heroSlides[current].subtitle}
          </p>
          <h1 className="hero__title">
            {heroSlides[current].title}
          </h1>
          <button
            className="hero__cta"
            onClick={() => setActiveTab('/explore')}
          >
            {heroSlides[current].cta}
          </button>
        </div>

        {/* Dot navigation */}
        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${slide.title}`}
              className={`hero__dot${i === current ? ' is-active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
        </div>

      </section>

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