import React from 'react';
import { Link } from "react-router-dom"
 
const Sidebar = ({ user, activeTab, setActiveTab }) => {
  return (
    <div className="w-64 p-6 shadow-xl rounded-r-3xl  bg-gray-50">
      <div className="flex flex-col items-center mb-8">
        <img 
          src={user?.avatar} 
          alt="User avatar" 
          className="w-24 h-24 rounded-full mb-3" 
          style={{ borderWidth: "4px", borderColor: "#F7D41E" }}
        />
        <h2 className="text-xl font-bold" style={{ color: "#386169" }}>{user?.name}</h2>
        <p style={{ color: "#4A8278" }}>{user?.role}</p>
      </div>
      
      <nav>
        <ul className='flex whitespace-nowrap flex-col'>
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
      
      <div className="mt-auto pt-6">
        <button 
          className="w-full font-bold py-3 px-4 rounded-xl shadow"
          style={{ backgroundColor: "#24B2C2", color: "white" }}
        >
          <Link to="/explore">
            Resource Hub
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;