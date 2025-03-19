import React, { useState } from 'react';

const NavCarousel = () => {
    // Placeholder images - in a real implementation, you would import these
    // Note: I'm using placeholder API for demonstration
    const characterImage = "/api/placeholder/120/120";
    const remoteImage = "/api/placeholder/120/120";
    const duckImage = "/api/placeholder/120/120";
    const gameImage = "/api/placeholder/120/120"; // New image for the games card

    // Cards data array
    const cards = [
        {
            id: 1,
            image: characterImage,
            alt: "Character",
            title: "Characters",
            description: "Learn more about your favourite characters from the wide world!",
        },
        {
            id: 2,
            image: remoteImage,
            alt: "Remote",
            title: "Watch",
            description: "Learn more about every episode and relive your favourite moments with clips, fun-facts, related!",
        },
        {
            id: 3,
            image: duckImage,
            alt: "Duck craft",
            title: "Make",
            description: "Recipes, crafts and downloadable activities for the whole family to enjoy together.",
        },
        {
            id: 4,
            image: gameImage,
            alt: "Games",
            title: "Games",
            description: "Fun interactive games featuring your favorite Bluey characters for endless entertainment!",
        }
    ];

    // State to keep track of which cards are visible
    const [startIndex, setStartIndex] = useState(0);
    const cardsToShow = 3; // Number of cards to display at once

    // Navigation functions
    const handlePrevious = () => {
        setStartIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? cards.length - cardsToShow : newIndex;
        });
    };

    const handleNext = () => {
        setStartIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex > cards.length - cardsToShow ? 0 : newIndex;
        });
    };

    // Get only the cards that should be visible
    const visibleCards = () => {
        const result = [];
        for (let i = 0; i < cardsToShow; i++) {
            const index = (startIndex + i) % cards.length;
            result.push(cards[index]);
        }
        return result;
    };

    return (
        <div className="bg-transparent min-h-fit flex items-center justify-center p-4 py-8">
            <div className="flex items-center w-full max-w-6xl">
                {/* Left Navigation Arrow */}
                <button
                    onClick={handlePrevious}
                    className="flex-shrink-0 mr-6 bg-[#24b2c2] hover:bg-[#26a5b3] text-white rounded-full w-16 h-16 flex items-center justify-center z-10 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Cards Container */}
                <div className="flex-grow overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6">
                        {visibleCards().map((card) => (
                            <div key={card.id} className="bg-[#ffffff] rounded-xl overflow-hidden flex-1 mt-16">
                                <div className="p-6 flex flex-col items-center">
                                    <div className="mb-4 -mt-24 relative z-10">
                                        <img src={card.image} alt={card.alt} className="w-32 h-32" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#33a5ce] mb-3">{card.title}</h2>
                                    <p className="text-[#386169] text-center mb-6">{card.description}</p>
                                    <button className="relative overflow-hidden bg-[#33a5ce] text-white font-extrabold text-lg py-3 px-12 rounded-full mb-3 transform transition-all duration-300 hover:scale-105 group">
                                        <span className="relative z-10">VIEW ALL</span>
                                        <span className="absolute inset-0 bg-[#fa507e] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Navigation Arrow */}
                <button
                    onClick={handleNext}
                    className="flex-shrink-0 ml-6 bg-[#24b2c2] hover:bg-[#26a5b3] text-white rounded-full w-16 h-16 flex items-center justify-center z-10 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavCarousel;