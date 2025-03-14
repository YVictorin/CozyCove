
import { Button } from "react-bootstrap"
import { routines, getTextColor, getBackgroundColor } from "../GameUtils"
import MorningRoutine from "../routines/MorningRoutine"
import AfternoonRoutine from "../routines/AfternoonRoutine"
import NightRoutine from "../routines/NightRoutine"

export default function RoutineScreen({ routine, currentTask, taskCompleted, onBackClick, onCompleteTask }) {
  const renderTaskGame = () => {
    if (routine === "Morning Routine") {
      return <MorningRoutine task={currentTask} onCompleteTask={onCompleteTask} />
    } else if (routine === "Afternoon Routine") {
      return <AfternoonRoutine task={currentTask} onCompleteTask={onCompleteTask} />
    } else if (routine === "Night Routine") {
      return <NightRoutine task={currentTask} onCompleteTask={onCompleteTask} />
    }
    return null
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-4">
        <Button variant="destructive" onClick={onBackClick}>
          Back
        </Button>
        <h2 className={`text-2xl font-bold ${getTextColor(routine)}`}>{routine}</h2>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      {/* Current Task */}
      {!taskCompleted && (
        <div
          className={`bg-white p-6 rounded-xl shadow-md w-full max-w-md ${routine === "Night Routine" ? "bg-indigo-800" : ""}`}
        >
          <h3 className={`text-xl font-bold ${getTextColor(routine)} mb-2`}>{routines[routine][currentTask].name}</h3>
          <p className={`${routine === "Night Routine" ? "text-indigo-300" : "text-gray-600"} mb-4`}>
            {routines[routine][currentTask].description}
          </p>

          {/* Task Interaction Area */}
          <div className={`${getBackgroundColor(routine)} h-64 rounded-lg relative overflow-hidden`}>
            {renderTaskGame()}
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

