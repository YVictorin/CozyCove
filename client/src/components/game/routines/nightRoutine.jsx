
import { useState, useEffect } from "react"
import BrushTeethNightGame from "../tasks/night/brushTeethNightGame"
import ChangeClothesGame from "../tasks/night/changeClothesGame"
import StoryTimeGame from "../tasks/night/storyTimeGame"
import SleepGame from "../tasks/night/sleepGame"

export default function NightRoutine({ task, onCompleteTask }) {
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    setGameActive(true)
    return () => setGameActive(false)
  }, [task])

  if (!gameActive) return null

  switch (task) {
    case 0:
      return <BrushTeethNightGame onCompleteTask={onCompleteTask} />
    case 1:
      return <ChangeClothesGame onCompleteTask={onCompleteTask} />
    case 2:
      return <StoryTimeGame onCompleteTask={onCompleteTask} />
    case 3:
      return <SleepGame onCompleteTask={onCompleteTask} />
    default:
      return null
  }
}

