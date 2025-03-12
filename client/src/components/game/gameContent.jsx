import { useState, useEffect } from "react"
import MenuScreen from "./screens/menuScreen"
import BadgeScreen from "./screens/badgeScreen"
import BadgesCollectionScreen from "./screens/badgesCollectionScreen"
import SafeSpaceScreen from "./screens/safeSpaceScreen"
import RoutineScreen from "./screens/routineScreen"
import { routines } from "./gameUtils"

export default function GameContent() {
  const [currentScreen, setCurrentScreen] = useState("menu")
  const [currentRoutine, setCurrentRoutine] = useState("")
  const [currentTask, setCurrentTask] = useState(0)
  const [taskCompleted, setTaskCompleted] = useState(false)

  // Update progress when screen or task changes
  useEffect(() => {
    if (currentScreen === "menu") {
      window.dispatchEvent(new CustomEvent("game-progress", { detail: { progress: 0 } }))
    } else if (currentScreen === "routine" && currentRoutine) {
      const routineTasks = routines[currentRoutine]
      const progress = currentTask / routineTasks.length
      window.dispatchEvent(new CustomEvent("game-progress", { detail: { progress } }))
    }
  }, [currentScreen, currentRoutine, currentTask])

  // Update routine when it changes
  useEffect(() => {
    if (currentRoutine) {
      window.dispatchEvent(new CustomEvent("game-routine-change", { detail: { routine: currentRoutine } }))
    }
  }, [currentRoutine])

  const handleRoutineClick = (routine) => {
    setCurrentRoutine(routine)
    setCurrentTask(0)
    setTaskCompleted(false)
    setCurrentScreen("routine")
  }

  const handleBackClick = () => {
    setCurrentScreen("menu")
  }

  const handleCompleteTask = () => {
    setTaskCompleted(true)

    // Show completion for a moment, then move to next task
    setTimeout(() => {
      const routineTasks = routines[currentRoutine]
      if (currentTask < routineTasks.length - 1) {
        setCurrentTask(currentTask + 1)
        setTaskCompleted(false)
      } else {
        // All tasks completed, show badge
        setCurrentScreen("badge")
      }
    }, 1500)
  }

  const handleReturnToMenu = () => {
    setCurrentScreen("menu")
  }

  // Determine background color based on routine
  const getBgColor = () => {
    if (currentRoutine === "Morning Routine") return "bg-blue-50"
    if (currentRoutine === "Afternoon Routine") return "bg-purple-50"
    if (currentRoutine === "Night Routine") return "bg-indigo-900"
    return "bg-blue-50"
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 ${getBgColor()}`}>
      {currentScreen === "menu" && (
        <MenuScreen
          onRoutineClick={handleRoutineClick}
          onBadgesClick={() => setCurrentScreen("badges")}
          onSafeSpaceClick={() => setCurrentScreen("safe-space")}
        />
      )}

      {currentScreen === "routine" && currentRoutine && (
        <RoutineScreen
          routine={currentRoutine}
          currentTask={currentTask}
          taskCompleted={taskCompleted}
          onBackClick={handleBackClick}
          onCompleteTask={handleCompleteTask}
        />
      )}

      {currentScreen === "badge" && <BadgeScreen routine={currentRoutine} onReturnToMenu={handleReturnToMenu} />}

      {currentScreen === "badges" && <BadgesCollectionScreen onBackClick={handleReturnToMenu} />}

      {currentScreen === "safe-space" && <SafeSpaceScreen onBackClick={handleReturnToMenu} />}
    </div>
  )
}

