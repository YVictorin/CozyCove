// import React, { useState, useRef, useEffect } from 'react';
// import ResourceCard from '../components/ResourceCard';
// import faqData from './data/faqData';
// import categoryCards from './data/categoryCard';
// import SupportBot from '../components/SupportBot';
// import VisualSchedule from '../components/VisualSchedule';

// const Explore = () => {
//     const [activeFaq, setActiveFaq] = useState(null);
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const carouselRef = useRef(null);

//     const toggleFaq = (index) => {
//         setActiveFaq(activeFaq === index ? null : index);
//     };

//     const scroll = (direction) => {
//         const container = carouselRef.current;
//         if (!container) return;

//         const scrollAmount = container.offsetWidth;
//         const newScrollPosition =
//             direction === 'left'
//                 ? Math.max(0, scrollPosition - scrollAmount)
//                 : Math.min(
//                     container.scrollWidth - container.offsetWidth,
//                     scrollPosition + scrollAmount
//                 );

//         container.scrollTo({
//             left: newScrollPosition,
//             behavior: 'smooth',
//         });

//         setScrollPosition(newScrollPosition);
//     };

//     useEffect(() => {
//         if (carouselRef.current) {
//             setScrollPosition(carouselRef.current.scrollLeft);
//         }
//     }, []);

//     return (
// <div className="bg-[#FFF9F0]">
//     <div className="bg-[#FBEDCA] py-16 text-center mb-10 rounded-3xl shadow-lg relative overflow-hidden w-full mt-64"> 
//         <div className="absolute w-40 h-40 bg-[#FD975F] rounded-full blur-2xl top-10 left-10"></div>
//         <div className="absolute w-40 h-40 bg-[#F7D41E] rounded-full blur-2xl bottom-10 right-10"></div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4">
//             <h1 className="text-5xl font-bold text-[#FA507E] mb-5 text-shadow-md">GROWN-UPS</h1>
//             <p className="text-xl mb-8 text-[#666666]">
//                 Supporting parents, caregivers, and educators with tools, strategies, and a community to help your child thrive.
//             </p>
//         </div>
//     </div>


//             {/* Main Content Area */}
//             <main className="max-w-6xl mx-auto px-4 py-8">
//                 {/* Welcome Section */}
//                 <section className="bg-[#D3FFFE] p-8 rounded-3xl shadow-md mb-10">
//                     <div className="text-center mb-8">
//                         <h2 className="text-4xl font-semibold text-[#26A5B3] mb-4">Welcome to Our Resource Center</h2>
//                         <p className="text-lg text-[#666666]">
//                             We understand that raising a child on the spectrum comes with unique joys and challenges. Our resource center is designed to provide you with information, practical tools, and supportive community resources. Browse our collection of resources below or use the navigation menu to find specific tools that match your family's needs.
//                         </p>
//                     </div>
//                 </section>

//                 {/* Resource Categories Carousel */}
//                 <section className="mb-10">
//                     <h2 className="text-3xl font-semibold text-[#FA507E] mb-6">Resource Categories</h2>
//                     <div className="relative flex items-center">
//                         <button
//                             className="absolute left-0 bg-[#D3FFFE] bg-opacity-80 border-none p-3 rounded-md text-xl cursor-pointer z-10 hover:bg-opacity-100"
//                             onClick={() => scroll('left')}
//                         >
//                             &lt;
//                         </button>
//                         <div
//                             className="flex overflow-x-auto scroll-smooth w-full px-16"
//                             ref={carouselRef}
//                         >
//                             {categoryCards.map((card, index) => (
//                                 <ResourceCard
//                                     key={index}
//                                     image={card.image}
//                                     title={card.title}
//                                     description={
//                                     <div className="card-content min-h-[90px]">
//                                     {card.description}
//                                     </div>
//                                     }
//                                     link={card.link}
//                                     cardStyle="bg-[#F2E2B8] hover:bg-[#FBEDCA]"
//                                 />
//                             ))}
//                         </div>
//                         <button
//                             className="absolute right-0 bg-[#D3FFFE] bg-opacity-80 border-none p-3 rounded-md text-xl cursor-pointer z-10 hover:bg-opacity-100"
//                             onClick={() => scroll('right')}
//                         >
//                             &gt;
//                         </button>
//                     </div>
//                 </section>
// <section className="bg-[#E3FFFF] p-8 rounded-3xl shadow-md mb-10">
//     <h2 className="text-3xl font-semibold text-[#26A5B3] mb-4">Create Your Visual Schedule</h2>
//     <div className="p-4">
//         <VisualSchedule />
//     </div>
// </section>
//                 {/* FAQ Section */}
//                 <section className="bg-[#E3FFFF] p-8 rounded-3xl shadow-md mb-10">
//                     <h2 className="text-3xl font-semibold text-[#FA507E] mb-6">Frequently Asked Questions</h2>
//                     <div className="max-w-3xl mx-auto">
//                         {faqData.map((faq, index) => (
//                             <div key={index} className="border-b border-[#999999] py-4">
//                                 <h3
//                                     className={`text-xl font-semibold cursor-pointer ${activeFaq === index ? 'text-[#6EE4DE]' : 'text-[#26A5B3]'}`}
//                                     onClick={() => toggleFaq(index)}
//                                 >
//                                     {faq.question}
//                                 </h3>
//                                 <p className={`mt-2 text-[#666666] ${activeFaq === index ? 'block' : 'hidden'}`}>
//                                     {faq.answer}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//       </main>
//       <SupportBot />
//      </div>

//   );
// };

// export default Explore;
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

        const scrollAmount = container.offsetWidth;
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
    }, []);

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-[#c7fcfb] via-[#d3fffe] via-[#d3fffe] to-[#fbedca]">
            {/* Navbar (if needed) */}
            <nav className="relative z-50">
                {/* Your navbar content */}
            </nav>

            {/* Hero Section */}
            <div className="bg-[#FBEDCA] py-16 text-center mb-10 rounded-3xl shadow-lg relative overflow-hidden w-full mt-64">
                <div className="absolute w-40 h-40 bg-[#FD975F] rounded-full blur-2xl top-10 left-10"></div>
                <div className="absolute w-40 h-40 bg-[#F7D41E] rounded-full blur-2xl bottom-10 right-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-[#FA507E] mb-5 text-shadow-md">GROWN-UPS</h1>
                    <p className="text-xl mb-8 text-[#666666]">
                        Supporting parents, caregivers, and educators with tools, strategies, and a community to help your child thrive.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Welcome Section */}
                <section className="bg-[#D3FFFE] p-8 rounded-3xl shadow-md mb-10">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-semibold text-[#26A5B3] mb-4">Welcome to Our Resource Center</h2>
                        <p className="text-lg text-[#666666]">
                            We understand that raising a child on the spectrum comes with unique joys and challenges. Our resource center is designed to provide you with information, practical tools, and supportive community resources. Browse our collection of resources below or use the navigation menu to find specific tools that match your family's needs.
                        </p>
                    </div>
                </section>

                {/* Resource Categories Carousel */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-[#FA507E] mb-6">Resource Categories</h2>
                    <div className="relative flex items-center">
                        <button
                            className="absolute left-0 bg-[#D3FFFE] bg-opacity-80 border-none p-3 rounded-md text-xl cursor-pointer z-10 hover:bg-opacity-100"
                            onClick={() => scroll('left')}
                        >
                            &lt;
                        </button>
                        <div
                            className="flex overflow-x-auto scroll-smooth w-full px-16"
                            ref={carouselRef}
                        >
                            {categoryCards.map((card, index) => (
                                <ResourceCard
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    description={
                                        <div className="card-content min-h-[90px]">
                                            {card.description}
                                        </div>
                                    }
                                    link={card.link}
                                    cardStyle="bg-[#F2E2B8] hover:bg-[#FBEDCA]"
                                />
                            ))}
                        </div>
                        <button
                            className="absolute right-0 bg-[#D3FFFE] bg-opacity-80 border-none p-3 rounded-md text-xl cursor-pointer z-10 hover:bg-opacity-100"
                            onClick={() => scroll('right')}
                        >
                            &gt;
                        </button>
                    </div>
                </section>

                {/* Visual Schedule Section */}
                <section className="bg-[#E3FFFF] p-8 rounded-3xl shadow-md mb-10">
                    <h2 className="text-3xl font-semibold text-[#26A5B3] mb-4">Create Your Visual Schedule</h2>
                    <div className="p-4">
                        <VisualSchedule />
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-[#E3FFFF] p-8 rounded-3xl shadow-md mb-10">
                    <h2 className="text-3xl font-semibold text-[#FA507E] mb-6">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b border-[#999999] py-4">
                                <h3
                                    className={`text-xl font-semibold cursor-pointer ${activeFaq === index ? 'text-[#6EE4DE]' : 'text-[#26A5B3]'}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                </h3>
                                <p className={`mt-2 text-[#666666] ${activeFaq === index ? 'block' : 'hidden'}`}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Support Bot */}
            <SupportBot />
        </div>
    );
};

export default Explore;
