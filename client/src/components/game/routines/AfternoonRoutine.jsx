import { useState, useEffect, useRef } from "react"
import EatLunchGame from "../tasks/afternoon/EatLunchGame"
import PlaytimeGame from "../tasks/afternoon/PlayTimeGame"
import RestTimeGame from "../tasks/afternoon/RestTimeGame"
import TidyUpGame from "../tasks/afternoon/TidyUpGame"

export default function AfternoonRoutine({ task, onCompleteTask, onTaskFailure }) {
  const [gameActive, setGameActive] = useState(true)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    setGameActive(true)

    return () => {
      mountedRef.current = false
      setGameActive(false)
    }
  }, [task])

  // Wrap the onCompleteTask to prevent calls after unmount
  const safeCompleteTask = () => {
    if (mountedRef.current) {
      console.log(`AfternoonRoutine completing task: ${task}`)
      onCompleteTask()
    } else {
      console.warn(`Attempted to complete task ${task} after unmount`)
    }
  }

  // Wrap the onTaskFailure to prevent calls after unmount
  const safeTaskFailure = () => {
    if (mountedRef.current) {
      console.log(`AfternoonRoutine task failure: ${task}`)
      if (onTaskFailure) onTaskFailure()
    } else {
      console.warn(`Attempted to report task failure ${task} after unmount`)
    }
  }

  // Render the appropriate game component based on task
  const renderGame = () => {
    switch (task) {
      case 0:
        return <EatLunchGame onCompleteTask={safeCompleteTask} onTaskFailure={safeTaskFailure} />
      case 1:
        return <PlaytimeGame onCompleteTask={safeCompleteTask} onTaskFailure={safeTaskFailure} />
      case 2:
        return <RestTimeGame onCompleteTask={safeCompleteTask} onTaskFailure={safeTaskFailure} />
      case 3:
        return <TidyUpGame onCompleteTask={safeCompleteTask} onTaskFailure={safeTaskFailure} />
      default:
        return null
    }
  }

  if (!gameActive) {
    console.log(`AfternoonRoutine not active, returning null`)
    return null
  }

  return renderGame()
}

