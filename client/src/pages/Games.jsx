import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Card from "../components/Card";
import PUZZLETTA from "/src/assets/images/puzzletta.png";
import { useRef } from "react";

export default function GamesPage() {
    const gamesRef = useRef(null);

    const scrollToGames = () => {
        gamesRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "center" // This will position the element in the center of the viewport
        });
    };

    return (
        <>
            <div className="pt-26 min-h-screen flex flex-col items-center justify-center pb-26 bg-gradient-to-b from-[#C7FCFB] to-[#FBEDCA]" 
           >
                
                {/* Card and Image Container */}
                <div className="scale-90 flex flex-col lg:flex-row items-center justify-center w-full p-6 mb-64">
                    <Card 
                        title="PLAY" 
                        descriptionTop="Get ready for fun with routines that help children thrive! Play our coloring games, emotion-drawing activities, or take our kid-friendly quizzes."
                        descriptionBottom="Earn special badges for participation and 5-day streaks. Have fun and enjoy all of the games." 
                        buttonLeftText="START PLAYING"
                        onButtonLeftClick={scrollToGames}
                    />

                    {/* Centered Image */}
                    <div className="relative right-32 scale-90">
                        <img src={PUZZLETTA} alt="Puzzletta" className="max-w-xs md:max-w-sm lg:max-w-md" />
                    </div>
                </div>

                <div ref={gamesRef} className="w-full flex flex-col items-center justify-center gap-6 mb-64 -mt-40">
                    <h2 className="text-4xl font-bold" style={{color: "rgb(36, 178, 194)"}}>Online Games</h2>
                    
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link to="/games/cozy-routines">
                            <GameCard title="Cozy Routines" />
                        </Link>

                        <Link to="/games/emotions-artist">
                            <GameCard title="Emotions Artist" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}