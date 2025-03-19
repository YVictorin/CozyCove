export default function MenuItem({ label, active, onClick }) {
  return (
    <div 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
        active ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'
      }`}
      onClick={() => onClick(label)}
    >
      <span className="font-medium">{label}</span>
    </div>
  );
}