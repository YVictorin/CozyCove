"use client"

import { bedtimeStories } from "../../gameUtils"

export default function StoryTimeGame({ onCompleteTask }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <h3 className="text-indigo-200 font-bold mb-4">Choose a story:</h3>

      <div className="space-y-3 w-full max-w-xs">
        {bedtimeStories.map((story, index) => (
          <button
            key={index}
            className="w-full p-3 bg-indigo-700 hover:bg-indigo-600 text-indigo-100 rounded-lg flex items-center gap-3"
            onClick={onCompleteTask}
          >
            <img
              src={`/placeholder.svg?height=48&width=48&text=${story.image}`}
              alt={story.title}
              className="w-12 h-12 object-contain"
              style={{ filter: `hue-rotate(${index * 60}deg)` }}
            />
            <span>{story.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

