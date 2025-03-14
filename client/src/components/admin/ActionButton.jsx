export default function ActionButton({ icon, danger = false }) {
    return (
      <button 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          danger 
            ? 'bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white' 
            : 'bg-gray-100 text-gray-500 hover:bg-blue-500 hover:text-white'
        } transition-colors`}
      >
        <i className={`fas ${icon}`}></i>
      </button>
    );
  }