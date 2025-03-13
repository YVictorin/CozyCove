import { useState } from "react";
import GameCard from "../components/GameCard";
import Game from "../components/game/MainGame";
import { ChevronLeft } from "lucide-react";

export default function GamesPage() {
    const [showGame, setShowGame] = useState(false);

    const handleRoutineGameClick = () => {
        setShowGame(true);
    };

    const handleBackClick = () => {
        setShowGame(false);
    };

    return (
        <>
           
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
                {showGame ? (
                    <>
                    <h2 className="text-4xl font-bold">Cozy Routines</h2>

                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full">
                                <button onClick={handleBackClick} className="cursor-pointer flex gap-5 px-4 py-2 bg-blue-500 text-white rounded-3xl w-40 justify-self-start">
                                    <ChevronLeft/>
                                    Back
                                </button>
                            </div>
                         
                            <Game />
                        </div>
                    </>
                ) : (
                    <>
                    <h2 className="text-4xl font-bold">Online Games</h2>
                    <div className="flex gap-6">
                    <GameCard onClick={handleRoutineGameClick} title="Cozy Routines" />
                    <GameCard title="Draw Emotions" />
                    </div>

                    </>
               
                )}
        </div>         
        </>
      
    );
}
