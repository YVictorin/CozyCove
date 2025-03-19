import React from 'react';
import snappy from '../assets/images/snappy.png';
import snuggles from '../assets/images/snuggles.png';
import puzzletta from '../assets/images/puzzletta.png';
import link from '../assets/images/link.png';
import AnimatedButton from '../components/AnimatedButton';

const CharacterCard = ({ image, name, description }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-2 md:mb-4">
                <img
                    src={image}
                    alt={name}
                    className="h-28 sm:h-36 md:h-48 w-auto object-contain z-10 relative"
                />
            </div>

            {/* Character info card */}
            <div className="bg-[#f9f5eb] rounded-xl p-3 md:p-4 w-full flex flex-col items-center">
                {/* Character name */}
                <h3 className="font-bold text-lg md:text-2xl text-[#5d5c7c] mb-1 md:mb-2">{name}</h3>

                {/* Character description */}
                <p className="text-gray-600 text-center text-xs md:text-sm mb-2 md:mb-4">{description}</p>

                {/* button */}
                <AnimatedButton
                    text="Learn More"
                    primaryColor="#fb507e"
                    size="small"
                />
            </div>
        </div>
    );
};

const CharactersGrid = () => {
    const characters = [
        {
            id: 1,
            name: 'SNAPPY',
            image: snappy,
            description: 'The newest 5th grader in town, Snappy is a puzzle piece who can be recognised by her rosy cheeks',
            color: '#fa507e',
        },
        {
            id: 2,
            name: 'SNUGGLES',
            image: snuggles,
            description: 'Snuggles is Sanppys brother. His only weakness is a freshly-opened bag of chips.',
            color: '#33a5ce',
        },
        {
            id: 3,
            name: 'PUZZLETTA',
            image: puzzletta,
            description: 'Puzzletta is Snappy and Snuggle\'s mommy, who recently started a garden.',
            color: '#fd975f',
        },
        {
            id: 4,
            name: 'LINK',
            image: link,
            description: 'Link is Snappy and Snuggle\'s dad who loves to be silly and play fun games with them.',
            color: '#f7d41e',
        },
    ];

    return (
        <div className="w-full py-8 md:py-10 px-4 bg-transparent">
            {/* Section title */}
            <div className="w-full text-center mb-6 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-[#5d5c7c] py-2 px-4 md:px-8 rounded-full inline-block bg-white shadow-sm">
                    Meet Snappys Family
                </h2>
            </div>

            {/* Characters grid - always 2 columns, even on small mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
                {characters.map((character) => (
                    <CharacterCard
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        description={character.description}
                        color={character.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default CharactersGrid;
