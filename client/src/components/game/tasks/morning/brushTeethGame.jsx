
import { useState, useEffect, useRef } from "react"
import { getDistance, moveAway, clampPosition } from '../../utils/movementUtils';
import Phaser from "phaser"

export default function BrushTeethGame({ onCompleteTask }) {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 })
  const [toothbrushPosition, setToothbrushPosition] = useState({ x: 70, y: 70 })
  const gameAreaRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      
      setToothbrushPosition((prev) => {
        // Instead of handling x and y separately, vectors allow you to store position, direction, and velocity in a single object.
        
        const charVec = new Phaser.Math.Vector2(characterPosition.x, characterPosition.y);
        const brushVec = new Phaser.Math.Vector2(prev.x, prev.y);
  
        // Measure the distance between toothbrush and character
        if (getDistance(brushVec, charVec) < 15) {
          clearInterval(interval);
          onCompleteTask();
          return prev;
        }
  
        // Move toothbrush away from the character
        let newPosition = moveAway(brushVec, charVec, 1, 0.25);
  
        // Keep within bounds
        newPosition = clampPosition(newPosition, 10, 90, 10, 90);
  
        return { 
          x: newPosition.x, y: newPosition.y 
        };
      });

    }, 50);
  
    return () => clearInterval(interval);
  }, [characterPosition, onCompleteTask]);


  const handleKeyDown = (e) => {
    const speed = 5; // Set the speed of movement for the character
    const newPos = { ...characterPosition }; // Create a copy of the current character position to modify
  
    switch (e.key) {
      // If the left arrow key or 'a' key is pressed, move character left (decrease x)
      case "ArrowLeft":
      case "a":
        newPos.x = Math.max(5, characterPosition.x - speed); // Prevent moving off the screen (min value 5)
        break;
  
      // If the right arrow key or 'd' key is pressed, move character right (increase x)
      case "ArrowRight":
      case "d":
        newPos.x = Math.min(95, characterPosition.x + speed); 
        break;
  
      case "ArrowUp":
      case "w":
        newPos.y = Math.max(5, characterPosition.y - speed); 
        break;
  
      case "ArrowDown":
      case "s":
        newPos.y = Math.min(95, characterPosition.y + speed);
        break;
    }
  
    setCharacterPosition(newPos); // Update the character's position with the new values
  }
  

  return (
    <div className="relative w-full h-full" tabIndex={0} onKeyDown={handleKeyDown} ref={gameAreaRef}>
      <div className="absolute text-center w-full bottom-2 text-blue-600 text-sm">
        Use arrow keys to move and catch the toothbrush!
      </div>

      {/* Character */}
      <div
        className="absolute w-16 h-16"
        style={{
          left: `${characterPosition.x}%`,
          top: `${characterPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="/placeholder.svg?height=64&width=64"
          alt="Character"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(190deg)" }}
        />
      </div>

      {/* Toothbrush */}
      <div
        className="absolute w-10 h-16"
        style={{
          left: `${toothbrushPosition.x}%`,
          top: `${toothbrushPosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="/placeholder.svg?height=64&width=40"
          alt="Toothbrush"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(100deg)" }}
        />
      </div>
    </div>
  )
}

