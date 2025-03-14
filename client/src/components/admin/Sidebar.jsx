import MenuItem from "./MenuItem";

export default function Sidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { label: "Dashboard" },
    { label: "Users" },
    { label: "Sensory" },
  ];

  const handleMenuItemClick = (label) => {
    onTabChange(label);
  };

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
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
  );
}