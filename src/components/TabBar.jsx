import { useNavigate, useLocation } from 'react-router-dom';

const TabBar = ({ currentPath, setCurrentPath }) => {
  const tabs = [
    { id: '/', label: 'Home' },
    { id: '/explore', label: 'Explore' },
    { id: '/booking', label: 'Booking' },
    { id: '/cart', label: 'Cart' },
  ];

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${currentPath === tab.id ? 'active' : ''}`}
          onClick={() => setCurrentPath(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabBar;