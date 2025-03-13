import { useRef } from "react"

import Bed from "../../../../assets/images/Bed.svg"

export default function SleepGame({ onCompleteTask }) {
  const gameAreaRef = useRef(null)

  const handleLightSwitch = () => {
    // Animate lights turning off
    const gameArea = gameAreaRef.current
    if (gameArea) {
      gameArea.classList.add("transition-all", "duration-1000", "bg-black")
      setTimeout(() => {
        onCompleteTask()
      }, 1000)
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" ref={gameAreaRef}>
      <div className="mb-6 text-indigo-200">Time to go to sleep. Turn off the lights.</div>

      {/* Bed */}
      <div className="w-40 h-24 mb-8">
        <img
          src={Bed}
          alt="Bed"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(240deg)" }}
        />
      </div>

      {/* Light switch */}
      <button className="p-4 bg-yellow-400 hover:bg-yellow-300 rounded-full shadow-lg cursor-pointer" onClick={handleLightSwitch}>
        <svg
          className="w-8 h-8 text-yellow-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      </button>
    </div>
  )
}

