
import { Button } from "react-bootstrap"

export default function BadgesCollectionScreen({ onBackClick }) {
  const badges = [
    { name: "Morning Champion", earned: true, image: "morning" },
    { name: "Playtime Hero", earned: true, image: "afternoon" },
    { name: "Nighttime Hero", earned: false, image: "night" },
    { name: "Routine Master", earned: false, image: "master" },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-6">
      <div className="bg-red-500 pl-5 pr-5 pt-3 pb-3 rounded-md cursor-pointer">
        <Button variant="destructive" onClick={onBackClick} style={{ cursor: "pointer", color: "white" }}>
          Back
        </Button>
        </div>
        <h2 className="text-2xl font-bold text-yellow-600">Your Badges</h2>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${badge.earned ? "bg-yellow-100" : "bg-gray-100"} flex flex-col items-center`}
          >
            <div
              className={`w-16 h-16 rounded-full ${badge.earned ? "bg-yellow-400" : "bg-gray-300"} flex items-center justify-center mb-2`}
            >
              <img
                src={`/src/assets/images/${badge.image}.svg`}
                alt={badge.name}
                className={`w-10 h-10 object-contain ${badge.earned ? "opacity-100" : "opacity-50"}`}
                style={{ filter: badge.earned ? `hue-rotate(${index * 40}deg)` : "grayscale(1)" }}
              />
            </div>
            <h3 className={`text-sm font-bold ${badge.earned ? "text-yellow-700" : "text-gray-500"} text-center`}>
              {badge.name}
            </h3>
            {!badge.earned && <p className="text-xs text-gray-500 mt-1">Locked</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

