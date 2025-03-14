import React from 'react';

const SavedBoxes = ({ boxes, onRemove }) => {
  return (
    <div>
      <h1 
        className="text-3xl font-bold mb-6"
        style={{ color: "#26A5B3" }}
      >
        Saved Sensory Boxes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map(box => (
          <div 
            key={box.id} 
            className="rounded-2xl shadow-md overflow-hidden"
            style={{ backgroundColor: "white" }}
          >
            <img 
              src={box.image} 
              alt={box.name} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 
                className="font-bold text-lg"
                style={{ color: "#24B2C2" }}
              >
                {box.name}
              </h3>
              <p 
                className="mb-4"
                style={{ color: "#666666" }}
              >
                {box.description}
              </p>
              <div className="flex space-x-2">
                <button 
                  className="flex-1 text-white py-2 px-4 rounded-lg text-sm"
                  style={{ backgroundColor: "#24B2C2" }}
                >
                  View Details
                </button>
                <button 
                  onClick={() => onRemove(box.id)} 
                  className="py-2 px-3 rounded-lg text-sm"
                  style={{ backgroundColor: "#FBEDCA", color: "#FA507E" }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div 
          className="rounded-2xl border-2 border-dashed flex items-center justify-center h-64"
          style={{ backgroundColor: "#E3FFFF", borderColor: "#66D6D0" }}
        >
          <div className="text-center">
            <div 
              className="text-4xl mb-2"
              style={{ color: "#6EE4DE" }}
            >
              +
            </div>
            <p 
              className="font-medium"
              style={{ color: "#26A5B3" }}
            >
              Discover More Sensory Boxes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedBoxes;