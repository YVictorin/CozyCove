import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import ToyBox from "../../../../assets/images/toyBox.png"
import BallImage from "../../../../assets/images/ball.svg"
import CarImage from "../../../../assets/images/car.svg"
import DollImage from "../../../../assets/images/doll.svg"
import BlocksImage from "../../../../assets/images/blocks.svg"
import RobotImage from "../../../../assets/images/robot.svg"
import TeddyImage from "../../../../assets/images/teddy.svg"

export default function TidyUpGame({ onCompleteTask }) {
  const [toyPositions, setToyPositions] = useState([])
  const [toyBoxPosition] = useState({ x: 50, y: 80 })
  const [timeLeft, setTimeLeft] = useState(60)
  
  // Map of toy types to their imported images
  const toyImages = {
    ball: BallImage,
    car: CarImage,
    doll: DollImage,
    blocks: BlocksImage,
    robot: RobotImage,
    teddy: TeddyImage
  }

  // Initialize toy positions
  useEffect(() => {
    setToyPositions([
      { x: 20, y: 20, placed: false, type: "ball" },
      { x: 80, y: 30, placed: false, type: "car" },
      { x: 30, y: 70, placed: false, type: "doll" },
      { x: 70, y: 80, placed: false, type: "blocks" },
      { x: 50, y: 40, placed: false, type: "robot" },
      { x: 60, y: 60, placed: false, type: "teddy" },
    ])
  }, [])

  // Game timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Check if tidy up task is completed or time ran out
  useEffect(() => {
    if (timeLeft === 0) {
      // Time ran out
      // Reset the task
      setToyPositions((prev) => prev.map((toy) => ({ ...toy, placed: false })))
      setTimeLeft(60)
    } else if (toyPositions.length > 0 && toyPositions.every((toy) => toy.placed)) {
      // All toys placed
      onCompleteTask()
    }
  }, [timeLeft, toyPositions, onCompleteTask])

  const handleToyClick = (index) => {
    setToyPositions((prev) => {
      const newPositions = [...prev]
      newPositions[index].placed = true
      return newPositions
    })
  }

  const handleTryAgain = () => {
    setToyPositions((prev) => prev.map((toy) => ({ ...toy, placed: false })))
    setTimeLeft(60)
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-red-500 font-bold">
        Time: {timeLeft}s
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
          src={ToyBox}
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
            src={toyImages[toy.type]}
            alt={toy.type}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error(`Failed to load image for ${toy.type}`)
              e.target.onerror = null; // Prevent infinite loops
              e.target.src = `/placeholder.svg?height=48&width=48&text=${toy.type}`
            }}
          />
        </div>
      ))}

      {/* Time's up message */}
      {timeLeft === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-red-500 font-bold">Time's up! Try again.</p>
            <Button className="mt-2 w-full" onClick={handleTryAgain}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}