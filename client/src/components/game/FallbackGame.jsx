
import { useState } from "react"
import { Button } from "react-bootstrap"

export default function FallbackGame() {
  const [currentScreen, setCurrentScreen] = useState("menu")
  const [currentRoutine, setCurrentRoutine] = useState("")

  const handleRoutineClick = (routine) => {
    setCurrentRoutine(routine)
    setCurrentScreen("routine")

    // Dispatch event for parent component
    window.dispatchEvent(
      new CustomEvent("game-routine-change", {
        detail: { routine },
      }),
    )
  }

  const handleBackClick = () => {
    setCurrentScreen("menu")
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 p-4">
      {currentScreen === "menu" && (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Cozy Routines</h2>
          <p className="text-xl text-blue-500 mb-8">Build Your Best Day!</p>

          <div className="flex flex-col gap-4 w-64">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-3"
              onClick={() => handleRoutineClick("Morning Routine")}
            >
              Morning Routine
            </Button>
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white py-3"
              onClick={() => handleRoutineClick("Afternoon Routine")}
            >
              Afternoon Routine
            </Button>
            <Button
              className="bg-indigo-800 hover:bg-indigo-900 text-white py-3"
              onClick={() => handleRoutineClick("Night Routine")}
            >
              Night Routine
            </Button>
          </div>
        </div>
      )}

      {currentScreen === "routine" && (
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between w-full mb-8">
          <div className="bg-red-500 pl-5 pr-5 pt-3 pb-3 rounded-md cursor-pointer">
            <Button variant="destructive" style={{ cursor: "pointer", color: "white" }}>
              Back
            </Button>
           </div>
            <h2 className="text-2xl font-bold text-blue-600">{currentRoutine}</h2>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>

          {currentRoutine === "Morning Routine" && (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-blue-500 mb-2">Brush Teeth</h3>
                <p className="text-gray-600 mb-4">Catch the runaway toothbrush!</p>
                <div className="bg-blue-100 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-blue-500">Interactive game would appear here</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-blue-500 mb-2">Eat Breakfast</h3>
                <p className="text-gray-600 mb-4">Catch the jumping cereal!</p>
                <div className="bg-blue-100 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-blue-500">Interactive game would appear here</p>
                </div>
              </div>
            </div>
          )}

          {currentRoutine === "Afternoon Routine" && (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-purple-500 mb-2">Eat Lunch</h3>
                <p className="text-gray-600 mb-4">Stop your sandwich from bouncing!</p>
                <div className="bg-purple-100 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-purple-500">Interactive game would appear here</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-purple-500 mb-2">Playtime</h3>
                <p className="text-gray-600 mb-4">Put your toys back in their places!</p>
                <div className="bg-purple-100 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-purple-500">Interactive game would appear here</p>
                </div>
              </div>
            </div>
          )}

          {currentRoutine === "Night Routine" && (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-indigo-900 p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-indigo-200 mb-2">Brush Teeth</h3>
                <p className="text-indigo-300 mb-4">Answer the toothbrush's questions!</p>
                <div className="bg-indigo-800 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-indigo-200">Interactive game would appear here</p>
                </div>
              </div>

              <div className="bg-indigo-900 p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold text-indigo-200 mb-2">Story Time</h3>
                <p className="text-indigo-300 mb-4">Choose a story to read before bed!</p>
                <div className="bg-indigo-800 h-40 rounded-lg flex items-center justify-center">
                  <p className="text-indigo-200">Interactive game would appear here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

