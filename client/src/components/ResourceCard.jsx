
import React from 'react';

const ResourceCard = ({ title, description, link }) => {
  return (
    <div className="resource-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>Read More</a>
    </div>
  );
};

export default ResourceCard;
