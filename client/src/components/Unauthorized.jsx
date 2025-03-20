import React from 'react';
import cove1 from '../assets/images/cove1.svg';
import link from '../assets/images/link.png';
import textlogo from '../assets/images/textlogo.png';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
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

            {/* Unauthorized content section */}
            <div className="relative z-10 flex justify-center items-center w-full h-full px-4 py-16 mt-20 md:mt-24">
                <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
                    {/* Text bubble */}
                    <div
                        className="bg-[#f8f8ff] rounded-3xl md:rounded-4xl p-4 md:p-6 mb-8 md:mb-0 md:mr-10 max-w-xs md:max-w-md transform relative z-10"
                        style={{
                            border: '6px solid white',
                            outline: '6px solid #6fd5ea',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 -5px 10px rgba(0, 0, 0, 0.05)',
                            transform: 'perspective(1000px) rotateX(2deg) rotateY(-1deg) rotate(-2deg)',
                        }}
                    >
                        <h1 className="font-bold text-3xl md:text-4xl text-[#f5975c] mb-2 md:mb-4 text-center">
                            OOPS!
                        </h1>
                        <div className="flex justify-center mb-3 md:mb-4">
                            <img
                                src={textlogo}
                                alt="Coziest Cove Logo"
                                className="h-10 md:h-12 w-auto"
                            />
                        </div>
                        <h2 className="font-bold text-xl md:text-2xl text-[#6fd5ea] mb-2 md:mb-4 text-center">
                            This Area Is For Members Only
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg mb-6 text-center">
                            Looks like you need special permission to visit this part of the Cove!
                            Link is keeping this area safe for our special members.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/login"
                                className="inline-block px-6 py-3 rounded-full bg-[#f5975c] text-white font-bold text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6fd5ea] focus:ring-offset-2"
                                style={{
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
                            >
                                Login
                            </Link>
                            <Link to="/"
                                className="inline-block px-6 py-3 rounded-full bg-[#6fd5ea] text-white font-bold text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f5975c] focus:ring-offset-2"
                                style={{
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>

                    {/* Link image - positioned to look like a friendly guard */}
                    <div className="relative h-52 md:h-80 w-52 md:w-80 -ml-8 md:-ml-16 mt-8 md:mt-0">
                        <img
                            src={link}
                            alt="Link character"
                            className="h-full w-auto object-contain relative z-20 transform scale-x-[-1]"
                        />
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-8 h-20 w-20 bg-[#6fd5ea] rounded-full opacity-10 z-0"></div>
            <div className="absolute top-32 right-8 h-16 w-16 bg-[#f5975c] rounded-full opacity-10 z-0"></div>
        </div>
    );
};

export default UnauthorizedPage;