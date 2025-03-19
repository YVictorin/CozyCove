import { useState } from "react";
import UsersHeader from "./UsersHeader";
import UsersStats from "./UsersStats";
import UsersTable from "./UsersTable";
import UserSearch from "./UserSearch";

export default function UsersPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleUserSelect = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  return (
    <main className="flex-grow p-8 overflow-y-auto">
      <UsersHeader 
        selectedUsers={selectedUsers}
        clearSelection={() => setSelectedUsers([])}
      />
      <UsersStats />
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">Users Management</div>
        </div>
        
        <UserSearch 
          onSearch={handleSearch} 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        
        <UsersTable 
          searchQuery={searchQuery} 
          activeFilter={activeFilter}
          selectedUsers={selectedUsers}
          onUserSelect={handleUserSelect}
        />
      </div>
    </main>
  );
}




