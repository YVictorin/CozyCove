import AnimatedButton from "./AnimatedButton";

const Card = ({ title, descriptionTop, descriptionBottom, buttonLeftText, onButtonLeftClick ,...props }) => {
  return (
    <div className="relative max-w-4xl mx-auto scale-90" {...props}>
      {/* Bottommost blue card - peeking out from bottom and right */}
      <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-200 rounded-3xl z-0"></div>
      
      {/* White parent card with flex centering */}
      <div className="relative bg-white rounded-3xl p-3 flex justify-center items-center z-20">
        {/* Grey content card */}
        <div className="bg-gray-50 rounded-3xl p-12 w-full">
          {/* Bubble-style Title */}
          <h1 className="text-6xl font-extrabold text-indigo-700 mb-8" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
            letterSpacing: '0.05em',
            color: "#24B2C2"
          }}>
            {title}
          </h1>
          
          {/* Description - Top Paragraph */}
          <p className="text-gray-600 text-2xl mb-12">
            {descriptionTop}
          </p>
          
          {/* Description - Bottom Paragraph */}
          <p className="text-gray-600 text-2xl mb-12">
            {descriptionBottom}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-6 ">
            <button 
              className= "text-white py-4 px-12 cursor-pointer rounded-full text-2xl font-bold"
              style={{ backgroundColor: "#24B2C2"}}
              onClick={onButtonLeftClick} 
              >
              {buttonLeftText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
