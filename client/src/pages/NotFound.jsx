import React from 'react';
import cove1 from '../assets/images/cove1.svg';
import snuggles from '../assets/images/snuggles.png';
import textlogo from '../assets/images/textlogo.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
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

            {/* 404 content section */}
            <div className="relative z-10 flex justify-center items-center w-full h-full px-4 py-16 mt-20 md:mt-22">
                <div className="flex flex-col items-center max-w-6xl mx-auto">
                    {/* Snuggles image - positioned to look a bit confused/searching */}
                    <div className="relative h-52 md:h-64 w-60 md:w-72 mb-0">
                        <img
                            src={snuggles}
                            alt="Snuggles character"
                            className="h-full w-auto object-contain relative z-20 transform -rotate-12"
                        />
                    </div>

                    {/* Text bubble */}
                    <div
                        className="bg-[#f8f8ff] rounded-3xl md:rounded-4xl p-4 md:p-6 max-w-xs md:max-w-md relative z-10 text-center"
                        style={{
                            border: '6px solid white',
                            outline: '6px solid #6fd5ea',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 -5px 10px rgba(0, 0, 0, 0.05)',
                            transform: 'perspective(1000px) rotateX(2deg) rotateY(-1deg) rotate(-1deg)',
                        }}
                    >
                        <h1 className="font-bold text-5xl md:text-6xl text-[#f5975c] mb-2 md:mb-4">
                            404
                        </h1>
                        <div className="flex justify-center mb-3 md:mb-4">
                            <img
                                src={textlogo}
                                alt="Coziest Cove Logo"
                                className="h-10 md:h-12 w-auto"
                            />
                        </div>
                        <h2 className="font-bold text-2xl md:text-3xl text-[#6fd5ea] mb-2 md:mb-4">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg mb-6">
                            Looks like Snuggles can't find this page! Maybe it wandered off for a nap or to play with friends?
                        </p>
                        <Link to="/"
                            className="inline-block px-6 py-3 rounded-full bg-[#f5975c] text-white font-bold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6fd5ea] focus:ring-offset-2"
                            style={{
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                        >
                            Let's Go Home
                        </Link>
                    </div>

                    {/* Fun decorative elements */}
                    <div className="absolute top-12 right-10 md:top-16 md:right-20 h-12 w-12 md:h-16 md:w-16 bg-[#6fd5ea] rounded-full opacity-20 z-0"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;