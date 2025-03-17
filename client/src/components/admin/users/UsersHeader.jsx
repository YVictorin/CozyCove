
export default function UsersHeader({ selectedUsers, clearSelection }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <div className="text-gray-500 mt-1">
          {selectedUsers.length > 0 
            ? `${selectedUsers.length} users selected` 
            : "Manage all Cozy Cove users"
          }
        </div>
      </div>
      
      <div className="flex gap-4">
        {/* hides the remove button from view unless a user is clicked on first */}
        {selectedUsers.length > 0 ? (
          <>
            <button onClick={clearSelection} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold transition-all hover:bg-gray-50">
              <i className="fas fa-times"></i>
              <span>Clear Selection</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold transition-all hover:bg-red-600">
              <i className="fas fa-trash"></i>
              <span>Remove</span>
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
