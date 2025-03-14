
import { useState, useEffect } from "react"
import EatLunchGame from "../tasks/afternoon/EatLunchGame"
import PlaytimeGame from "../tasks/afternoon/PlayTimeGame"
import RestTimeGame from "../tasks/afternoon/RestTimeGame"
import TidyUpGame from "../tasks/afternoon/TidyUpGame"

export default function AfternoonRoutine({ task, onCompleteTask }) {
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    setGameActive(true)
    return () => setGameActive(false)
  }, [task])

  if (!gameActive) return null

  switch (task) {
    case 0:
      return <EatLunchGame onCompleteTask={onCompleteTask} />
    case 1:
      return <PlaytimeGame onCompleteTask={onCompleteTask} />
    case 2:
      return <RestTimeGame onCompleteTask={onCompleteTask} />
    case 3:
      return <TidyUpGame onCompleteTask={onCompleteTask} />
    default:
      return null
  }
}

