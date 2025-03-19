export default function StatCard({ title, value, change, positive, icon, color }) {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-500",
      green: "bg-green-50 text-green-500",
      yellow: "bg-yellow-50 text-yellow-500",
      purple: "bg-purple-50 text-purple-700",
      red: "bg-red-50 text-red-500"
    };
  
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-sm">{title}</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${colorClasses[color]}`}>
            <i className={`fas ${icon}`}></i>
          </div>
        </div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
          <i className={`fas fa-arrow-${positive ? 'up' : 'down'}`}></i>
          <span>{change}</span>
        </div>
      </div>
    );
  }