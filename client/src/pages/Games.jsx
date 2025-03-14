import { useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Game from "../components/game/MainGame";

export default function GamesPage() {
  const [showGame, setShowGame] = useState(false);

  // Cozy Routines
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
          <Link to="/games/emotions-artist">
            <GameCard title="Emotions Artist" />
          </Link>
        </div>
      )}
    </div>
  );
}
