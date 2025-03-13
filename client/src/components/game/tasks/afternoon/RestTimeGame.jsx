import { useState, useEffect } from "react"

import Excited from "../../../../assets/images/excited.svg"
import Sleepy from "../../../../assets/images/sleepy.svg"

export default function RestTimeGame({ onCompleteTask }) {
  const [bedJumps, setBedJumps] = useState(0)
  const [bedPosition, setBedPosition] = useState({ y: 50 })
  const [bedJumping, setBedJumping] = useState(true)

  // Rest Time - jumping bed
  useEffect(() => {
    let interval = null

    if (bedJumping) {
      interval = setInterval(() => {
        setBedPosition((prev) => {
          // Animate bed jumping
          const time = Date.now() / 300
          const newY = 50 + Math.sin(time) * 20

          return { y: newY }
        })
      }, 50)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [bedJumping])

  const handleBedClick = () => {
    setBedJumps((prev) => {
      const newJumps = prev + 1
      if (newJumps >= 5) {
        // Bed calmed down
        setBedJumping(false)
        setTimeout(onCompleteTask, 1000)
      }
      return newJumps
    })
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute text-center w-full bottom-2 text-purple-600 text-sm">
        Click on the bed to calm it down! ({bedJumps}/5)
      </div>

      {/* Jumping bed */}
      <div
        className={`absolute w-40 h-24 cursor-pointer transition-transform duration-300 ${
          bedJumping ? "" : "transform-none"
        }`}
        style={{
          left: "50%",
          top: `${bedPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleBedClick}
      >
        <img
          src="/src/assets/images/bed.svg"
          alt="Bed"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(240deg)" }}
        />

        {/* Bed face */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
        {bedJumping ? (
            <img src={Excited} alt="Excited" className="w-10 h-10" />
          ) : (
            <img src={Excited} alt="Sleepy" className="w-10 h-10" />
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-purple-500 transition-all"
          style={{ width: `${(bedJumps / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

