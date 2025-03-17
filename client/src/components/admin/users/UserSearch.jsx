import { useState } from "react";

export default function UserSearch({ onSearch, activeFilter, onFilterChange }) {
  const [searchInput, setSearchInput] = useState("");
  
  const filters = [
    { id: "all", label: "All Users" },
    { id: "parents", label: "Parents" },
    { id: "admins", label: "Admins" }
  ];

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    onSearch(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200 mb-4">
        {filters.map(filter => (
          <div 
            key={filter.id}
            className={`py-3 px-6 font-semibold cursor-pointer transition-all border-b-3 ${
              activeFilter === filter.id 
                ? 'text-blue-500 border-blue-500 border-b-2' 
                : 'text-gray-500 hover:text-blue-500 border-b-2 border-transparent'
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <form onSubmit={handleSubmit} className="flex-grow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search users by name, email, or role..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
        </form>
        
        <div className="flex gap-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <i className="fas fa-filter text-gray-600"></i>
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <i className="fas fa-sort text-gray-600"></i>
          </button>
        </div>
      </div>
    </div>
  );
}