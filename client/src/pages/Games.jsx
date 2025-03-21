import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Card from "../components/Card";
import PUZZLETTA from "/src/assets/images/puzzletta.png";
import { useRef } from "react";
import routine from '../assets/images/routine.jpg';
import drawing from '../assets/images/drawing.jpg'

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
            <div className="pt-24 lg:pt-26 min-h-screen flex flex-col items-center justify-center bg-[#D3FFFE] pb-16 lg:pb-26 bg-gradient-to-b from-[#C7FCFB] to-[#FBEDCA]">
                {/* Card and Image Container */}
                <div className="flex flex-col lg:flex-row items-center justify-center w-full p-4 lg:p-6 mb-16 lg:mb-64">
                    {/* Card - Keeping original desktop styling */}
                    <Card
                        title="PLAY"
                        descriptionTop="Get ready for fun with routines that help children thrive! Play our coloring games, emotion-drawing activities, or take our kid-friendly quizzes."
                        descriptionBottom="Earn special badges for participation and 5-day streaks. Have fun and enjoy all of the games."
                        buttonLeftText="START PLAYING"
                        onButtonLeftClick={scrollToGames}
                    />

                    {/* Centered Image - Preserving desktop positioning */}
                    <div className="relative lg:right-32 transform scale-75 lg:scale-90 mt-8 lg:mt-0">
                        <img 
                            src={PUZZLETTA} 
                            alt="Puzzletta" 
                            className="max-w-xs md:max-w-sm lg:max-w-md"
                        />
                    </div>
                </div>

                {/* Games Section */}
                <div 
                    ref={gamesRef} 
                    className="w-full flex flex-col items-center justify-center gap-4 lg:gap-6 mb-16 lg:mb-64 px-4 lg:px-6"
                >
                    <h2 
                        className="text-3xl lg:text-4xl font-bold" 
                        style={{color: "rgb(36, 178, 194)"}}
                    >
                        Online Games
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center w-full">
                        <Link to="/games/cozy-routines" className="w-full lg:w-auto">
                        <GameCard title="Cozy Routines" imageUrl={routine} /> 
                        </Link>

                        <Link to="/games/emotions-artist" className="w-full lg:w-auto">
                        <GameCard title="Emotions Artist" imageUrl={drawing} /> 
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}