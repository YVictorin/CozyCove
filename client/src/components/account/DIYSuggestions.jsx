import React from 'react';

const DIYSuggestions = ({ suggestions, onDismiss }) => {
  return (
    <div 
      className="mb-8 p-4 relative rounded-xl border-2" 
      style={{ backgroundColor: "#FBEDCA", borderColor: "#F2E2B8" }}
    >
      <button 
        onClick={onDismiss}
        className="absolute top-2 right-2"
        style={{ color: "#666666" }}
      >
        ✕
      </button>
      <h3 
        className="text-lg font-bold mb-2"
        style={{ color: "#4A8278" }}
      >
        Today's DIY Sensory Box Ideas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map(suggestion => (
          <div 
            key={suggestion.id} 
            className="rounded-lg p-3 shadow"
            style={{ backgroundColor: "#D3FFFE" }}
          >
            <h4 
              className="font-bold"
              style={{ color: "#26A5B3" }}
            >
              {suggestion.title}
            </h4>
            <p 
              className="text-sm"
              style={{ color: "#666666" }}
            >
              Difficulty: {suggestion.difficulty}
            </p>
            <p 
              className="text-sm mt-2"
              style={{ color: "#4A8278" }}
            >
              Materials: {suggestion.materials.join(", ")}
            </p>
            <a 
              href="#" 
              className="text-sm block mt-2 hover:underline"
              style={{ color: "#33A5CE" }}
            >
              View DIY Guide →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DIYSuggestions;