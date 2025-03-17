export default function UsersTable({ searchQuery, activeFilter, selectedUsers, onUserSelect }) {
  // Mock data for users 
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      role: "Parent",
      email: "sarah.j@example.com",
      joined: "Jan 12, 2023"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "MC",
      role: "Parent",
      email: "supervised@example.com",
      joined: "Mar 5, 2023"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "ER",
      role: "Parent",
      email: "emily.r@example.com",
      joined: "Feb 18, 2023"
    },
    {
      id: 4,
      name: "James Williams",
      avatar: "JW",
      role: "Admin",
      email: "supervised@example.com",
      joined: "Apr 22, 2023"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      avatar: "OM",
      role: "Admin",
      email: "olivia.m@example.com",
      joined: "Dec 7, 2022"
    }
  ];

  // Filter users based on searchQuery and activeFilter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "parents" && user.role === "Parent") ||
      (activeFilter === "admins" && user.role === "Admin");
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-6 text-left">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
            </th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-center">Role</th>
            <th className="py-3 px-6 text-right pr-12">Joined</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-4 px-6">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => onUserSelect(user.id, e.target.checked)}
                />
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "Parent" ? "bg-green-100 text-green-800" : 
                  "bg-purple-100 text-purple-800"
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-6 text-right">{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  );
}