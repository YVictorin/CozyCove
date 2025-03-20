import React from 'react';
import { Link, useNavigate } from "react-router-dom";
 
const Sidebar = ({ user, activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        console.error('Logout failed on the server.');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear client-side state regardless of API response
      if (onLogout) onLogout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="w-64 p-6 shadow-xl rounded-r-3xl bg-gray-50">
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
          <Link to="/explore">Resource Hub</Link>
        </button>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full font-bold py-3 px-4 rounded-xl shadow cursor-pointer"
          style={{ backgroundColor: "grey", color: "white", opacity: "0.6" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
