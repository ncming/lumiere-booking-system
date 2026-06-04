import { Outlet } from 'react-router-dom';
import TabBar from '../components/TabBar';

const ClientLayout = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Nơi các trang con (Home, Explore, Booking...) sẽ được render */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet /> 
      </div>
      
      {/* Thanh menu luôn nằm ở dưới cùng */}
      <TabBar />
    </div>
  );
};

export default ClientLayout;