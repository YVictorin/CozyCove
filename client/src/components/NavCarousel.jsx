import React, { useState, useEffect } from 'react';
import explore from '../assets/images/explore.png';
import games from '../assets/images/games.png';
import tools from '../assets/images/tools.png';

const NavCarousel = () => {
    // Cards data array
    const cards = [
        {
            id: 1,
            image: explore,
            alt: "explore",
            title: "Parents",
            description: "Learn more about what it means to have autism and how you can snap in your own puzzle piece",
        },
        {
            id: 2,
            image: games,
            alt: "games",
            title: "Games",
            description: "Complete your favorite routine or draw your favorite emotion!",
        },
        {
            id: 3,
            image: tools,
            alt: "tools",
            title: "Build",
            description: "crafts and diy activities for the whole family to enjoy together.",
        }
    ];

    // State to keep track of which cards are visible
    const [startIndex, setStartIndex] = useState(0);
    // State to track screen size
    const [isMobile, setIsMobile] = useState(false);

    // Determine how many cards to show based on screen size
    const cardsToShow = isMobile ? 1 : 2;

    // Effect to check screen size and update isMobile state
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // 768px is common breakpoint for mobile
        };

        // Initial check
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup event listener
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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
        <div className="bg-transparent min-h-fit flex flex-col items-center justify-center p-4 py-8">
            {/* Section Header */}
            <div className="text-center mb-10 pt-10">
                <h1 className="text-3xl md:text-4xl font-bold text-[#33a5ce] mb-2">Discover Cozy Cove </h1>
                <p className="text-[#386169] text-lg max-w-2xl mx-auto">Explore our collection of tools, games, and resources designed to support your journey.</p>
            </div>

            <div className="flex items-center w-full max-w-6xl">
                {/* Left Navigation Arrow */}
                <button
                    onClick={handlePrevious}
                    className="flex-shrink-0 mr-4 md:mr-6 bg-[#24b2c2] hover:bg-[#26a5b3] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center z-10 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Cards Container */}
                <div className="flex-grow overflow-hidden">
                    <div className="flex flex-col md:flex-row md:gap-6">
                        {visibleCards().map((card) => (
                            <div key={card.id} className="relative flex flex-col items-center mt-16 mx-auto w-full max-w-sm md:max-w-none">
                                {/* Floating image that sits above the card */}
                                <div className="absolute z-20 -top-16">
                                    <img src={card.image} alt={card.alt} className="w-36 h-36 object-contain" />
                                </div>

                                {/* The actual card */}
                                <div className="bg-white rounded-xl w-full pt-20 pb-6 px-6 flex flex-col items-center">
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
                    className="flex-shrink-0 ml-4 md:ml-6 bg-[#24b2c2] hover:bg-[#26a5b3] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center z-10 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavCarousel;
