import MenuItem from "./MenuItem";
import { useState } from "react";

export default function Sidebar({ activeTab, onTabChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { label: "Users" },
  ];

  const handleMenuItemClick = (label) => {
    onTabChange(label);
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu toggle button - only visible on small screens */}
      <button 
        className="fixed top-4 left-4 z-100 p-2 bg-blue-500 rounded-md text-white md:hidden -mt-2 -ml-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
     
        </svg>
      </button>
      
      {/* Sidebar - responsive behavior */}
      <aside 
        className={` bg-white shadow-md p-4 flex flex-col fixed top-0 left-0 h-screen mb-16 z-100 transition-all duration-300
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 sm:w-48 md:w-64 lg:w-64 sm:relative sm:p-6
          sm:pt-6 md:pt-6 lg:pt-6`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-water"></i>
          </div>
          <h1 className="text-xl font-bold text-blue-500">Cozy Cove</h1>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index}
              label={item.label}
              active={activeTab === item.label}
              onClick={handleMenuItemClick}
            />
          ))}
        </nav>
        
        <div className="flex items-center gap-3 p-4 border-t border-gray-100 mt-auto">
          <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-gray-800 font-bold">
            AL
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">Admin Login</div>
            <div className="text-sm text-gray-500">Administrator</div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile - only visible when menu is open on small screens */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-20 sm:hidden"
          style={{backgroundColor: "black", opacity: "0.5"}}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}