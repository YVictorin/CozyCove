
import { useState, useEffect } from "react"
import Bowl from "../../../../assets/images/bowl.png"
import Cereal from "../../../../assets/images/cereal.png"

export default function EatBreakfastGame({ onCompleteTask }) {
  const [cerealPosition, setCerealPosition] = useState({ x: 50, y: 20 })
  const [bowlPosition, setBowlPosition] = useState({ x: 50, y: 80 })
  const [cerealCaught, setCerealCaught] = useState(0)
  const [totalCereal] = useState(5)

  // Breakfast game - falling cereal
  useEffect(() => {
    const interval = setInterval(() => {
      setCerealPosition((prev) => {
        // Move cereal down
        const newY = prev.y + 2

        // Check if cereal reached bottom
        if (newY > 75) {
          // Check if caught in bowl
          if (Math.abs(prev.x - bowlPosition.x) < 15) {
            // Caught!
            setCerealCaught((caught) => {
              if (caught + 1 >= totalCereal) {
                // Game completed
                clearInterval(interval)
                onCompleteTask()
              }
              return caught + 1
            })
          }

          // Reset cereal position
          return {
            x: Math.random() * 80 + 10,
            y: 10,
          }
        }

        return { ...prev, y: newY }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [bowlPosition, totalCereal, onCompleteTask])

  const moveBowl = (direction) => {
    setBowlPosition((prev) => ({
      ...prev,
      x: Math.max(10, Math.min(90, prev.x + direction * 10)),
    }))
  }

  return (
    <div className="relative w-full h-full">

      {/* Progress */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full">
        <span className="text-blue-600 font-bold">
          {cerealCaught} / {totalCereal}
        </span>
      </div>

      {/* Cereal */}
      <div
        className="absolute w-8 h-8"
        style={{
          left: `${cerealPosition.x}%`,
          top: `${cerealPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={Cereal}
          alt="Cereal"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bowl */}
      <div
        className="absolute w-20 h-12"
        style={{
          left: `${bowlPosition.x}%`,
          top: `${bowlPosition.y}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <img
          src={Bowl}
          alt="Bowl"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 mr-15 rounded-full" onClick={() => moveBowl(-1)}>
          ←
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={() => moveBowl(1)}>
          →
        </button>
      </div>
    </div>
  )
}

