
import { Button }  from "react-bootstrap"

export default function MenuScreen({ onRoutineClick, onBadgesClick }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Routine Rush</h2>
      <p className="text-xl text-blue-500 mb-8">Build Your Best Day!</p>

      <div className="flex flex-col gap-4 w-64">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 cursor-pointer"
          onClick={() => onRoutineClick("Morning Routine")}
        >
          Morning Routine
        </Button>
        <Button
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 cursor-pointer"
          onClick={() => onRoutineClick("Afternoon Routine")}
        >
          Afternoon Routine
        </Button>
        <Button
          className="bg-indigo-800 hover:bg-indigo-800 text-white py-3 cursor-pointer"
          onClick={() => onRoutineClick("Night Routine")}
        >
          Night Routine
        </Button>
      </div>

      {/* <div className="mt-8 flex gap-4">
        <Button 
          variant="outline" 
          onClick={onBadgesClick}
          style={{ color:"#90caf9", cursor: "pointer" }}
        >
          View Badges
        </Button>
       
      </div> */}
    </div>
  )
}

