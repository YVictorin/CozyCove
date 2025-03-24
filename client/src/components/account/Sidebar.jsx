import React from 'react';
import { Link, useNavigate } from "react-router-dom";
 
const Sidebar = ({ user, activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://cozycove-server.vercel.app/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        console.error('Logout failed on the server.');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      if (onLogout) onLogout();
      navigate('/login', { replace: true });
    }
  };

 


  // User info card for mobile
  const MobileUserCard = () => (
    <div className="md:hidden flex items-center bg-white rounded-xl p-4 mb-4 shadow-sm">
      <img 
        src='https://www.gravatar.com/avatar/?d=mp'
        alt="User avatar" 
        className="w-12 h-12 rounded-full mr-4" 
      />
      <div>
        <h3 className="font-bold" style={{ color: "#386169" }}>{user?.name}</h3>
        <p className="text-sm" style={{ color: "#4A8278" }}>{user?.role}</p>
      </div>
      
      <div className="ml-auto">
        <button 
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded-lg flex items-center"
          style={{ 
            backgroundColor: "#FF5252", 
            color: "white",
            fontWeight: "bold"
          }}
        >
         Logout
        </button>
      </div>
    </div>
  );

  // Mobile fixed logout button at the bottom
  const MobileFixedLogout = () => (
    <div className="md:hidden fixed bottom-4 left-4 z-10">
      <button 
        onClick={handleLogout}
        className="rounded-full px-4 py-2 shadow-lg flex items-center bg-gray-300 text-white font-bold opacity-80"
      >
       Logout
      </button>
    </div>
  );

  // Mobile quick actions
  const MobileQuickActions = () => (
    <div className="md:hidden fixed bottom-4 right-4 z-10">
      <button 
        className="rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
        style={{ backgroundColor: "#24B2C2", color: "white" }}
      >
        <Link to="/parents">🔍</Link>
      </button>
    </div>
  );

  const DesktopSidebar = () => (
    <div className="hidden md:block w-64 p-6 shadow-xl rounded-r-3xl bg-gray-50 h-full">
      <div className="flex flex-col items-center mb-8">
        <img 
          src='https://www.gravatar.com/avatar/?d=mp'
          alt="User avatar" 
          className="w-24 h-24 rounded-full mb-3" 
        />
        <h2 className="text-xl font-bold" style={{ color: "#386169" }}>{user?.name}</h2>
        <p style={{ color: "#4A8278" }}>{user?.role}</p>
      </div>
      
      <nav>
        <ul className='flex flex-col'>
          {['profile'].map((tab) => (
            <li key={tab} className="mb-3">
              <button 
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left py-2 px-4 rounded-xl cursor-pointer ${activeTab === tab ? 'font-bold' : ''}`}
                style={{ 
                  backgroundColor: activeTab === tab ? "#D3FFFE" : "transparent",
                  color: "#26A5B3",
                }}
              >
                {tab === 'profile' ? 'My Profile' : 'Saved Sensory Boxes'}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-6 flex flex-col gap-3">
        <button 
          className="w-full font-bold py-3 px-4 rounded-xl shadow"
          style={{ backgroundColor: "#24B2C2", color: "white" }}
        >
          <Link to="/parents">Resource Hub</Link>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full font-bold py-3 px-4 rounded-xl shadow cursor-pointer flex items-center justify-center bg-gray-300 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Components */}
      <MobileUserCard />
      <MobileFixedLogout /> {/* Added fixed logout button */}
      <MobileQuickActions />
      
      {/* Desktop Component */}
      <DesktopSidebar />
    </>
  );
};

export default Sidebar;