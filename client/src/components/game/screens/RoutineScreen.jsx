
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "react-bootstrap"
import { routines, getTextColor, getBackgroundColor } from "../GameUtils"
import MorningRoutine from "../routines/MorningRoutine"
import AfternoonRoutine from "../routines/AfternoonRoutine"
import NightRoutine from "../routines/NightRoutine"
import { savePerformanceData } from "../utils/performanceTracker"

export default function RoutineScreen({ routine, currentTask, taskCompleted, onBackClick, onCompleteTask }) {
  const [taskStartTime, setTaskStartTime] = useState(null)
  const [attempts, setAttempts] = useState(1)
  const isCompletingRef = useRef(false)

  // Start timing when a new task begins
  useEffect(() => {
    if (!taskCompleted) {
      setTaskStartTime(Date.now())
      // Reset attempts for new tasks
      setAttempts(1)
      isCompletingRef.current = false
    }
  }, [currentTask, taskCompleted])

  // When task is completed, save the performance data
  useEffect(() => {
    if (taskCompleted && taskStartTime) {
      const timeSpent = Date.now() - taskStartTime
      const taskName = routines[routine][currentTask].name

      // Save performance data
      savePerformanceData(routine, taskName, timeSpent, attempts)
    }
  }, [taskCompleted, taskStartTime, routine, currentTask, attempts])

  // Handle task completion with performance tracking
  const handleTaskComplete = useCallback(() => {
    // Prevent multiple calls
    if (isCompletingRef.current) return

    isCompletingRef.current = true

    // Use setTimeout to ensure this happens outside of render cycle
    setTimeout(() => {
      onCompleteTask()
    }, 10)
  }, [onCompleteTask])

  // Handle task failure (increment attempts)
  const handleTaskFailure = useCallback(() => {
    setAttempts((prev) => prev + 1)
  }, [])

  // In the TaskComponent function, add memoization to prevent unnecessary re-renders
  // Memoize the task component to prevent unnecessary re-renders
  const TaskComponent = useCallback(() => {
    console.log(`Rendering task component for ${routine}, task ${currentTask}`)

    if (routine === "Morning Routine") {
      return <MorningRoutine task={currentTask} onCompleteTask={handleTaskComplete} onTaskFailure={handleTaskFailure} />
    } else if (routine === "Afternoon Routine") {
      return (
        <AfternoonRoutine task={currentTask} onCompleteTask={handleTaskComplete} onTaskFailure={handleTaskFailure} />
      )
    } else if (routine === "Night Routine") {
      return <NightRoutine task={currentTask} onCompleteTask={handleTaskComplete} onTaskFailure={handleTaskFailure} />
    }
    return null
  }, [routine, currentTask, handleTaskComplete, handleTaskFailure])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-4">
      <div className="bg-red-500 pl-5 pr-5 pt-3 pb-3 rounded-md cursor-pointer">
        <Button variant="destructive" onClick={onBackClick} style={{ cursor: "pointer", color: "white" }}>
          Back
        </Button>
        </div>
        <h2 className={`text-2xl font-bold ${getTextColor(routine)}`}>{routine}</h2>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      {/* Current Task */}
      {!taskCompleted && (
        <div
          className={`bg-white p-6 rounded-xl shadow-md w-full max-w-md ${
            routine === "Night Routine" ? "bg-indigo-800" : ""
          }`}
        >
          <h3 className={`text-xl font-bold ${getTextColor(routine)} mb-2`}>{routines[routine][currentTask].name}</h3>
          <p className={`${routine === "Night Routine" ? "text-indigo-300" : "text-gray-600"} mb-4`}>
            {routines[routine][currentTask].description}
          </p>

          {/* Task Interaction Area */}
          <div className={`${getBackgroundColor(routine)} h-64 rounded-lg relative overflow-hidden`}>
            <TaskComponent />
          </div>
        </div>
      )}

      {/* Task Completion Message */}
      {taskCompleted && (
        <div className="flex flex-col items-center justify-center h-64 bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h3 className="text-2xl font-bold text-green-500 mb-4">Great job!</h3>
          <p className="text-gray-600 mb-6">You completed the task!</p>
          <div className="animate-pulse">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

