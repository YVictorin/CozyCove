
import React from 'react';

function ResourceCard({ image, title, description, link }) {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl p-8 shadow-md mr-5 transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-36 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold text-blue-500 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        className="bg-cyan-400 text-white px-6 py-3 rounded-full hover:bg-cyan-500 transition-colors"
      >
        Explore
      </a>
    </div>
  );
}

export default ResourceCard;