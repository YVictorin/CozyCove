export default function AccessibilityToggle() {
    return (
      <div className="fixed bottom-5 right-5 z-50 bg-white rounded-lg shadow-md p-2 flex gap-2">
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-blue-500 hover:text-white transition-colors">
          <i className="fas fa-text-height"></i>
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-blue-500 hover:text-white transition-colors">
          <i className="fas fa-adjust"></i>
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-blue-500 hover:text-white transition-colors">
          <i className="fas fa-universal-access"></i>
        </button>
      </div>
    );
  }
  