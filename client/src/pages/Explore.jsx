
import React, { useState, useRef, useEffect } from 'react';
import ResourceCard from '../components/ResourceCard';
import faqData from './data/faqData';
import categoryCards from './data/categoryCard';
import SupportBot from '../components/SupportBot';
import VisualSchedule from '../components/VisualSchedule';

const Explore = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const carouselRef = useRef(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const scroll = (direction) => {
        const container = carouselRef.current;
        if (!container) return;

        // Smaller scroll amount for mobile devices
        const scrollAmount = window.innerWidth <= 640 
            ? container.offsetWidth * 0.8 
            : container.offsetWidth * 0.75;
            
        const newScrollPosition =
            direction === 'left'
                ? Math.max(0, scrollPosition - scrollAmount)
                : Math.min(
                    container.scrollWidth - container.offsetWidth,
                    scrollPosition + scrollAmount
                );

        container.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth',
        });

        setScrollPosition(newScrollPosition);
    };

    useEffect(() => {
        if (carouselRef.current) {
            setScrollPosition(carouselRef.current.scrollLeft);
        }

        // Add event listener to update scroll position when carousel is scrolled
        const handleScroll = () => {
            if (carouselRef.current) {
                setScrollPosition(carouselRef.current.scrollLeft);
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-[#c7fcfb] via-[#d3fffe] via-[#d3fffe] to-[#fbedca]">
            {/* Navbar (if needed) */}
            <nav className="relative z-50">
                {/* Your navbar content */}
            </nav>

            {/* Hero Section - Further optimized for 370px */}
            <div className="bg-[#f9f9f9] py-3 md:py-16 text-center mb-2 md:mb-10 rounded-md md:rounded-3xl shadow-lg relative overflow-hidden w-full mt-2 md:mt-64">
                <div className="absolute w-10 h-10 md:w-40 md:h-40 bg-[#FD975F] rounded-full blur-md md:blur-2xl top-1 md:top-10 left-1 md:left-10"></div>
                <div className="absolute w-10 h-10 md:w-40 md:h-40 bg-[#F7D41E] rounded-full blur-md md:blur-2xl bottom-1 md:bottom-10 right-1 md:right-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-2 md:px-4">
                    <h1 className="text-lg md:text-5xl font-bold text-[#FA507E] mb-1 md:mb-5 text-shadow-md">GROWN-UPS</h1>
                    <p className="text-xs md:text-xl mb-1 md:mb-8 text-[#666666] px-1 md:px-0">
                        Supporting parents, caregivers, and educators with tools, strategies, and a community to help your child thrive.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Reduced padding */}
            <main className="max-w-6xl mx-auto px-1 md:px-4 py-1 md:py-8 w-full">
                {/* Welcome Section */}
                <section className="bg-[#f9f9f9] p-2 md:p-8 rounded-md md:rounded-3xl shadow-md mb-2 md:mb-10">
                    <div className="text-center mb-1 md:mb-8">
                        <h2 className="text-base md:text-4xl font-semibold text-[#26A5B3] mb-1 md:mb-4">Welcome to Our Resource Center</h2>
                        <p className="text-xs md:text-lg text-[#666666]">
                            We understand that raising a neurodivergent child comes with unique joys and challenges. Our resource center is designed to provide you with information, practical tools, and supportive community resources.
                        </p>
                    </div>
                </section>

                {/* Resource Categories Carousel - Optimized for 370px */}
                <section className="mb-2 md:mb-10">
                    <h2 className="text-sm md:text-3xl font-semibold text-[#FA507E] mb-1 md:mb-6 px-1">Resource Categories</h2>
                    <div className="relative flex items-center">
                        <button
                            className="absolute left-0 z-20 bg-[#D3FFFE] bg-opacity-90 border-none p-1 md:p-3 rounded-full text-xs md:text-xl cursor-pointer hover:bg-opacity-100 shadow-md w-5 h-5 md:w-10 md:h-10 flex items-center justify-center"
                            onClick={() => scroll('left')}
                            aria-label="Scroll left"
                        >
                            &lt;
                        </button>
                        <div
                            className="flex overflow-x-auto scroll-smooth w-full px-6 md:px-16 no-scrollbar"
                            ref={carouselRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {categoryCards.map((card, index) => (
                                <ResourceCard
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    description={
                                        <div className="card-content min-h-[40px] md:min-h-[90px] text-xs md:text-base">
                                            {card.description}
                                        </div>
                                    }
                                    link={card.link}
                                    cardStyle={`bg-[#f8f8ff] border border-white outline outline-[#6fd5ea] 
                                          shadow-md transform transition-all hover:scale-105 hover:shadow-xl
                                          rounded-md md:rounded-3xl p-1 md:p-6 text-center w-[80%] md:w-auto flex-shrink-0 mx-1 md:mr-5`}
                                />
                            ))}
                        </div>
                        <button
                            className="absolute right-0 z-20 bg-[#D3FFFE] bg-opacity-90 border-none p-1 md:p-3 rounded-full text-xs md:text-xl cursor-pointer hover:bg-opacity-100 shadow-md w-5 h-5 md:w-10 md:h-10 flex items-center justify-center"
                            onClick={() => scroll('right')}
                            aria-label="Scroll right"
                        >
                            &gt;
                        </button>
                    </div>
                </section>

                {/* Visual Schedule Section */}
                <section className="bg-[#f9f9f9] p-1 md:p-8 rounded-md md:rounded-3xl shadow-md mb-2 md:mb-10">
                    <h2 className="text-sm md:text-3xl font-semibold text-[#26A5B3] mb-1 md:mb-4">Create Your Visual Schedule</h2>
                    <div className="p-0 md:p-4">
                        <VisualSchedule />
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-[#f9f9f9] p-2 md:p-8 rounded-md md:rounded-3xl shadow-md mb-2 md:mb-10">
                    <h2 className="text-sm md:text-3xl font-semibold text-[#FA507E] mb-1 md:mb-6">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b border-[#999999] py-1 md:py-4">
                                <h3
                                    className={`text-xs md:text-xl font-semibold cursor-pointer flex justify-between items-center ${activeFaq === index ? 'text-[#6EE4DE]' : 'text-[#26A5B3]'} px-1 md:px-0`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="pr-1">{faq.question}</span>
                                    <span className="flex-shrink-0">{activeFaq === index ? '−' : '+'}</span>
                                </h3>
                                <p className={`mt-1 md:mt-2 text-xs md:text-base text-[#666666] px-1 md:px-0 ${activeFaq === index ? 'block' : 'hidden'}`}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Support Bot - Adjusted size and position */}
            <div className="fixed bottom-1 right-1 z-50 max-w-[350px] w-full">
                <SupportBot />
            </div>

            {/* Add custom CSS for hiding scrollbars */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Explore;