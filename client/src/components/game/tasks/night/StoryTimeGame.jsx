import { bedtimeStories } from "../../GameUtils"

export default function StoryTimeGame({ onCompleteTask }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">

      <div className="space-y-3 w-full max-w-xs">
        {bedtimeStories.map((story, index) => (
          <button
            key={index}
            className="w-full p-3 bg-indigo-700 hover:bg-indigo-600 text-indigo-100 rounded-lg flex items-center gap-3"
            onClick={onCompleteTask}
          >
            <span>{story.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

