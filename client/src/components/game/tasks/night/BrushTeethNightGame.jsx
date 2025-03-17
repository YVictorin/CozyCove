import { useState } from "react"
import { brushTeethQuestions } from "../../GameUtils"

import toothbrush from '../../../../assets/images/toothbrush.svg'

export default function BrushTeethNightGame({ onCompleteTask }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0)

  const handleAnswerClick = (answerIndex) => {
    const isCorrect = answerIndex === brushTeethQuestions[currentQuestion].correct

    if (isCorrect) {
      setAnsweredCorrectly((prev) => prev + 1)
    }

    if (currentQuestion < brushTeethQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // All questions answered
      if (answeredCorrectly >= 2) {
        // Passed!
        setTimeout(onCompleteTask, 1000)
      } else {
        // Failed, reset
        setCurrentQuestion(0)
        setAnsweredCorrectly(0)
      }
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="absolute top-2 right-2 text-indigo-200 font-bold">
        Question {currentQuestion + 1}/{brushTeethQuestions.length}
      </div>

      {/* Toothbrush character */}
      <div className="w-16 h-16 mb-4">
        <img
          src={toothbrush}
          alt="Toothbrush"
          className="w-full h-full object-contain"
          style={{ filter: "hue-rotate(100deg)", opacity: 0 }}
        />
      </div>

      {/* Question */}
      <div className="bg-indigo-800 p-4 rounded-lg mb-6 w-full max-w-xs text-nowrap">
        <p className="text-indigo-100 text-center font-bold">{brushTeethQuestions[currentQuestion].question}</p>
      </div>

      {/* Answer options */}
      <div className="space-y-3 w-full max-w-xs">
        {brushTeethQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className="w-full p-3 bg-indigo-700 hover:bg-indigo-600 text-indigo-100 rounded-lg text-left"
            onClick={() => handleAnswerClick(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

