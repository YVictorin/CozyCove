import { useState } from "react";
import GameCard from "../components/GameCard";
import Game from "../components/game/MainGame";

export default function GamesPage() {
    const [showGame, setShowGame] = useState(false);

    const handleRoutineGameClick = () => {
        setShowGame(true); 
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
            <h2 className="text-4xl font-bold">ONLINE GAMES</h2>

            {showGame ? (
                <Game />
            ) : (
                <div className="flex gap-6">
                    <GameCard onClick={handleRoutineGameClick} title="Cozy Routines" />
                    <GameCard />
                </div>
            )}
        </div>
    );
}
