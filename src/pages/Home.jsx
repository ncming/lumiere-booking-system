const Home = ({ setActiveTab }) => {
  return (
    <div className="screen active" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      {/* Background Ảnh Tràn Viền (Thay link ảnh bằng ảnh chiến dịch của bạn) */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1000&auto=format&fit=crop")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }}>
        {/* Lớp phủ hơi tối để làm nổi bật chữ màu trắng */}
        <div style={{ position: 'absolute', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.1)' }}></div>
      </div>

      {/* Chữ và Nút bấm đè lên ảnh */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 20px' }}>
        <h2 style={{ color: '#fff', fontSize: '32px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '24px', letterSpacing: '1px' }}>
          FALL COLLECTION
        </h2>
        
        <button 
           onClick={() => setActiveTab('/explore')}
           style={{ 
             background: 'transparent', 
             border: '1px solid #fff', 
             color: '#fff', 
             padding: '12px 24px', 
             textTransform: 'uppercase', 
             letterSpacing: '2px', 
             fontSize: '12px', 
             width: 'fit-content', 
             cursor: 'pointer',
             transition: 'background 0.3s'
           }}
           onMouseOver={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }}
           onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
        >
          Discover
        </button>
      </div>

    </div>
  );
};

export default Home;