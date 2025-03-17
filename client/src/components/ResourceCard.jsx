import React from 'react';

const ResourceCard = ({ image, title, description, link }) => {
    return (
        <div className="bg-[#FBEDCA] rounded-2xl shadow-xl p-8 m-4 transition-shadow hover:shadow-2xl">
            <div className="image-container">
                <img src={image} alt={title} className="rounded-lg" />
            </div>
            <div className="title-container mt-6">
                <h3 className="text-xl font-semibold text-[#26A5B3]">{title}</h3>
            </div>
            <div className="description-container mt-4">
                {description}
            </div>
            <div className="link-container mt-6">
                <a href={link} className="text-[#24B2C2] hover:underline">Learn More</a>
            </div>
        </div>
    );
};

export default ResourceCard;