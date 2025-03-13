export default function MenuItem({ icon, label, active }) {
    return (
      <a 
        href="#" 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          active 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-800 hover:bg-blue-50'
        }`}
      >
        <i className={`fas ${icon} ${active ? '' : 'text-gray-600'} w-5 text-center`}></i>
        <span>{label}</span>
      </a>
    );
  }
  
  // Main Content Component
  function MainContent() {
    return (
      <main className="flex-grow p-8 overflow-y-auto">
        <PageHeader />
        <StatsGrid />
        <FavoritesSection />
      </main>
    );
  }