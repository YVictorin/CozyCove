
import { useState, useEffect } from "react"
import Plate from "../../../../assets/images/plate.png"
import Sandwich from "../../../../assets/images/sandwich.svg"

export default function EatLunchGame({ onCompleteTask }) {
  const [sandwichBalance, setSandwichBalance] = useState(50)
  const [sandwichDirection, setSandwichDirection] = useState(1)
  const [sandwichSpeed, setSandwichSpeed] = useState(1)

  // Eat Lunch - balance sandwich
  useEffect(() => {
    const interval = setInterval(() => {
      setSandwichBalance((prev) => {
        // Move sandwich in current direction
        const newBalance = prev + sandwichDirection * sandwichSpeed

        // Check boundaries
        if (newBalance >= 95 || newBalance <= 5) {
          // Sandwich fell off!
          clearInterval(interval)
          setSandwichSpeed(1)
          setSandwichDirection(1)
          setSandwichBalance(50)
          return 50
        }

        // Increase difficulty over time
        if (Math.random() < 0.05) {
          setSandwichSpeed((s) => Math.min(s + 0.1, 3))
        }

        // Randomly change direction
        if (Math.random() < 0.03) {
          setSandwichDirection((d) => d * -1)
        }

        return newBalance
      })
    }, 100)

    return () => clearInterval(interval)
  }, [sandwichDirection, sandwichSpeed])

  const handleSandwichClick = () => {
    // Reverse direction
    setSandwichDirection((prev) => prev * -1)

    // Check if sandwich is balanced for 3 seconds
    if (sandwichBalance > 40 && sandwichBalance < 60) {
      // Start a timer to check if it stays balanced
      const balanceTimer = setTimeout(() => {
        if (sandwichBalance > 40 && sandwichBalance < 60) {
          // Success!
          onCompleteTask()
        }
      }, 3000)

      return () => clearTimeout(balanceTimer)
    }
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute text-center w-full bottom-2 text-purple-600 text-sm">
        Keep clicking to balance the sandwich for 3 seconds!
      </div>

      {/* Balance meter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute h-full bg-purple-500 transition-all" style={{ width: `${sandwichBalance}%` }}></div>

        {/* Center marker */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-green-500"></div>
      </div>

      {/* Plate */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-10">
        <img
          src={Plate}
          alt="Plate"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(180deg)", scale: "5" }}
        />
      </div>

      {/* Sandwich */}
      <div
        className="absolute w-20 h-20 cursor-pointer"
        style={{
          left: `${sandwichBalance}%`,
          bottom: "20%",
          transform: "translateX(-50%)",
        }}
        onClick={handleSandwichClick}
      >
        <img
          src={Sandwich}
          alt="Sandwich"
          className="w-full h-full object-contain"
          style={{scale: "0.7"}}
        />
      </div>
    </div>
  )
}

