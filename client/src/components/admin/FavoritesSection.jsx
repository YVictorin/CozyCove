import { useState } from "react";
import AllFavoritesTable from "./AllFavoritesTable";
import DIYFavoritesTable from "./DIYFavoritesTable";
import ContentFavoritesTable from "./ContentFavoritesTable"


export default function FavoritesSection() {
    const [activeTab, setActiveTab] = useState('all-favorites');
    
    const tabs = [
      { id: 'all-favorites', label: 'All Favorites' },
      { id: 'diy-favorites', label: 'DIY Favorites' },
      { id: 'content-favorites', label: 'Content Favorites' }
    ];
  
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">Most Favorites Management</div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-semibold transition-all hover:bg-blue-50">
              <i className="fas fa-sync-alt"></i>
              <span>Refresh List</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold transition-all hover:bg-red-600">
              <i className="fas fa-trash"></i>
              <span>Clear All Favorites</span>
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              className={`py-3 px-6 font-semibold cursor-pointer transition-all border-b-3 ${
                activeTab === tab.id 
                  ? 'text-blue-500 border-blue-500 border-b-2' 
                  : 'text-gray-500 hover:text-blue-500 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        
        {activeTab === 'all-favorites' && <AllFavoritesTable />}
        {activeTab === 'diy-favorites' && <DIYFavoritesTable />}
        {activeTab === 'content-favorites' && <ContentFavoritesTable />}
      </div>
    );
  }