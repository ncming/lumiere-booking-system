const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active" style={{ width: '100%', paddingBottom: '40px', backgroundColor: '#FFFFFF' }}>
      
      {/* Hero Banner tràn viền */}
      <div style={{ 
        position: 'relative', width: '100%', height: '85vh', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <div style={{ position: 'absolute', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.15)' }}></div>
        <div style={{ 
          position: 'absolute', bottom: '40px', left: '20px', right: '20px', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' 
        }}>
          <h2 style={{ color: '#fff', fontSize: '36px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '16px', letterSpacing: '2px' }}>
            AUTUMN ENCOUNTER
          </h2>
          <button 
             onClick={() => setActiveTab('/explore')}
             style={{ 
               background: 'transparent', border: '1px solid #fff', color: '#fff', 
               padding: '14px 32px', textTransform: 'uppercase', letterSpacing: '2px', 
               fontSize: '11px', cursor: 'pointer', backdropFilter: 'blur(4px)'
             }}
          >
            Discover The Campaign
          </button>
        </div>
      </div>

      {/* Phần giới thiệu Sản phẩm mềm mại hơn */}
      <div style={{ padding: '60px 20px 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '12px', color: '#757575', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '40px' }}>
          Curated For You
        </h3>

        {/* Khối ảnh bất đối xứng */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            <img 
              src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop" 
              alt="Bags" 
              style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
            />
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>Iconic Handbags</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px', letterSpacing: '0.5px' }}>Explore the new classics</div>
            </div>
          </div>

          <div onClick={() => setActiveTab('/explore')} style={{ cursor: 'pointer' }}>
            <img 
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop" 
              alt="Makeup" 
              style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
            />
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>Rouge Lumière</div>
              <div style={{ fontSize: '11px', color: '#757575', marginTop: '6px', letterSpacing: '0.5px' }}>The art of color</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;