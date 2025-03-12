import { useState, useEffect } from "react"

export default function PlaytimeGame({ onCompleteTask }) {
  const [toyPositions, setToyPositions] = useState([])
  const [toyBoxPosition] = useState({ x: 50, y: 80 })

  // Initialize toy positions
  useEffect(() => {
    setToyPositions([
      { x: 20, y: 20, placed: false, type: "ball" },
      { x: 80, y: 30, placed: false, type: "car" },
      { x: 30, y: 70, placed: false, type: "doll" },
      { x: 70, y: 80, placed: false, type: "blocks" },
    ])
  }, [])

  // Check if all toys are placed
  useEffect(() => {
    if (toyPositions.length > 0 && toyPositions.every((toy) => toy.placed)) {
      setTimeout(onCompleteTask, 500)
    }
  }, [toyPositions, onCompleteTask])

  const handleToyClick = (index) => {
    setToyPositions((prev) => {
      const newPositions = [...prev]
      newPositions[index].placed = true
      return newPositions
    })
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute text-center w-full bottom-2 text-purple-600 text-sm">
        Click on the toys to put them in their places!
      </div>

      {/* Toy box */}
      <div
        className="absolute w-24 h-20"
        style={{
          left: `${toyBoxPosition.x}%`,
          top: `${toyBoxPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="/placeholder.svg?height=80&width=96&text=toy-box"
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
            src={`/placeholder.svg?height=48&width=48&text=${toy.type}`}
            alt={toy.type}
            className="w-full h-full object-contain"
            style={{ filter: `hue-rotate(${index * 40}deg)` }}
          />
        </div>
      ))}
    </div>
  )
}

