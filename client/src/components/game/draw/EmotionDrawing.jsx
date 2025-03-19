import React, { useState, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Smile, Frown, Meh, Heart, Trash2, Medal } from 'lucide-react';
import backgroundImage from '../../../assets/Background2.JPG'; // Adjust path if needed

const emotions = [
  { name: 'Happy', icon: Smile, color: '#FF9124' },
  { name: 'Sad', icon: Frown, color: '#00A5E0' },
  { name: 'Neutral', icon: Meh, color: '#6CC24A' },
  { name: 'Love', icon: Heart, color: '#FF6B98' },
];

const EmotionDrawing = () => {
  const canvasRef = useRef(null);
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [completedEmotions, setCompletedEmotions] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  // const { addBadge } = useGameStore();

  // New states for eraser functionality
  const [isEraser, setIsEraser] = useState(false);
  const [previousColor, setPreviousColor] = useState('#000000');

  const currentEmotion = emotions[currentEmotionIndex];
  const colors = ['#000000', '#FF9124', '#00A5E0', '#6CC24A', '#FF6B98', '#FFFFFF'];

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setHasDrawn(false);
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleToggleEraser = () => {
    if (!isEraser) {
      setPreviousColor(strokeColor);
      setStrokeColor('#FFFFFF');
      setIsEraser(true);
    } else {
      setStrokeColor(previousColor);
      setIsEraser(false);
    }
  };

  const handleComplete = async () => {
    if (!hasDrawn) {
      alert("Please draw something first!");
      return;
    }

    const newCompletedEmotions = [...completedEmotions];
    if (!newCompletedEmotions.includes(currentEmotionIndex)) {
      newCompletedEmotions.push(currentEmotionIndex);
      setCompletedEmotions(newCompletedEmotions);
    }

    // For demo purposes, simply advance to next emotion:
    const nextIndex = findNextIncompleteEmotion(newCompletedEmotions);
    setCurrentEmotionIndex(nextIndex);
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setHasDrawn(false);
    }
  };

  const findNextIncompleteEmotion = (completed) => {
    for (let i = 0; i < emotions.length; i++) {
      if (!completed.includes(i)) {
        return i;
      }
    }
    return 0;
  };

  const resetGame = () => {
    setCompletedEmotions([]);
    setCurrentEmotionIndex(0);
    setShowCongrats(false);
    setHasDrawn(false);
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  if (showCongrats) {
    return (
      <div className="p-8 rounded-3xl shadow-lg text-center" style={{ 
        background: 'linear-gradient(135deg, #FFF9C4 0%, #FFD54F 100%)',
        border: '6px solid #FF9124',
        borderRadius: '40px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <Medal className="w-32 h-32 mx-auto mb-6" style={{ color: '#FF9124' }} />
        <h1 className="text-4xl font-bold mb-4" style={{ 
          color: '#0172B0',
          fontFamily: 'Comic Sans MS, cursive, sans-serif',
          textShadow: '2px 2px 0px #FFF'
        }}>
          Hooray! You're an Emotion Master!
        </h1>
        <p className="text-2xl mb-8" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          You've drawn all the emotions! What a creative artist you are!
        </p>
        <button
          onClick={resetGame}
          className="px-10 py-4 font-bold text-white transition-transform hover:scale-105"
          style={{ 
            background: "linear-gradient(135deg, #00A5E0 0%, #0172B0 100%)",
            borderRadius: '30px',
            boxShadow: '0 6px 0 #005C85, 0 10px 20px rgba(0,0,0,0.15)',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontSize: '1.3rem'
          }}
        >
          Play Again!
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        minHeight: '120vh', // Full viewport height
        paddingTop: '10px',
        paddingBottom: '10px'
      }}
    >
      <div className="p-8 rounded-3xl shadow-lg" style={{ 
        background: 'rgba(255, 255, 255, 0.9)', // Optional overlay to improve readability
        border: '6px solid #00A5E0',
        borderRadius: '40px',
        maxWidth: '900px',
        height: '890px',
        margin: '150px auto'
      }}>
        <h2 className="text-3xl font-bold mb-4 text-center" style={{ 
          color: '#0172B0',
          fontFamily: 'Comic Sans MS, cursive, sans-serif',
          textShadow: '2px 2px 0px #FFF'
        }}>Draw the Emotion</h2>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-6 mb-6">
          {emotions.map((emotion, index) => {
            const Icon = emotion.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300"
                  style={{
                    backgroundColor: completedEmotions.includes(index) ? emotion.color : '#E0E0E0',
                    border: index === currentEmotionIndex ? '3px solid #333' : '2px solid #999',
                    transform: index === currentEmotionIndex ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <Icon className="w-6 h-6" color={completedEmotions.includes(index) ? '#FFF' : '#666'} />
                </div>
                <span
                  className="mt-1 text-sm font-semibold"
                  style={{ color: index === currentEmotionIndex ? '#333' : '#666' }}
                >
                  {emotion.name}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold" style={{ 
            color: currentEmotion.color,
            fontFamily: 'Comic Sans MS, cursive, sans-serif'
          }}>
            Draw a {currentEmotion.name} face!
          </h3>
        </div>

        <div className="overflow-hidden" style={{ 
          border: '5px dashed #00A5E0',
          borderRadius: '30px'
        }}>
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={5}
            strokeColor={strokeColor}
            width="100%"
            height="400px"
            onStroke={() => setHasDrawn(true)}
            className="bg-white"
          />
        </div>
        
        <div className="flex justify-center mt-6 gap-4">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => {
                setIsEraser(false); // Disable eraser if a new color is selected
                setStrokeColor(color);
              }}
              className="transition-transform hover:scale-110"
              style={{ 
                backgroundColor: color,
                border: '3px solid #333',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                boxShadow: strokeColor === color ? '0 0 0 3px #FFF, 0 0 0 6px #00A5E0' : '0 4px 8px rgba(0,0,0,0.15)'
              }}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleClear}
            className="px-8 py-4 font-bold text-white transition-transform hover:scale-105"
            style={{ 
              background: '#FF6B98',
              borderRadius: '30px',
              boxShadow: '0 6px 0 #D84A79, 0 10px 20px rgba(0,0,0,0.15)',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontSize: '1.3rem'
            }}
          >
            <Trash2 className="w-6 h-6 inline-block mr-2" />
            Clear
          </button>
          
          <button
            onClick={handleUndo}
            className="px-8 py-4 font-bold text-white transition-transform hover:scale-105"
            style={{ 
              background: '#CCCCCC',
              borderRadius: '30px',
              boxShadow: '0 6px 0 #AAAAAA, 0 10px 20px rgba(0,0,0,0.15)',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontSize: '1.3rem'
            }}
          >
            Undo
          </button>

          <button
            onClick={handleToggleEraser}
            className="px-8 py-4 font-bold text-white transition-transform hover:scale-105"
            style={{ 
              background: isEraser ? '#FF9124' : '#00A5E0',
              borderRadius: '30px',
              boxShadow: isEraser ? '0 6px 0 #CC7000, 0 10px 20px rgba(0,0,0,0.15)' : '0 6px 0 #005C85, 0 10px 20px rgba(0,0,0,0.15)',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontSize: '1.3rem'
            }}
          >
            {isEraser ? "Disable Eraser" : "Eraser"}
          </button>

          <button
            onClick={handleComplete}
            className="px-10 py-4 font-bold text-white transition-transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #FF9124 0%, #FF6B98 100%)',
              borderRadius: '30px',
              boxShadow: '0 6px 0 #CC7000, 0 10px 20px rgba(0,0,0,0.15)',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontSize: '1.3rem'
            }}
          >
            {completedEmotions.length === emotions.length - 1 && !completedEmotions.includes(currentEmotionIndex) 
              ? "Finish All Emotions!" 
              : "Save and Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionDrawing;
