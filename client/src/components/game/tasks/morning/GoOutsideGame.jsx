import { useState, useRef } from "react"

export default function GoOutsideGame({ onCompleteTask }) {
  const [keyFound, setKeyFound] = useState(false)
  const [keyPosition] = useState({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 })
  const [doorUnlocked, setDoorUnlocked] = useState(false)
  const gameAreaRef = useRef(null)

  const handleAreaClick = (e) => {
    if (!keyFound) {
      // Get click position relative to container
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      // Check if clicked near key
      const distance = Math.sqrt(Math.pow(x - keyPosition.x, 2) + Math.pow(y - keyPosition.y, 2))

      if (distance < 10) {
        // Found key!
        setKeyFound(true)
      }
    }
  }

  const handleDoorClick = () => {
    if (!keyFound) return

    // Unlock door
    setDoorUnlocked(true)
    setTimeout(onCompleteTask, 1000)
  }

  return (
    <div className="relative w-full h-full" onClick={handleAreaClick} ref={gameAreaRef}>
      <div className="absolute text-center w-full bottom-2 text-blue-600 text-sm">
        {keyFound ? "Click on the door to unlock it!" : "Find the hidden key in the room!"}
      </div>

      {/* Room background */}
      <div className="absolute inset-0 bg-blue-50 opacity-50"></div>

      {/* Hidden key */}
      {!keyFound && (
        <div
          className="absolute w-6 h-6 opacity-20 hover:opacity-100 transition-opacity"
          style={{
            left: `${keyPosition.x}%`,
            top: `${keyPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/placeholder.svg?height=24&width=24&text=key"
            alt="Key"
            className="w-full h-full object-contain"
            style={{ filter: "hue-rotate(40deg)" }}
          />
        </div>
      )}

      {/* Key indicator if found */}
      {keyFound && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white p-2 rounded-lg">
          <img
            src="/placeholder.svg?height=24&width=24&text=key"
            alt="Key"
            className="w-6 h-6 object-contain"
            style={{ filter: "hue-rotate(40deg)" }}
          />
          <span className="text-blue-600 text-sm font-bold">Key Found!</span>
        </div>
      )}

      {/* Door */}
      <div
        className={`absolute w-20 h-40 right-10 top-1/2 transform -translate-y-1/2 cursor-pointer ${
          doorUnlocked ? "opacity-50" : "opacity-100"
        }`}
        onClick={handleDoorClick}
      >
        <img
          src="/placeholder.svg?height=160&width=80&text=door"
          alt="Door"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(20deg)" }}
        />

        {/* Lock indicator */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            keyFound ? "text-green-500" : "text-red-500"
          }`}
        >
          {keyFound ? "🔓" : "🔒"}
        </div>
      </div>
    </div>
  )
}

