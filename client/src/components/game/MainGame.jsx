import { useEffect, useState, lazy, Suspense } from "react";
import { Card } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoadingBar from "./utils/LoadingBar";

// Dynamically import the game content using React.lazy
const GameContent = lazy(() => import("./GameContent"));


export default function Game() {
  const [progress, setProgress] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState("Morning Routine");



  // Listen for custom game events
  useEffect(() => {
    const handleProgress = (e) => {
      setProgress(e.detail.progress * 100);
    };

    const handleRoutineChange = (e) => {
      setCurrentRoutine(e.detail.routine);
    };

    window.addEventListener("game-progress", handleProgress);
    window.addEventListener("game-routine-change", handleRoutineChange);

    return () => {
      window.removeEventListener("game-progress", handleProgress);
      window.removeEventListener("game-routine-change", handleRoutineChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-48 mb-48">
      <div className="w-full max-w-4xl relative">
  
        <div className="bg-blue-100 p-4 rounded-t-xl flex justify-between items-center">
          
          <div>
            <h2 className="text-xl font-bold text-blue-800">{currentRoutine}</h2>        
            <ProgressBar value={progress} className="w-64 h-2 mt-1" />   
          </div>

        </div>
        <div className="w-full h-[600px] bg-white">

          <Suspense fallback={<LoadingBar />}>
            <GameContent />
          </Suspense>

        </div>
      </div>

      <Card className="p-4 mt-4 w-full max-w-4xl bg-yellow-50 border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-2">Parent Info</h3>
        <p className="text-sm text-yellow-700" style={{color: "oklch(0.554 0.135 66.442)"}}>
        Cozy Routines helps children build consistent daily habits through fun and interactive gameplay. With your Parent Account, 
        you can track their progress, celebrate achievements, and view their earned badges.
        </p>
      </Card>
    </div>
  );
}