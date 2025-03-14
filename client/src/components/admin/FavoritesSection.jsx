import { useState } from "react";
import AllFavoritesTable from "./AllFavoritesTable";
import DIYFavoritesTable from "./DIYFavoritesTable";
import ContentFavoritesTable from "./ContentFavoritesTable"


export default function FavoritesSection() {
    const [activeTab, setActiveTab] = useState('all-favorites');
    
    const tabs = [
      { id: 'all-favorites', label: 'Most Favorited' },
      //todo add more options for tab switching
    ];
  
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">Most Popular Sensory Boxes</div>
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
        
        {/* handling the component that will show up on click */}
        {activeTab === 'all-favorites' && <AllFavoritesTable />}
      
      </div>
    );
  }