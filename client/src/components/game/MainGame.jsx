import { useEffect, useState, lazy, Suspense } from "react";
import { Button } from "react-bootstrap";
import  { Card } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Volume2, VolumeX } from "lucide-react";

// Dynamically import the game content using React.lazy
const GameContent = lazy(() => import("./GameContent"));

export default function Game() {
  const [isCalming, setIsCalming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState("Morning Routine");

  {/* wip sound system for Main Menu */}
  
  // const [isMuted, setIsMuted] = useState(false);
  // const toggleMute = () => {
  //   setIsMuted(!isMuted);
  //   window.dispatchEvent(
  //     new CustomEvent("game-mute-toggle", { detail: { muted: !isMuted } })
  //   );
  // };

  const toggleCalmingMode = () => {
    setIsCalming(!isCalming);
    window.dispatchEvent(
      new CustomEvent("game-calming-toggle", { detail: { calming: !isCalming } })
    );
  };

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
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        {isCalming && (
          <div className="absolute inset-0 bg-blue-900/70 z-10 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">Calming Mode</h3>
            <p className="mb-6">Take a deep breath. Relax.</p>
            <Button
              onClick={toggleCalmingMode}
              variant="outline"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Return to Game
            </Button>
          </div>
        )}
        <div className="bg-blue-100 p-4 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-blue-800">{currentRoutine}</h2>
            <ProgressBar value={progress} className="w-64 h-2 mt-1" />
          </div>

          {/* wip sound system for Main Menu */}
          {/* <div className="flex gap-2">
            <Button
              onClick={toggleMute}
              variant="outline"
              size="icon"
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div> */}
        </div>
        <div className="w-full h-[600px] bg-white">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                Loading game...
              </div>
            }
          >
            <GameContent />
          </Suspense>
        </div>
      </div>

      <Card className="p-4 mt-4 w-full max-w-4xl bg-yellow-50 border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-2">Parent Info</h3>
        <p className="text-sm text-yellow-700" style={{color: "oklch(0.554 0.135 66.442)"}}>
          Cozy Routines helps children build consistent daily routines through fun gameplay.
          Track your child's progress and customize their experience in the Parent Dashboard.
        </p>
      </Card>
    </div>
  );
}
