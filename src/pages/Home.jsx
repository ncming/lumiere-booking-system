const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active" style={{ width: '100%', paddingBottom: '60px', backgroundColor: '#FFFFFF' }}>
      
      {/* 1. HERO BANNER: Banner chính trên cùng */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '75vh',         
        maxHeight: '800px',     
        minHeight: '500px',     
        overflow: 'hidden'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1920&auto=format&fit=crop" 
          alt="Autumn Campaign"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
        />
        <div style={{ position: 'absolute', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.15)' }}></div>
        
        <div style={{ 
          position: 'absolute', bottom: '10%', left: '0', right: '0', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' 
        }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(24px, 5vw, 40px)', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '20px', letterSpacing: '4px' }}>
            AUTUMN ENCOUNTER
          </h2>
          <button 
             onClick={() => setActiveTab('/explore')}
             style={{ 
               background: 'transparent', border: '1px solid #fff', color: '#fff', 
               padding: '14px 32px', textTransform: 'uppercase', letterSpacing: '2px', 
               fontSize: '11px', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(4px)'
             }}
             onMouseOver={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }}
             onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
          >
            Discover The Campaign
          </button>
        </div>
      </div>

      {/* 2. KHU VỰC SẢN PHẨM: Trải dài theo chiều dọc */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '12px', color: '#757575', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '60px' }}>
          Curated For You
        </h3>

        {/* Xếp dọc (column) các sản phẩm thay vì xếp lưới ngang */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* Khối Sản phẩm 1 */}
          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            {/* Khung ảnh ngang rộng (tỷ lệ 21:9 giống banner điện ảnh) */}
            <div style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
              <img 
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop" 
                alt="Iconic Handbags" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
                Iconic Handbags
              </div>
              <div style={{ fontSize: '12px', color: '#757575', marginTop: '8px', letterSpacing: '0.5px' }}>
                Explore the new classics
              </div>
            </div>
          </div>

          {/* Khối Sản phẩm 2 */}
          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            {/* Khung ảnh ngang rộng */}
            <div style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop" 
                alt="Rouge Lumière" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
                Rouge Lumière
              </div>
              <div style={{ fontSize: '12px', color: '#757575', marginTop: '8px', letterSpacing: '0.5px' }}>
                The art of color
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;