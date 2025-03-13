import { useState, useEffect, useRef } from "react"
import ToyBox from "../../../../assets/images/toyBox.png"

export default function PlaytimeGame({ onCompleteTask }) {
  const [toyPositions, setToyPositions] = useState([])
  const [toyBoxPosition] = useState({ x: 50, y: 80 })
  const completedRef = useRef(false)
  const initializedRef = useRef(false)

  // Initialize toy positions only once
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      console.log("Initializing toy positions")
      setToyPositions([
        { x: 20, y: 20, placed: false, type: "ball" },
        { x: 80, y: 30, placed: false, type: "car" },
        { x: 30, y: 70, placed: false, type: "doll" },
        { x: 70, y: 80, placed: false, type: "blocks" },
      ])
    }
  }, [])

  // Check if all toys are placed - with protection against multiple calls
  useEffect(() => {
    console.log("Checking toy positions:", toyPositions)

    // Only proceed if we have toys and haven't already completed
    if (toyPositions.length > 0 && !completedRef.current && toyPositions.every((toy) => toy.placed)) {
      console.log("All toys placed, completing task")
      completedRef.current = true

      // Use setTimeout to delay completion
      setTimeout(() => {
        if (onCompleteTask && typeof onCompleteTask === "function") {
          onCompleteTask()
        }
      }, 500)
    }
  }, [toyPositions, onCompleteTask])

  // Handle toy click with logging
  const handleToyClick = (index) => {
    console.log(`Toy clicked: ${index}`)

    setToyPositions((prev) => {
      const newPositions = [...prev]
      newPositions[index].placed = true
      return newPositions
    })
  }

  // Add component lifecycle logging
  useEffect(() => {
    console.log("PlaytimeGame mounted")
    return () => {
      console.log("PlaytimeGame unmounted")
    }
  }, [])

  return (
    <div className="relative w-full h-full">
  
      {/* Toy box */}
      <div
        className="absolute w-24 h-20"
        style={{
          left: `${toyBoxPosition.x}%`,
          top: `${toyBoxPosition.y}%`,
          transform: "translate(-40%, -50%)",
        }}
      >
        <img
          src={ToyBox || "/placeholder.svg"}
          alt="Toy Box"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(40deg)" }}
        />
        <div className="absolute top-0 w-full text-center text-yellow-800 text-xs font-bold">Toy Box</div>
      </div>

      {/* Toys */}
      {toyPositions.map((toy, index) => (
        <div
          key={index}
          className={`absolute w-12 h-12 cursor-pointer transition-all duration-300 ${
            toy.placed ? "opacity-50" : "animate-bounce"
          }`}
          style={{
            left: `${toy.x}%`,
            top: `${toy.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => handleToyClick(index)}
        >
          <img
            src={`/src/assets/images/${toy.type}.svg`}
            alt={toy.type}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error(`Failed to load image for ${toy.type}`)
              e.target.src = `/placeholder.svg?height=48&width=48&text=${toy.type}`
            }}
          />
        </div>
      ))}
    </div>
  )
}

