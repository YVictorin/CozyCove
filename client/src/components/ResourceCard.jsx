import React from 'react';

function ResourceCard({ image, title, description, link }) {
  return (
    <div className="flex-shrink-0 w-full max-w-sm bg-white rounded-xl p-3 sm:p-6 shadow-md mx-auto mb-4 transition-transform hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-md mb-2 sm:mb-4"
      />
      <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-3 text-[#26A5B3] line-clamp-2">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#fa507e] text-white px-3 py-1 sm:px-5 sm:py-3 rounded-full hover:bg-cyan-500 transition-colors block w-full text-center text-xs sm:text-base"
      >
        Explore
      </a>
    </div>
  );
}

export default ResourceCard;
