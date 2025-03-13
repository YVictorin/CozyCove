export default function PageHeader() {
    return (
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-gray-500 mt-1">Welcome back to Cozy Cove Admin</div>
        </div>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-semibold transition-all hover:bg-blue-50">
            <i className="fas fa-download"></i>
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold transition-all hover:bg-blue-600">
            <i className="fas fa-plus"></i>
            <span>Add Content</span>
          </button>
        </div>
      </div>
    );
  }