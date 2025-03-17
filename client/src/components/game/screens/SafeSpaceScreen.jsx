
import { Button } from "react-bootstrap"

export default function SafeSpaceScreen({ onBackClick }) {
  const safeSpaceItems = [
    { name: "Bed", image: "bed" },
    { name: "Fidget Spinner", image: "spinner" },
    { name: "Lamp", image: "lamp" },
    { name: "Weighted Blanket", image: "blanket" },
    { name: "Bookshelf", image: "books" },
    { name: "Music Player", image: "music" },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-6">
      <div className="bg-red-500 pl-5 pr-5 pt-3 pb-3 rounded-md cursor-pointer">
        <Button variant="destructive" onClick={onBackClick} style={{ cursor: "pointer", color: "white" }}>
          Back
        </Button>
        </div>
        <h2 className="text-2xl font-bold text-teal-600">Safe Space Builder</h2>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-4">
        <div className="bg-teal-50 border-2 border-dashed border-teal-200 rounded-lg h-64 flex items-center justify-center">
          <p className="text-teal-600 text-center px-4">Drag and drop items here to build your safe space!</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {safeSpaceItems.map((item, index) => (
          <div key={index} className="bg-teal-100 p-2 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 bg-teal-200 rounded-lg mb-1 flex items-center justify-center">
              <img
                src={`/placeholder.svg?height=48&width=48&text=${item.image}`}
                alt={item.name}
                className="w-8 h-8 object-contain"
                style={{ filter: `hue-rotate(${index * 40}deg)` }}
              />
            </div>
            <p className="text-xs text-teal-700 text-center">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

