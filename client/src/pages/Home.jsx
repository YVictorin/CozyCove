import React from 'react';
import cove1 from '../assets/images/cove1.svg';
import snappy from '../assets/images/snappy.png';
import textlogo from '../assets/images/textlogo.png';
import CharactersGrid from '../components/CharacterGrid';
import NavCarousel from '../components/NavCarousel';

// HeroSection component
const HeroSection = () => {
    return (
        <div className="relative w-full overflow-hidden">
            {/* container with mission statement and and character image */}
            <div className="relative z-10 flex justify-center items-center w-full h-full px-4 py-16 mt-20 md:mt-24">
                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
                    {/* Text bubble */}
                    <div
                        className="bg-[#f8f8ff] rounded-3xl md:rounded-4xl p-4 md:p-6 mb-8 md:mb-0 md:mr-10 max-w-xs md:max-w-md transform rotate-[-1deg] relative z-10"
                        style={{
                            border: '6px solid white',
                            outline: '6px solid #6fd5ea',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 -5px 10px rgba(0, 0, 0, 0.05)',
                            transform: 'perspective(1000px) rotateX(2deg) rotateY(-1deg) rotate(-3deg)',
                        }}
                    >
                        <h1 className="font-bold text-3xl md:text-4xl text-[#f5975c] mb-2 md:mb-4 text-center">
                            WELCOME TO THE
                        </h1>
                        <div className="flex justify-center mb-3 md:mb-4">
                            <img
                                src={textlogo}
                                alt="Coziest Cove Logo"
                                className="h-12 md:h-16 w-auto"
                            />
                        </div>
                        <p className="text-gray-700 text-base md:text-lg">
                            At Cozy Cove, we create warm, welcoming spaces where every neurodivergent child can learn, play, and grow. With love and support, we provide resources that spark confidence and joy.
                        </p>
                    </div>

                    {/* Snappy image positioning*/}
                    <div className="relative h-52 md:h-80 w-52 md:w-80 -ml-8 md:-ml-16 mt-8 md:mt-8">
                        <img
                            src={snappy}
                            alt="Snappy character"
                            className="h-full w-auto object-contain relative z-20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-[#c7fcfb] via-[#d3fffe] via-[#d3fffe] to-[#fbedca]">

            {/* Background image positioning appears behind navbar */}
            <div className="absolute left-0 right-0 h-[40%] md:h-[28%] lg:h-[35%] top-0 z-0">
                <img
                    src={cove1}
                    alt="Bluey cove background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Navbar */}
            <nav className="relative z-50">
                {/* Your navbar content */}
            </nav>

            {/* Hero section */}
            <div className="mb-0">
                <HeroSection />
            </div>

            <NavCarousel />

            {/* Characters Grid Section */}
            <div className="mt-0">
                <CharactersGrid />
            </div>

        </div>
    );
}