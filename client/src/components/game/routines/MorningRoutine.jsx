
import { useState, useEffect } from "react"
import BrushTeethGame from "../tasks/morning/BrushTeethGame"
import EatBreakfastGame from "../tasks/morning/EatBreakfastGame"
import GetDressedGame from "../tasks/morning/GetDressedGame"
import GoOutsideGame from "../tasks/morning/GoOutsideGame"

export default function MorningRoutine({ task, onCompleteTask }) {
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    setGameActive(true)
    return () => setGameActive(false)
  }, [task])

  if (!gameActive) return null

  switch (task) {
    case 0:
      return <BrushTeethGame onCompleteTask={onCompleteTask} />
    case 1:
      return <EatBreakfastGame onCompleteTask={onCompleteTask} />
    case 2:
      return <GetDressedGame onCompleteTask={onCompleteTask} />
    case 3:
      return <GoOutsideGame onCompleteTask={onCompleteTask} />
    default:
      return null
  }
}

