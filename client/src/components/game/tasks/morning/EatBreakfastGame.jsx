import { useState, useEffect } from "react"
import Bowl from "../../../../assets/images/bowl.png"
import Cereal from "../../../../assets/images/cereal.png"

export default function EatBreakfastGame({ onCompleteTask }) {
  const [cerealPosition, setCerealPosition] = useState({ x: 50, y: 20 })
  const [bowlPosition, setBowlPosition] = useState({ x: 50, y: 80 })
  const [cerealCaught, setCerealCaught] = useState(0)
  const [totalCereal] = useState(5)

  // Flag to track if current cereal piece has been counted
  const [isCounted, setIsCounted] = useState(false)
  
  // Breakfast game - falling cereal
  useEffect(() => {
    const interval = setInterval(() => {
      setCerealPosition((prev) => {

        const newY = prev.y + 2     // Move cereal down every interval
        const bottomOfBowlPos = 75

        // Check if cereal reached bottom of the bowl
        if (newY > bottomOfBowlPos) {

          // Check if caught in bowl and not already counted
          if (Math.abs(prev.x - bowlPosition.x) < 15 && !isCounted) {
            setIsCounted(true)
            
            // Caught! Increment count
            setCerealCaught((caught) => {
              if (caught >= totalCereal) {

                // Game completed
                clearInterval(interval)
                onCompleteTask()
              }
              return caught + 1;
            })
          }
          
          // Reset cereal position and counting flag
          setIsCounted(false)
          return {
            x: Math.random() * 80 + 10, //cereal will fall from a random point left to right
            y: 10,
          }
        }
        
        return { ...prev, y: newY }
      })
    }, 100)
    
    return () => {
      clearInterval(interval)
    } 
  }, [bowlPosition, totalCereal, onCompleteTask, isCounted])
  
  const moveBowl = (direction) => {
    setBowlPosition((prev) => ({
      ...prev,
      x: Math.max(10, Math.min(90, prev.x + direction * 10)), //clamps the bowl's x position to not go offscreen
    }))
  }
  
  return (
    <div className="relative h-64 w-full bg-blue-50 rounded-lg p-8">
      {/* Progress */}
      <div className="absolute top-2 left-2 text-lg font-bold text-blue-600">
        {cerealCaught} / {totalCereal}
      </div>
      
      {/* Cereal */}
      <img 
        src={Cereal} 
        alt="Cereal" 
        className="absolute w-8 h-8"
        style={{ left: `${cerealPosition.x}%`, top: `${cerealPosition.y}%` }}
      />
      
      {/* Bowl */}
      <img 
        src={Bowl} 
        alt="Bowl" 
        className="absolute w-16 h-10"
        style={{ left: `${bowlPosition.x}%`, top: `${bowlPosition.y - 15}%` }}
      />
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center gap-8 mb-2">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => moveBowl(-1)}>
          ←
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => moveBowl(1)}>
          →
        </button>
      </div>
    </div>
  )
}